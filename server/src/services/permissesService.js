/* eslint-disable indent */
const MysqlLib = require("../lib/mysql");

class PermissesService {
  constructor() {
    this.mysqlLib = new MysqlLib();
  }

  async getPermisses() {
    try {
      const permisses = await this.mysqlLib.getPermisses();
      return permisses;
    } catch (error) {
      console.error(error);
    }
  }

  async getPermissesByRol(user) {
    try {
      let rolId = 0;
      switch (user.role) {
        case "SuperAdministrador":
          rolId = 3;
          break;
        case "Administrador":
          rolId = 2;
          break;
        case "Empleado":
          rolId = 1;
          break;
        default:
          break;
      }
      const permissions = await this.mysqlLib.getPermissesByRol(rolId);
      return permissions;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = PermissesService;
