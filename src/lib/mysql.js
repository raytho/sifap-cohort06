const mysql = require("mysql");
const config = require("../config");
// const { connect } = require("../routes/api");

const DB_HOST = config.dbHost;
const DB_USER = config.dbUser;
const DB_PASSWORD = config.dbPassword;
const DB_NAME = config.dbName;
const DB_PORT = config.dbPort;

class MysqlLib {
  constructor() {
    this.client = mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
    });
  }

  connect() {
    if (!MysqlLib.connection) {
      MysqlLib.connection = new Promise((resolve, reject) => {
        this.client.connect((error) => {
          if (error) {
            reject(error);
          } else {
            console.log("Connected to database");
            resolve(this.client.config.database);
          }
        });
      });
    }

    return MysqlLib.connection;
  }

  getAll(id) {
    const _id = id;
    const client = this.client;
    return this.connect().then(() => {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        client.query(`SELECT * FROM users WHERE test = ${_id}`, function (
          err,
          rows
        ) {
          if (rows === undefined) {
            reject(new Error("Error rows is undefined"));
          } else {
            resolve(rows);
          }
        });
      });
    });
  }

  createRole(newRole, result) {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise((resolve, reject) => {
        client.query("INSERT INTO roles SET ?", newRole, (err, res) => {
          if (err) {
            console.error(err);
            reject(new Error("Error to insert role"));
          } else {
            resolve(res);
          }
        });
      });
    });
  }

  getAllRoles() {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        client.query(`SELECT * FROM roles`, function (err, rows) {
          if (rows === undefined) {
            reject(new Error("Error rows is undefined"));
          } else {
            resolve(rows);
          }
        });
      });
    });
  }

  getRoleById({ id }) {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        client.query(`SELECT * FROM roles WHERE rolId = ?`, [id], function (
          err,
          rows
        ) {
          if (rows === undefined) {
            reject(new Error("Error rows is undefined"));
          } else {
            resolve(rows);
          }
        });
      });
    });
  }

  changeRoleById({ id }, values) {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        client.query(
          `UPDATE roles SET name = ? WHERE rolId = ?`,
          [values, id],
          function (err, result) {
            if (err) {
              reject(new Error("Error in role"));
            } else {
              resolve(result);
            }
          }
        );
      });
    });
  }

  testRole() {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise((resolve, reject) => {
        client.query(`SELECT 1+1 AS solution`, function (err, result) {
          if (err) {
            reject(new Error("Error in role"));
          } else {
            resolve(result);
          }
        });
      });
    });
  }

  addUserInvited(newUserInvited) {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise((resolve, reject) => {
        client.query("INSERT INTO users SET ?", newUserInvited, (err, res) => {
          if (err) {
            console.error(err);
            reject(new Error("Error to insert role"));
          } else {
            resolve(res);
          }
        });
      });
    });
  }

  getSuperAdminUsers() {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        client.query(`SELECT * FROM users WHERE role <> "SA"`, function (
          err,
          rows
        ) {
          if (rows === undefined) {
            reject(new Error("Error rows is undefined"));
          } else {
            resolve(rows);
          }
        });
      });
    });
  }
}

module.exports = MysqlLib;

async function getId(id) {
  const msqlLib2 = new MysqlLib();
  const name = await msqlLib2.getAll(id);
  return name;
}

async function test() {
  const data = await getId(4);
  console.log(data[0]);
  return data;
}
