const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authMiddleware, checkPermission } = require('../middleware/auth');

// مدل‌ها
const Person = require('../models/Person');
const PersonRecord = require('../models/PersonRecord');
const Period = require('../models/Period');
const Family = require('../models/Family');
const Job = require('../models/Job');
const JobCategory = require('../models/JobCategory');

const District = require('../models/District');
const DistrictProvince = require('../models/DistrictProvince');

const ParameterCategory = require('../models/ParameterCategory');
const ParameterItem = require('../models/ParameterItem');
const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');

/////////////////////////
// توابع کمکی (Helper Functions)
/////////////////////////

/**
 * تولید یک کد رهگیری منحصر به فرد برای خانواده.
 * ساختار: <PeriodCode><CityCode><Random8Digits>
 */
async function generateTrackingCode(periodCode, cityCode) {
  if (!periodCode) throw new Error("PeriodCode نامعتبر است.");
  // اطمینان از اینکه CityCode همیشه 3 رقم باشد
  const formattedCityCode = cityCode.toString().padStart(3, '0');

  // استفاده از یک حلقه while برای اطمینان از منحصر به فرد بودن
  while (true) {
    // 8 رقم تصادفی
    const randomPart = Math.floor(Math.random() * 1e8).toString().padStart(8, '0');
    const trackingCode = `${periodCode}${formattedCityCode}${randomPart}`;

    // بررسی وجود کد
    const exists = await Family.exists({ trackingCode });
    if (!exists) {
      return trackingCode;
    }
    // اگر وجود داشت، دوباره تولید می‌شود
  }
}

/**
 * دریافت شماره سریال بعدی فرد در یک خانواده (01، 02، 03...)
 */
async function getPersonSerialForFamily(familyId) {
  // استفاده از exists() به جای findOne() برای افزایش کارایی
  if (!familyId) throw new Error("FamilyId نامعتبر است.");
  const count = await PersonRecord.countDocuments({ familyId });
  const next = count + 1;
  return next.toString().padStart(2, "0");
}

/**
 * تبدیل کد رشته‌ای (مثلاً code: 'AF') به ObjectId مرجع در دیتابیس
 * ⚠️ بهینه‌سازی شده با select و lean
 */
async function getCodeToId(Model, code, codeField = 'code') {
  if (!code) return null; // اگر کد وارد نشد، null برگردانده می‌شود

  // استفاده از select و lean برای واکشی سریع‌تر فقط _id
  const item = await Model.findOne({ [codeField]: code }).select('_id').lean().exec();

  if (!item) {
    // پرتاب خطا با ذکر مدل و کد برای دیباگ بهتر
    throw new Error(`[${Model.modelName}] آیتم با کد "${code}" یافت نشد.`);
  }
  return item._id;
}

/**
 * دریافت کد و مقدار (code/value) از ObjectId برای Resolverها
 * ⚠️ بهینه‌سازی شده با lean
 */
async function getItemCodeAndValue(ItemModel, itemId, valueField = 'value') {
  if (!itemId) return null;

  // استفاده از .lean() برای کارایی بهتر
  const item = await ItemModel.findById(itemId).select(`code ${valueField}`).lean().exec();

  if (!item) return null;

  return {
    code: item.code,
    value: item[valueField] ?? item.code // fallback به code اگر valueField نبود
  };
}


