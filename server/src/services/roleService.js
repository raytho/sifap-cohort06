const MysqlLib = require("../lib/mysql");

class roleService {
  constructor(role) {
    this.rolId = role.rolId;
    this.name = role.name;
  }

  async createRole(roleService) {
    const mysqllib = new MysqlLib();
    const addedRole = await mysqllib.createRole(roleService);
    return addedRole;
  }
}

module.exports = roleService;
