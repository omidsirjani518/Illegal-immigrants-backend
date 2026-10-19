const { gql } = require('apollo-server-express');

const typeDefs = gql`
  #########################################
  # Custom Types
  #########################################
  type CodeValue {
    code: String!
    value: String!
  }

  #########################################
  # Parameters (Gender, Religion, Marital Status, etc)
  #########################################
  type ParameterItem {
    id: ID!
    code: String!
    value: String!
    category: ParameterCategory
  }

  type ParameterCategory {
    id: ID!
    code: String!
    label: String!
    name: String!
    items: [ParameterItem]
  }



  #########################################
  # Job & Category
  #########################################
  type DistrictProvince {
    id: ID!
    code: String!
    name: String!
    label: String!
  }

  type District {
    id: ID!
    code: String!
    title: String!
    province: DistrictProvince
  }
  #########################################
  # Job & Category
  #########################################
  type JobCategory {
    id: ID!
    name: String!
    label: String!
    isActive: Boolean!
  }

  type Job {
    id: ID!
    code: String!
    title: String!
    category: JobCategory
    isActive: Boolean!
  }



  type AllParamsAndJobs {
  PARAMS: [ParameterCategoryOutput!]!
  JOBS: [JobOutput!]!
  DISTRICTS: [districtOutput!]!
}

type ParameterCategoryOutput {
  label: String!
  name: String!
  code: String!
  items: [CodeValue!]!
}


type JobOutput {
  code: String!
  title: String!
}

type districtOutput {
  code: String!
  title: String!
}
  #########################################
  # Period
  #########################################
  type Period {
    id: ID!
    code: Int
    cityCode: String
    title: String!
    startDate: String!
    endDate: String!
    description: String
    isActive: Boolean!
  }

  #########################################
  # Family
  #########################################
  type Location {
    type: String!
    coordinates: [Float!]!
  }

  type Family {
    id: ID!
    trackingCode: String!
    address: String!
    mobile: String!
    tel: String!
    location: Location
  }

  #########################################
  # Person & PersonRecord
  #########################################
  type Person {
    id: ID!
    personCode: String!
    firstName: String!
    lastName: String!
    fatherName: String!
    dateOfBirth: String!
    gender: CodeValue!
  }

  type PersonRecord {
    id: ID!
    person: Person
    period: Period
    family: Family
    roleInFamily: CodeValue
    nationality: CodeValue
    gender: CodeValue
    religion: CodeValue
    maritalStatus: CodeValue
    ethnicity: CodeValue
    education: CodeValue
    residence: CodeValue
    expertise: CodeValue  
    job: Job 
    district: District 
    CertNum: String
    certvalid: Boolean
    childs:Int
    entrance:Boolean
    resduration:String
    curResDuration:String
    empname:String
    emptel:String
    jobaddress:String
    wpermit:Boolean
  }

  input PersonRecordInput {
    firstName: String!
    lastName: String!
    dateOfBirth: String!
    fatherName: String!
    roleInFamilyCode: String!
    nationalityCode: String!
    genderCode: String!
    religionCode: String!
    maritalStatusCode: String!
    ethnicityCode: String!
    educationCode: String!
    residenceCode: String!
    expertiseCode: String!
    jobCode: String!
    districtCode: String!
    CertNum: String
    certvalid: Boolean
    childs:Int
    entrance:Boolean
    resduration:String
    curResDuration:String
    empname:String
    emptel:String
    jobaddress:String
    wpermit:Boolean
  }

  input FamilyWithMembersInput {
    trackingCode: String
    address: String!
    mobile: String!
    tel: String!
    periodId: ID!
    location: [Float!]!
    members: [PersonRecordInput!]!
  }

  type FamilyWithMembersPayload {
    familyId: ID!
    trackingCode: String
    members: [PersonRecord!]!
  }

  #########################################
  # User, Role & Permission
  #########################################
  type Permission {
    id: ID!
    name: String!
    description: String
  }

  type Role {
    id: ID!
    name: String!
    permissions: [Permission]
  }

  type User {
    id: ID!
    username: String!
    role: Role
    cityCode: String
    isActive: Boolean!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  #########################################
  # Queries
  #########################################
  type Query {
    jobs(categoryId: ID, search: String, page: Int, pageSize: Int): [Job!]!
    jobsAutocomplete(categoryId: ID, search: String, page: Int, pageSize: Int): [Job!]!
    jobCategories: [JobCategory!]!
    parameterCategories: [ParameterCategory!]!
    parameterItems(categoryId: ID, search: String, page: Int, pageSize: Int): [ParameterItem!]!
    parameterItemsAutocomplete(categoryId: ID!, search: String, page: Int, pageSize: Int): [ParameterItem!]!
    allParamsAndJobs: AllParamsAndJobs!
    periods: [Period]
    families(search: String): [Family]
    persons(search: String): [Person]
    personRecords(
      personId: ID
      periodId: ID
      familyId: ID
      roleInFamilyCode: String
      nationalityCode: String
      jobCode: String 
    ): [PersonRecord]
    users: [User]
    roles: [Role]
    permissions: [Permission]
  }

  #########################################
  # Mutations
  #########################################
  type Mutation {
    login(username: String!, password: String!): AuthPayload
    createParameterCategory(code: String!, label: String!, name: String!): ParameterCategory
    createParameterItem(code: String!, value: String!, categoryId: ID!): ParameterItem
    createJobCategory(code: String!, name: String!, label: String!): JobCategory
    createJob(code: String!, title: String!, categoryId: ID!): Job
    createPeriod(code: Int!, cityCode: String!, title: String!, startDate: String!, endDate: String!, description: String): Period
    createFamily(name: String, address: String): Family
    createPerson(personCode:String!,firstName: String!, lastName: String!, fatherName: String!,dateOfBirth: String,genderCode: String!): Person
    createPersonRecord(
      personId: ID!
      periodId: ID!
      familyId: ID
      # ورودی‌های پارامتریک با کد
      roleInFamilyCode: String!
      nationalityCode: String!
      genderCode: String!
      religionCode: String!
      maritalStatusCode: String!
      ethnicityCode: String!
      educationCode: String!
      residenceCode: String!
      expertiseCode: String!
      jobCode: String!
      districtCode: String!
    ): PersonRecord
    createFamilyWithMembers(familyInput: FamilyWithMembersInput!): FamilyWithMembersPayload
    createRole(name: String!, permissionIds: [ID]!): Role
    createUser(username: String!, password: String!, roleId: ID!, cityCode: String): User
    createPermission(name: String!, description: String): Permission
  }
`;

module.exports = typeDefs;