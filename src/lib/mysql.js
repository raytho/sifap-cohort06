const mysql = require("mysql");
const config = require("../config");

const DB_HOST = config.dbHost;
const DB_USER = config.dbUser;
const DB_PASSWORD = config.dbPassword;
const DB_NAME = config.dbName;
const DB_PORT = config.dbPort;

const dbconfig = {
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT,
};

let connection;

function handleCon() {
  connection = mysql.createConnection(dbconfig);

  connection.connect((err) => {
    if (err) {
      console.error("[db err]", err);
      setTimeout(handleCon, 2000);
    } else {
      console.log("DB Connected!");
    }
  });

  connection.on("error", (err) => {
    console.error("[db err]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      this.handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

function MysqlLib() {
  return {
    createRole(newRole) {
      return new Promise((resolve, reject) => {
        connection.query("INSERT INTO roles SET ?", newRole, (err, res) => {
          if (err) {
            console.error(err);
            reject(new Error("Error to insert role"));
          } else {
            resolve(res);
          }
        });
      });
    },

    // ROLES
    getAllRoles() {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        connection.query(`SELECT * FROM roles`, function (err, rows) {
          if (rows === undefined) {
            reject(new Error("Error rows is undefined"));
          } else {
            resolve(rows);
          }
        });
      });
    },

    getRoleById({ id }) {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        connection.query(`SELECT * FROM roles WHERE rolId = ?`, [id], function (
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
    },

    changeRoleById({ id }, values) {
      return new Promise(function (resolve, reject) {
        connection.query(
          // eslint-disable-next-line quotes
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
    },

    testRole() {
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line quotes
        connection.query(`SELECT 1+1 AS solution`, function (err, result) {
          if (err) {
            reject(new Error("Error in role"));
          } else {
            resolve(result);
          }
        });
      });
    },

    // INVITED USERS
    addUserInvited(newUserInvited) {
      return new Promise((resolve, reject) => {
        connection.query(
          "INSERT INTO users_invitation SET ?",
          newUserInvited,
          (err, res) => {
            if (err) {
              console.error(err);
              reject(new Error("Error to insert role"));
            } else {
              resolve(res);
            }
          }
        );
      });
    },

    getInvitedUsers() {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        connection.query(`SELECT * FROM users_invitation`, function (
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
    },

    getInvitedUserById(id) {
      return new Promise((resolve, reject) => {
        connection.query(
          "SELECT * FROM users_invitation WHERE userId = ?",
          id,
          function (err, rows) {
            if (rows === undefined) {
              reject(new Error("Error rows is undefined"));
            } else {
              resolve(rows);
            }
          }
        );
      });
    },

    getInvitedUserByMail(email) {
      return new Promise((resolve, reject) => {
        connection.query(
          "SELECT * FROM users_invitation WHERE email = ?",
          email,
          function (err, rows) {
            if (rows === undefined) {
              reject(new Error("Error rows is undefined"));
            } else {
              resolve(rows);
            }
          }
        );
      });
    },

    removeInvitedUserByID(id) {
      return new Promise(function (resolve, reject) {
        connection.query(
          "DELETE FROM users_invitation WHERE userId = ?",
          id,
          function (err) {
            if (err) {
              reject(new Error("Error on user delete"));
            } else {
              resolve(id);
            }
          }
        );
      });
    },

    // USERS
    addUser(newUser) {
      return new Promise((resolve, reject) => {
        connection.query("INSERT INTO users SET ?", newUser, (err, res) => {
          if (err) {
            console.error(err);
            reject(new Error("Error to insert user"));
          } else {
            resolve(res);
          }
        });
      });
    },

    createSuperAdminUser(user) {
      return new Promise((resolve, reject) => {
        connection.query("INSERT INTO users SET ?", user, (err, res) => {
          if (err) {
            console.error(err);
            reject(new Error("Error to insert user"));
          } else {
            resolve(res);
          }
        });
      });
    },

    getAllUsers() {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        connection.query("SELECT * FROM users", function (err, rows) {
          if (rows === undefined) {
            reject(new Error("Error rows is undefined"));
          } else {
            resolve(rows);
          }
        });
      });
    },

    getFirstUser() {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        connection.query("SELECT * FROM test_table LIMIT 1", function (
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
    },

    getUserById(id) {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        connection.query("SELECT * FROM users WHERE userId = ?", id, function (
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
    },

    getUserByMail(mail) {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        connection.query("SELECT * FROM users WHERE email = ?", mail, function (
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
    },

    removeUserByID(id) {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        connection.query("DELETE FROM users WHERE userId = ?", id, function (
          err
        ) {
          if (err) {
            reject(new Error("Error on user delete"));
          } else {
            resolve(id);
          }
        });
      });
    },

    getSuperAdminUsers() {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        connection.query(`SELECT * FROM users WHERE role <> "SA"`, function (
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
    },

    updateUserByID(id) {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line quotes
        connection.query(
          `SELECT * FROM users_invitation WHERE userId = ${id}`,
          function (err, rows) {
            if (rows === undefined) {
              reject(new Error("Error rows is undefined"));
            } else {
              resolve(rows);
            }
          }
        );
      });
    },

    updatePasswordUserByID(id, newPassword) {
      return new Promise(function (resolve, reject) {
        connection.query(
          "UPDATE users SET password = ? WHERE email = ?",
          [newPassword, id],
          function (err, rows) {
            if (rows === undefined) {
              reject(new Error("Error rows is undefined"));
            } else {
              resolve(rows);
            }
          }
        );
      });
    },

    addAccountSetting(account) {
      return new Promise((resolve, reject) => {
        connection.query(
          "INSERT INTO accountSettings SET ?",
          account,
          (err, res) => {
            if (err) {
              console.error(err);
              reject(new Error("Error to insert user"));
            } else {
              resolve(res);
            }
          }
        );
      });
    },
    getUserByToken(token) {
      return new Promise((resolve, reject) => {
        connection.query(
          "SELECT * FROM accountSettings WHERE token = ?",
          [token],
          (err, res) => {
            if (err) {
              console.error(err);
              reject(new Error("Error in accountSettings"));
            } else {
              resolve(res);
            }
          }
        );
      });
    },

    //GET COUNTRIES
    getCountries() {
      return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM countries", (err, res) => {
          if (err) {
            console.error(err);
            reject(new Error("Error in accountSettings"));
          } else {
            resolve(res);
          }
        });
      });
    },

    //GET PERMISSES
    getPermisses() {
      return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM permises", (err, res) => {
          if (err) {
            console.error(err);
            reject(new Error("Error in accountSettings"));
          } else {
            resolve(res);
          }
        });
      });
    },
    getPermissesByRol(rolId) {
      return new Promise((resolve, reject) => {
        connection.query(
          `SELECT a.idPermission, b.name, b.urlIcon FROM sifap.userPermissions a
            INNER JOIN sifap.permissions b
            ON a.idPermission = b.idPermission WHERE a.rolId = ?`,
          [rolId],
          (err, res) => {
            if (err) {
              console.error(err);
              reject(new Error("Error in accountSettings"));
            } else {
              resolve(res);
            }
          }
        );
      });
    },
    updateTwoFactorByUser(isActive, user) {
      return new Promise(function (resolve, reject) {
        connection.query(
          "UPDATE users SET twoFactorActive = ? WHERE userId = ?",
          [isActive, user.userId],
          function (err, rows) {
            if (rows === undefined) {
              reject(new Error("Error rows is undefined"));
            } else {
              resolve(rows);
            }
          }
        );
      });
    },
  };
}

module.exports = MysqlLib;
