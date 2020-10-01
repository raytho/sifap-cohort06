const MongoLib = require("../lib/mongo");
const MysqlLib = require("../lib/mysql");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");

class UsersService {
  constructor() {
    this.collection = "sifap_users";
    this.mongoDB = new MongoLib();
    this.mysqlLib = new MysqlLib();
  }

  async addUser({ user }) {
    const {
      email,
      password,
      phoneNumber,
      firstName,
      lastName,
      dateOfBirth,
      city,
      state,
      country,
      taxReceiptLimit,
      fiscalId,
      createdAt,
      role,
      fiscalAct,
    } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = nanoid(4);

    const response = await this.mysqlLib.addUser({
      userId,
      email,
      password: hashedPassword,
      phoneNumber,
      firstName,
      lastName,
      dateOfBirth,
      city,
      state,
      country,
      taxReceiptLimit,
      fiscalId,
      createdAt,
      role,
      fiscalAct,
    });
    return response;
  }

  async getAllUsers() {
    const users = await this.mysqlLib.getAllUsers();
    return users;
  }

  async getUserById( id ) {
    const user = await this.mysqlLib.getUserById(id);
    return user;
  }

  async deleteUserById(id) {
    const user = await this.mysqlLib.removeUserByID(id);
    return user;
  }

  async sendResetLink(email, id) {
    const params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: `To reset your password, please click on this link: http://localhost:3000/reset/${id}`,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Reset password instructions",
        },
      },
      Source: "codingwithchaim@gmail.com",
    };
    return params;
  }

  // CRUD Users Invitations
  async addUserInvited({user}) {
    const { email, firstName, role } = user;
    const userId = nanoid(4);

    const response = await this.mysqlLib.addUserInvited({
      email,
      firstName,
      role,
      userId
    });
    return response;
  }

  async getAllInvitedUsers() {
    const users = await this.mysqlLib.getInvitedUsers();
    return users;
  }

  async getInvitedUserById(id) {
    const user = await this.mysqlLib.getInvitedUserById(id);
    return user;
  }

  async deleteInvitedUserById(id) {
    const user = await this.mysqlLib.removeInvitedUserByID(id);
    return user;
  }
}

module.exports = UsersService;
