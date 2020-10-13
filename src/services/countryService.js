const MysqlLib = require("../lib/mysql");

class CountryService {
  constructor() {
    this.collection = "sifap_users";
    this.mysqlLib = new MysqlLib();
  }

  async getCountries() {
    const contries = await this.mysqlLib.getCountries();
    return contries;
  }

  async createCountry({ country }) {
    try {
      const countryAdded = await this.mysqlLib.createCountry(country);
      return countryAdded;
    } catch (error) {}
  }
}

module.exports = CountryService;
