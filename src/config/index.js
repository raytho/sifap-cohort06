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
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  twoFactorSecret: process.env.TWO_FACTOR_SECRET,
  otpAuthUrl: process.env.OTP_AUTH_URL,
  authTwoFactorJwtSecret: process.env.AUTH_TWO_FACTOR_JWT_SECRET,
  mailProvider: process.env.MAIL_PROVIDER,
  mailAccount: process.env.MAIL_ACCOUNT,
  mailPassword: process.env.MAIL_PASSWORD,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
};

module.exports = config;