// Resolver سفارشی برای تایپ PersonRecord
const PersonRecordResolvers = {
  // واکشی Person مرتبط (از PersonId)
  person: async (parent) => {
    if (!parent.personId) return null;
    // از lean().exec() استفاده می‌شود
    return await Person.findById(parent.personId).lean().exec();
  },



  // Resolverهای CodeValue برای ParameterItem
  roleInFamily: (parent) => getItemCodeAndValue(ParameterItem, parent.roleInFamily, 'value'),
  nationality: (parent) => getItemCodeAndValue(ParameterItem, parent.nationality, 'value'),
  gender: (parent) => getItemCodeAndValue(ParameterItem, parent.gender, 'value'),
  religion: (parent) => getItemCodeAndValue(ParameterItem, parent.religion, 'value'),
  maritalStatus: (parent) => getItemCodeAndValue(ParameterItem, parent.maritalStatus, 'value'),
  ethnicity: (parent) => getItemCodeAndValue(ParameterItem, parent.ethnicity, 'value'),
  education: (parent) => getItemCodeAndValue(ParameterItem, parent.education, 'value'),
  residence: (parent) => getItemCodeAndValue(ParameterItem, parent.residence, 'value'),
  expertise: (parent) => getItemCodeAndValue(ParameterItem, parent.expertise, 'value'),

  // واکشی Job مرتبط
  job: async (parent) => {
    if (!parent.job) return null;
    // از lean().exec() استفاده می‌شود
    return await Job.findById(parent.job).select('title code').lean().exec();
  },

  // ✅ Resolver جدید برای ولسوالی (District)
  district: async (parent) => {
    if (!parent.district) return null;
    // از مدل District استفاده می‌شود و عنوان و کد واکشی می‌گردد
    const districtItem = await District.findById(parent.district).select('title code').lean().exec();
    if (!districtItem) return null;
    return {
      code: districtItem.code,
      title: districtItem.title
    };
  },

};

const PersonResolvers = {
  gender: (parent) => getItemCodeAndValue(ParameterItem, parent.gender, 'value'),
};

// -------------------------------------------------------------------

