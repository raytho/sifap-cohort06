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
    this.client = mysql.createPool({
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
        this.client.getConnection((error) => {
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

  createRole(newRole) {
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

  // ROLES
  getAllRoles() {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        client.query(`SELECT * FROM roles`, function (err, rows) {
          if (rows === undefined) {
            reject(new Error("Error rows is undefined"));
          } else {
            client.end();
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
            client.end();
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
        client.query(
          // eslint-disable-next-line quotes
          `UPDATE roles SET name = ? WHERE rolId = ?`,
          [values, id],
          function (err, result) {
            if (err) {
              reject(new Error("Error in role"));
            } else {
              client.end();
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
        // eslint-disable-next-line quotes
        client.query(`SELECT 1+1 AS solution`, function (err, result) {
          if (err) {
            reject(new Error("Error in role"));
          } else {
            client.end();
            resolve(result);
          }
        });
      });
    });
  }

  // INVITED USERS
  addUserInvited(newUserInvited) {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise((resolve, reject) => {
        client.query(
          "INSERT INTO users_invitation SET ?",
          newUserInvited,
          (err, res) => {
            if (err) {
              console.error(err);
              reject(new Error("Error to insert role"));
            } else {
              client.end();
              resolve(res);
            }
          }
        );
      });
    });
  }

  getInvitedUsers() {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        client.query(`SELECT * FROM users_invitation`, function (err, rows) {
          if (rows === undefined) {
            reject(new Error("Error rows is undefined"));
          } else {
            client.end();
            resolve(rows);
          }
        });
      });
    });
  }

  getInvitedUserById(id) {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        client.query(
          `SELECT * FROM users_invitation WHERE userId = ${id}`,
          function (err, rows) {
            if (rows === undefined) {
              reject(new Error("Error rows is undefined"));
            } else {
              client.end();
              resolve(rows);
            }
          }
        );
      });
    });
  }

  removeInvitedUserByID(id) {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        client.query("DELETE FROM users_invitation WHERE userId = ?", id,
          function (err) {
            if (err) {
              reject(new Error("Error on user delete"));
            } else {
              client.end();
              resolve(id);
            }
          }
        );
      });
    });
  }

  // USERS
  addUser(newUser) {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise((resolve, reject) => {
        client.query("INSERT INTO users SET ?", newUser, (err, res) => {
          if (err) {
            console.error(err);
            reject(new Error("Error to insert user"));
          } else {
            client.end();
            resolve(res);
          }
        });
      });
    });
  }

  getAllUsers() {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        client.query("SELECT * FROM users", function (err, rows) {
          if (rows === undefined) {
            reject(new Error("Error rows is undefined"));
          } else {
            client.end();
            resolve(rows);
          }
        });
      });
    });
  }

  getUserById(id) {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        client.query("SELECT * FROM users WHERE userId = ?", id, function (err, rows) {
          if (rows === undefined) {
            reject(new Error("Error rows is undefined"));
          } else {
            client.end();
            resolve(rows);
          }
        });
      });
    });
  }

  removeUserByID(id) {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        client.query("DELETE FROM users WHERE userId = ?", id,
          function (err) {
            if (err) {
              reject(new Error("Error on user delete"));
            } else {
              client.end();
              resolve(id);
            }
          }
        );
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
            client.end();
            resolve(rows);
          }
        });
      });
    });
  }

  updateUserByID(id) {
    const client = this.client;
    return this.connect().then(() => {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        client.query(
          `SELECT * FROM users_invitation WHERE userId = ${id}`,
          function (err, rows) {
            if (rows === undefined) {
              reject(new Error("Error rows is undefined"));
            } else {
              client.end();
              resolve(rows);
            }
          }
        );
      });
    });
  }
}

module.exports = MysqlLib;

// async function getId(id) {
//   const msqlLib2 = new MysqlLib();
//   const name = await msqlLib2.getAll(id);
//   return name;
// }

// async function test() {
//   const data = await getId(4);
//   console.log(data[0]);
//   return data;
// }
