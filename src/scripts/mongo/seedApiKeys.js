/* eslint-disable no-undef */
// DEBUG=app:* node src/scripts/mongo/seedApiKeys.js

const chalk = require("chalk");
const crypto = require("crypto");
const debug = require("debug")("app:scripts:api-keys");
const MongoLib = require("../../lib/mongo");

const adminScopes = [
  "signin:auth",
  "signup:auth",
  "read:user",
  "create:user",
  "delete:user",
];

const publicScopes = ["signin:auth", "signup:auth", "read:user"];

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes,
  },
  {
    token: generateRandomToken(),
    scopes: publicScopes,
  },
];

function generateRandomToken() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString("hex");
}

async function seedApiKeys() {
  try {
    const mongoDB = new MongoLib();

    const promises = apiKeys.map(async (apiKey) => {
      await mongoDB.create("sifap-api-keys", apiKey);
    });

    await Promise.all(promises);
    debug(
      chalk.green(`${promises.length} api keys have been created succesfully`)
    );
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedApiKeys();
