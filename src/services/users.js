const MongoLib = require("../lib/mongo");
const bcrypt = require("bcrypt");

class UsersService {
  constructor() {
    this.collection = "sifap_users";
    this.mongoDB = new MongoLib();
  }

  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collection, { email });
    return user;
  }

  async createUser({ user }) {
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

    const createUserId = await this.mongoDB.create(this.collection, {
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

    return createUserId;
  }

  async getOrCreateUser({ user }) {
    const queriedUser = await this.getUser({ email: user.email });

    if (queriedUser) {
      return queriedUser;
    }

    await this.createUser({ user });
    return await this.getUser({ email: user.email });
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
}

module.exports = UsersService;