const resolvers = {
  PersonRecord: PersonRecordResolvers,
  Person: PersonResolvers,

  Query: {
    // Queryهای Job
    jobs: async (_, { categoryId, search, page = 1, pageSize = 10 }) => {
      const filter = {};
      if (categoryId) filter.categoryId = categoryId;
      if (search) filter.title = { $regex: search, $options: 'i' };
      const skip = (page - 1) * pageSize;
      const jobs = await Job.find(filter).skip(skip).limit(pageSize).populate('categoryId').lean().exec();
      return jobs.map(job => ({
        id: job._id.toString(),
        code: job.code,
        title: job.title,
        category: job.categoryId ? {
          id: job.categoryId._id.toString(),
          name: job.categoryId.name,
          label: job.categoryId.label
        } : null
      }));

    },
    jobsAutocomplete: async (_, { categoryId, search, page = 1, pageSize = 10 }) => {
      const filter = {};
      if (categoryId) filter.categoryId = categoryId;
      if (search) filter.title = { $regex: search, $options: 'i' };
      const skip = (page - 1) * pageSize;

      const jobs = await Job.find(filter)
        .skip(skip)
        .limit(pageSize)
        .select('code title') // حذف id، چون _id داریم
        .lean()
        .exec();

      // map کردن _id به id برای GraphQL
      return jobs.map(job => ({
        id: job._id.toString(),
        code: job.code,
        title: job.title
      }));
    },

    // Server-side: resolvers.js (بخش Query)

    jobCategories: async () => {
      const categories = await JobCategory.find({}).lean().exec();

      return categories
        .filter(cat => cat._id) // این اوکیه
        .map(cat => ({
          id: cat._id.toString(),
          name: cat.name,
          label: cat.label
        }));
    },

    parameterCategories: async () => {
      const categories = await ParameterCategory.find({}).lean().exec();
      return categories.map(cat => ({
        id: cat._id.toString(),
        code: cat.code,
        name: cat.name,
        label: cat.label
      }));
    },



    parameterItems: async (_, { categoryId, search, page = 1, pageSize = 10 }) => {
      const filter = {};
      if (categoryId) filter.categoryId = categoryId;
      if (search) filter.value = { $regex: search, $options: 'i' };
      const skip = (page - 1) * pageSize;

      const items = await ParameterItem.find(filter)
        .skip(skip)
        .limit(pageSize)
        .populate('categoryId')  // populate روی categoryId
        .lean()
        .exec();

      // map کردن _id → id و categoryId → category
      return items.map(item => ({
        id: item._id.toString(),
        code: item.code,
        value: item.value,
        category: item.categoryId ? {
          id: item.categoryId._id.toString(),
          name: item.categoryId.name
        } : null
      }));
    },

    parameterItemsAutocomplete: async (_, { categoryId, search, page = 1, pageSize = 10 }) => {
      const filter = {};
      if (categoryId) filter.categoryId = categoryId;
      if (search) filter.value = { $regex: search, $options: 'i' };
      const skip = (page - 1) * pageSize;

      const items = await ParameterItem.find(filter)
        .skip(skip)
        .limit(pageSize)
        .select('code value') // حذف id، چون _id داریم
        .lean()
        .exec();

      return items.map(item => ({
        id: item._id.toString(),  // map کردن _id به id
        code: item.code,
        value: item.value
      }));
    },

    allParamsAndJobs: async () => {
      // واکشی دسته‌بندی پارامتریک و آیتم‌ها
      const paramCategories = await ParameterCategory.find({}).lean().exec();
      const PARAMS = await Promise.all(paramCategories.map(async (cat) => {
        const items = await ParameterItem.find({ categoryId: cat._id }).lean().exec();
        return {
          label: cat.label,
          name: cat.name,
          code: cat.code,
          items: items.map(i => ({ code: i.code, value: i.value }))
        };
      }));

      // واکشی شغل‌ها
      const jobs = await Job.find({}).lean().exec();
      const JOBS = jobs.map(j => ({
        code: j.code,
        title: j.title
      }));


      // واکشی ولسوالی های
      const districts = await District.find({}).lean().exec();
      const DISTRICTS = districts.map(j => ({
        code: j.code,
        title: j.title
      }));

      return { PARAMS, JOBS, DISTRICTS };
    },



    // Queryهای عمومی
    periods: async () => {
      const periods = await Period.find({}).lean().exec();
      return periods.map(p => ({
        id: p._id.toString(),  // map کردن _id به id
        code: p.code,
        cityCode: p.cityCode,
        title: p.title,
        startDate: p.startDate,
        endDate: p.endDate,
        description: p.description,
        isActive: p.isActive
      }));
    },

    families: async (_, { search }) => {
      const filter = {};
      if (search) filter.trackingCode = { $regex: search, $options: 'i' };

      const families = await Family.find(filter).lean().exec();

      return families.map(f => ({
        id: f._id.toString(),        // map کردن _id به id
        trackingCode: f.trackingCode,
        name: f.name,
        address: f.address,
        location: f.location
      }));
    },

    persons: async (_, { search }) => {
      const filter = {};
      if (search) filter.lastName = { $regex: search, $options: 'i' };

      const persons = await Person.find(filter).lean().exec();

      return persons.map(p => ({
        id: p._id.toString(),  // map کردن _id به id
        personCode: p.personCode,
        firstName: p.firstName,
        lastName: p.lastName,
        fatherName: p.fatherName,
        dateOfBirth: p.dateOfBirth,
        gender: p.gender // توجه: این هنوز ObjectId است، resolver Person.gender آن را map می‌کند
      }));
    },

    personRecords: async (_, args) => {
      // const { personId, periodId, familyId, roleInFamilyCode, nationalityCode, jobCode } = args;
      const { personId, periodId, familyId } = args;
      const filter = {};

      if (personId) filter.personId = personId;
      if (periodId) filter.periodId = periodId;
      if (familyId) filter.familyId = familyId;

      // if (roleInFamilyCode) filter.roleInFamily = await getCodeToId(ParameterItem, roleInFamilyCode);
      // if (nationalityCode) filter.nationality = await getCodeToId(ParameterItem, nationalityCode);
      // if (jobCode) filter.job = await getCodeToId(Job, jobCode);

      const populateFields = 'periodId familyId';

      const records = await PersonRecord.find(filter).populate(populateFields).lean().exec();

      return records.map(r => ({
        id: r._id.toString(),
        personId: r.personId,
        periodId: r.periodId ? {
          id: r.periodId._id.toString(),
          code: r.periodId.code,
          cityCode: r.periodId.cityCode,
          title: r.periodId.title,
          startDate: r.periodId.startDate,
          endDate: r.periodId.endDate,
          description: r.periodId.description,
          isActive: r.periodId.isActive
        } : null,
        familyId: r.familyId ? {
          id: r.familyId._id.toString(),
          trackingCode: r.familyId.trackingCode,
          name: r.familyId.name,
          address: r.familyId.address,
          location: r.familyId.location
        } : null,
        roleInFamily: r.roleInFamily,
        nationality: r.nationality,
        gender: r.gender,
        religion: r.religion,
        maritalStatus: r.maritalStatus,
        ethnicity: r.ethnicity,
        education: r.education,
        residence: r.residence,
        expertise: r.expertise,
        job: r.job,
        isHead: r.isHead
      }));
    },

    // Queryهای مدیریت کاربر
    users: async () => {
      const users = await User.find({}).populate({ path: 'roleId', populate: { path: 'permissionIds' } }).lean().exec();
      return users.map(u => ({
        id: u._id.toString(),
        username: u.username,
        cityCode: u.cityCode,
        isActive: u.isActive,
        role: u.roleId ? {
          id: u.roleId._id.toString(),
          name: u.roleId.name,
          permissions: u.roleId.permissionIds?.map(p => ({
            id: p._id.toString(),
            name: p.name,
            description: p.description
          })) || []
        } : null
      }));
    },

    roles: async () => {
      const roles = await Role.find({}).populate('permissionIds').lean().exec();
      return roles.map(r => ({
        id: r._id.toString(),
        name: r.name,
        permissions: r.permissionIds?.map(p => ({
          id: p._id.toString(),
          name: p.name,
          description: p.description
        })) || []
      }));
    },

    permissions: async () => {
      const permissions = await Permission.find({}).lean().exec();
      return permissions.map(p => ({
        id: p._id.toString(),
        name: p.name,
        description: p.description
      }));
    },

  },

  Mutation: {
    // -------------------------------------------------------------------
    // مدیریت احراز هویت
    // -------------------------------------------------------------------
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username }).populate({
        path: 'roleId',
        populate: { path: 'permissionIds' }
      });
      if (!user) throw new Error("کاربر یافت نشد.");

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) throw new Error("رمز عبور اشتباه است.");

      // استخراج نام مجوزها
      const permissions = user.roleId.permissionIds.map(p => p.name);

      // ⚠️ از JWT_SECRET در متغیرهای محیطی استفاده شود
      const secret = process.env.JWT_SECRET || 'fallback_secret_should_not_be_used_in_prod';

      const token = jwt.sign(
        { userId: user._id, roleId: user.roleId._id, permissions },
        secret,
        { expiresIn: '1d' }
      );

      return {
        token,
        user: {
          id: user._id,
          username: user.username,
          cityCode: user.cityCode,
          role: user.roleId, // بازگشت شیء Role کامل
          isActive: user.isActive ?? true
        }
      };
    },

    // -------------------------------------------------------------------
    // ایجاد خانواده و اعضا (اصلاح شده)
    // -------------------------------------------------------------------
    createFamilyWithMembers: authMiddleware(
      checkPermission("family.create")(async (_, { familyInput }, { user }) => {
        const { address, mobile, tel, location, periodId, members } = familyInput;

        const period = await Period.findById(periodId).lean().exec();
        if (!period) throw new Error("دوره یافت نشد.");

        const periodCode = period.code ?? "1";
        // استفاده از cityCode از کاربر لاگین شده به عنوان پیش‌فرض، در غیر این صورت از دوره استفاده شود
        const cityCode = user.cityCode ?? period.cityCode ?? '500';
        if (!cityCode) throw new Error("CityCode نامعتبر است.");

        // ۱. ایجاد Family
        const trackingCode = await generateTrackingCode(periodCode, cityCode);

        const family = new Family({
          trackingCode,
          address,
          mobile,
          tel,
          location: { type: 'Point', coordinates: location } // [Lng, Lat]
        });
        await family.save();

        const savedMembers = [];
        let isHead = true; // فرض می‌کنیم اولین عضو سرپرست است

        for (const m of members) {
          const serial = await getPersonSerialForFamily(family._id);
          const personCode = `${trackingCode}${serial}`;

          // تبدیل Code به ID (با استفاده از تابع بهینه‌شده getCodeToId)
          const roleInFamilyId = await getCodeToId(ParameterItem, m.roleInFamilyCode);
          const nationalityId = await getCodeToId(ParameterItem, m.nationalityCode);
          const genderId = await getCodeToId(ParameterItem, m.genderCode);
          const religionId = await getCodeToId(ParameterItem, m.religionCode);
          const maritalStatusId = await getCodeToId(ParameterItem, m.maritalStatusCode);
          const ethnicityId = await getCodeToId(ParameterItem, m.ethnicityCode);
          const educationId = await getCodeToId(ParameterItem, m.educationCode);
          const residenceId = await getCodeToId(ParameterItem, m.residenceCode);
          const expertiseId = await getCodeToId(ParameterItem, m.expertiseCode);
          const jobId = await getCodeToId(Job, m.jobCode, 'code');
          const districtId = await getCodeToId(District, m.districtCode, 'code');

          // ۲. ایجاد Person
          const person = new Person({
            personCode,
            firstName: m.firstName,
            lastName: m.lastName,
            fatherName: m.fatherName,
            dateOfBirth: m.dateOfBirth,
            gender: genderId,
          });
          await person.save();

          // ۳. ایجاد PersonRecord
          const record = new PersonRecord({
            personId: person._id,
            familyId: family._id,
            periodId,
            // فیلدهای پارامتری ذخیره شده با ID
            roleInFamily: roleInFamilyId,
            nationality: nationalityId,
            religion: religionId,
            maritalStatus: maritalStatusId,
            ethnicity: ethnicityId,
            education: educationId,
            residence: residenceId,
            expertise: expertiseId,
            job: jobId,
            district: districtId,
            CertNum: m.CertNum,
            certvalid: m.certvalid,
            childs: m.childs,
            entrance: m.entrance,
            resduration: m.resduration,
            curResDuration: m.curResDuration,
            empname: m.empname,
            emptel: m.emptel,
            jobaddress: m.jobaddress,
            wpermit: m.wpermit,
            // فرض بر این است که roleInFamilyCode تعیین می‌کند که فرد سرپرست است یا خیر.
            isHead: isHead // تنظیم پرچم سرپرست
          });
          await record.save();
          isHead = false; // بعد از اولین عضو، بقیه سرپرست نیستند

          // Populate برای پاسخ خروجی
          const populatedRecord = await record.populate('periodId familyId');
          savedMembers.push(populatedRecord);
        }

        return {
          familyId: family._id,
          trackingCode: family.trackingCode,
          members: savedMembers
        };
      })
    ),

    // -------------------------------------------------------------------
    // ایجاد رکوردهای تکی (Create Single Records)
    // -------------------------------------------------------------------

    createPersonRecord: authMiddleware(
      checkPermission("person.create")(async (_, args) => {
        const {
          personId, periodId, familyId,
          roleInFamilyCode, nationalityCode, genderCode, religionCode, maritalStatusCode, ethnicityCode,
          educationCode, residenceCode, expertiseCode, jobCode, districtCode
        } = args;

        // تبدیل Code به ID
        const [
          roleInFamilyId, nationalityId, genderId, religionId, maritalStatusId, ethnicityId,
          educationId, residenceId, expertiseId, jobId, districtId
        ] = await Promise.all([
          getCodeToId(ParameterItem, roleInFamilyCode),
          getCodeToId(ParameterItem, nationalityCode),
          getCodeToId(ParameterItem, genderCode),
          getCodeToId(ParameterItem, religionCode),
          getCodeToId(ParameterItem, maritalStatusCode),
          getCodeToId(ParameterItem, ethnicityCode),
          getCodeToId(ParameterItem, educationCode),
          getCodeToId(ParameterItem, residenceCode),
          getCodeToId(ParameterItem, expertiseCode),
          getCodeToId(Job, jobCode, 'code'),
          getCodeToId(District, districtCode, 'code')
        ]);

        const record = new PersonRecord({
          personId, periodId, familyId,
          roleInFamily: roleInFamilyId,
          nationality: nationalityId,
          gender: genderId, // Gender در PersonRecord هم ذخیره می‌شود
          religion: religionId,
          maritalStatus: maritalStatusId,
          ethnicity: ethnicityId,
          education: educationId,
          residence: residenceId,
          expertise: expertiseId,
          job: jobId,
          district: districtId
        });
        await record.save();

        // Populate برای پاسخ خروجی
        return record.populate('periodId familyId');
      })
    ),

    // -------------------------------------------------------------------
    // سایر Mutationها
    // -------------------------------------------------------------------

    createPerson: authMiddleware(
      checkPermission("person.create")(async (_, args) => {
        if (!args.personCode) throw new Error("personCode اجباری است.");
        if (!args.genderCode) throw new Error("genderCode اجباری است.");

        // تبدیل کد به ID واقعی
        const genderId = await getCodeToId(ParameterItem, args.genderCode);

        const person = new Person({
          ...args,
          gender: genderId
        });

        await person.save();

        // populate فیلد gender برای پاسخ
        return person.populate('gender');
      })
    ),



    createFamily: authMiddleware(
      checkPermission("family.create")(async (_, { trackingCode, address, location }) => {
        if (!trackingCode) throw new Error("trackingCode اجباری است.");
        const family = new Family({ trackingCode, address, location });
        await family.save();
        return family;
      })
    ),


    // ... (بقیه Mutationها: JobCategory, Job, ParameterCategory, ParameterItem, Role, User, Permission)
    // این قسمت‌ها بدون تغییر اساسی حفظ شدند، اما بهتر است از lean() استفاده شود:

    createJobCategory: authMiddleware(
      checkPermission("job.create")(async (_, args) => {
        const category = new JobCategory(args);
        await category.save();
        return category.lean().exec();
      })
    ),
    createJob: authMiddleware(
      checkPermission("job.create")(async (_, { code, title, categoryId }) => {
        const job = new Job({ code, title, categoryId });
        await job.save();
        return job.populate('categoryId').lean().exec();
      })
    ),
    createParameterCategory: authMiddleware(
      checkPermission("parameter.create")(async (_, { code, label, name }) => {
        const category = new ParameterCategory({ code, label, name });
        await category.save();
        return category.lean().exec();
      })
    ),
    createParameterItem: authMiddleware(
      checkPermission("parameter.create")(async (_, { code, value, categoryId }) => {
        const item = new ParameterItem({ code, value, categoryId });
        await item.save();
        return item.lean().exec();
      })
    ),
    createRole: authMiddleware(
      checkPermission("role.create")(async (_, { name, permissionIds }) => {
        const role = new Role({ name, permissionIds });
        await role.save();
        return role.populate('permissionIds').lean().exec();
      })
    ),
    createUser: authMiddleware(
      checkPermission("user.create")(async (_, { username, password, roleId, cityCode }) => {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ username, passwordHash, roleId, cityCode });
        await user.save();
        return user.populate({ path: 'roleId', populate: { path: 'permissionIds' } }).lean().exec();
      })
    ),
    createPermission: authMiddleware(
      checkPermission("permission.create")(async (_, { name, description }) => {
        const permission = new Permission({ name, description });
        await permission.save();
        return permission.lean().exec();
      })
    )
  }
};

module.exports = resolvers;