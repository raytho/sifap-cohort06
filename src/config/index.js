/* eslint-disable no-undef */
require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV !== "production",
  port: process.env.PORT || 3000,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  mongoDbUser: process.env.MONGO_DB_USER,
  mongoDbPassword: process.env.MONGO_DB_PASSWORD,
  mongoDbHost: process.env.MONGO_DB_HOST,
  mongoDbName: process.env.MONGO_DB_NAME,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
  adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN,
};

module.exports = config;
