const MysqlLib = require("../lib/mysql");

class StadisticsService {
  constructor() {
    this.mysqlLib = new MysqlLib();
  }

  async getAllTaxReceips() {
    const receips = await this.mysqlLib.getAllTaxReceips();
    return receips;
  }

  async getTaxReceipsById(id) {
    try {
      const countryAdded = await this.mysqlLib.getTaxReceipsById(id);
      return countryAdded;
    } catch (error) {}
  }

  async getAllProducts() {
    const products = await this.mysqlLib.getAll("*", "product", "", "");
    return products;
  }
}

module.exports = StadisticsService;
