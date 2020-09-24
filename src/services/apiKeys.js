const { string } = require("@hapi/joi");
const MongoLib = require("../lib/mongo");
const MysqlLib = require("../lib/mysql");

class ApiKeysService {
  constructor() {
    this.collection = "sifap-api-keys";
    this.mongoDB = new MongoLib();
    this.mysqlLib = new MysqlLib();
  }

  async getApiKey({ token }) {
    const [apiKey] = await this.mongoDB.getAll(this.collection, { token });
    return apiKey;
  }

  async getAllRoles() {
    const roles = await this.mysqlLib.getAllRoles();
    return roles;
  }

  async getRoleById({ id }) {
    const roles = await this.mysqlLib.getRoleById({ id });
    return roles;
  }

  async changeRoleById({ id }, values) {
    const roles = await this.mysqlLib.changeRoleById({ id }, values);
    return roles;
  }

  async testRole() {
    const testRole = await this.mysqlLib.testRole();
    return testRole;
  }
}

module.exports = ApiKeysService;
