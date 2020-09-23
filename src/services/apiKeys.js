const MongoLib = require("../lib/mongo");

class ApiKeysService {
  constructor() {
    this.collection = "sifap-api-keys";
    this.mongoDB = new MongoLib();
  }

  async getApiKey({ token }) {
    const [apiKey] = await this.mongoDB.getAll(this.collection, { token });
    return apiKey;
  }
}

module.exports = ApiKeysService;
