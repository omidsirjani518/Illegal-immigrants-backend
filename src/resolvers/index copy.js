
// resolvers/index.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { authMiddleware, checkPermission } = require('../middleware/auth');

const Person = require('../models/Person');
const PersonRecord = require('../models/PersonRecord');
const Period = require('../models/Period');
const Family = require('../models/Family');
const Job = require('../models/Job');
const JobCategory = require('../models/JobCategory');
const ParameterCategory = require('../models/ParameterCategory');
const ParameterItem = require('../models/ParameterItem');
const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');

const resolvers = {
  Mutation: {
    // ---------- Auth ----------
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username }).populate({
        path: 'roleId',
        populate: { path: 'permissionIds' }
      });
      if (!user) throw new Error("کاربر یافت نشد");

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) throw new Error("رمز عبور اشتباه است");

      const permissions = user.roleId.permissionIds.map(p => p.name);

      const token = jwt.sign(
        { userId: user._id, roleId: user.roleId._id, permissions },
        process.env.JWT_SECRET,
        { expiresIn: '12h' }
      );

      return {
        token,
        user: {
          id: user._id,
          username: user.username,
          role: {
            id: user.roleId._id,
            name: user.roleId.name,
            permissions: user.roleId.permissionIds
          },
          isActive: user.isActive ?? true
        }
      };
    },

    // ---------- Person ----------
    createPerson: authMiddleware(
      checkPermission("person.create")(async (_, args) => {
        const person = new Person(args);
        await person.save();
        return person;
      })
    ),

    // ---------- PersonRecord ----------
    createPersonRecord: authMiddleware(
      checkPermission("person.create")(async (_, args) => {
        const { personId, periodId, familyId, roleInFamilyId, genderId, religionId, maritalStatusId, jobIds, location } = args;
        const record = new PersonRecord({
          personId,
          periodId,
          familyId,
          roleInFamily: roleInFamilyId,
          gender: genderId,
          religion,
          maritalStatus: maritalStatusId,
          jobs: jobIds,
          location: { type: 'Point', coordinates: location }
        });
        await record.save();
        return record.populate('personId periodId familyId roleInFamily gender religion maritalStatus jobs');
      })
    ),

    // ---------- Period ----------
    createPeriod: authMiddleware(
      checkPermission("period.create")(async (_, args) => {
        const period = new Period(args);
        await period.save();
        return period;
      })
    ),

    // ---------- Family ----------
    createFamily: authMiddleware(
      checkPermission("family.create")(async (_, args) => {
        const family = new Family(args);
        await family.save();
        return family;
      })
    ),

    // ---------- JobCategory ----------
    createJobCategory: authMiddleware(
      checkPermission("job.create")(async (_, args) => {
        const category = new JobCategory(args);
        await category.save();
        return category;
      })
    ),

    // ---------- Job ----------
    createJob: authMiddleware(
      checkPermission("job.create")(async (_, { code, title, categoryId }) => {
        const job = new Job({ code, title, categoryId });
        await job.save();
        return job.populate('categoryId');
      })
    ),

    // ---------- ParameterCategory ----------
    createParameterCategory: authMiddleware(
      checkPermission("parameter.create")(async (_, { name }) => {
        const category = new ParameterCategory({ name });
        await category.save();
        return category;
      })
    ),

    // ---------- ParameterItem ----------
    createParameterItem: authMiddleware(
      checkPermission("parameter.create")(async (_, { value, categoryId }) => {
        const item = new ParameterItem({ value, categoryId });
        await item.save();
        return item;
      })
    ),

    // ---------- Permission ----------
    createPermission: authMiddleware(
      checkPermission("permission.create")(async (_, { name, description }) => {
        const permission = new Permission({ name, description });
        await permission.save();
        return permission;
      })
    ),

    // ---------- Role ----------
    createRole: authMiddleware(
      checkPermission("role.create")(async (_, { name, permissionIds }) => {
        const role = new Role({ name, permissionIds });
        await role.save();
        return role.populate('permissionIds');
      })
    ),

    // ---------- User ----------
    createUser: authMiddleware(
      checkPermission("user.create")(async (_, { username, password, roleId }) => {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({ username, passwordHash, roleId });
        await user.save();
        return user.populate({ path: 'roleId', populate: { path: 'permissionIds' } });
      })
    )
  }
};

module.exports = resolvers;
