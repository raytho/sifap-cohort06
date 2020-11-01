/* eslint-disable no-unused-vars */
const MysqlLib = require("../lib/mysql");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const config = require("../config");
const { object } = require("@hapi/joi");

const TABLE_PRODUCTS = "product";
const TABLE_FISCAL_DATA = "fiscal_data";
const TABLE_USER = "users";
const TABLE_COUNTRIES = "countries";
class UsersService {
  constructor() {
    this.mysqlLib = new MysqlLib();
  }

  async createSuperAdminUser({ user }, userInvitation) {
    const { firstName, email, password, country, typeEmail } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = userInvitation.role;
    const createdBy = userInvitation.createdBy;
    const userId = nanoid(4);

    const response = await this.mysqlLib.createSuperAdminUser({
      firstName,
      userId,
      email,
      password: hashedPassword,
      typeEmail,
      country,
      role,
      createdBy,
    });
    return response;
  }

  async updateInvitationByUserInvited(userInvitation) {
    const createdBy = userInvitation.createdBy;
    const response = await this.mysqlLib.updateInvitationByUserInvited(
      createdBy
    );
    return response;
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

  async getFirstUser() {
    const users = await this.mysqlLib.getFirstUser();
    return users.length;
  }

  async getUserById(id) {
    const user = await this.mysqlLib.getUserById(id);
    return user;
  }

  async getUserByMail({ email }) {
    try {
      const user = await this.mysqlLib.getUserByMail(email);
      return user[0];
    } catch (error) {
      console.log(error);
    }
  }

  async getInviteInfo({ email }) {
    try {
      const infoInvite = await this.mysqlLib.getInvitedUserByMail(email);
      return infoInvite[0];
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUserById(id) {
    const user = await this.mysqlLib.removeUserByID(id);
    return user;
  }

  async sendResetLink(request) {
    const smtpTransport = nodemailer.createTransport({
      service: config.mailProvider,
      auth: {
        user: config.mailAccount,
        pass: config.mailPassword,
      },
    });

    const mailOptions = {
      to: request.email,
      from: "passwordreset@demo.com",
      subject: "Sifap Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.
        Please click on the following link, or paste this into your browser to complete the process:
        http://${request.host}/reset/${request.token} 
        If you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    smtpTransport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        return info.response;
      }
    });
  }

  async sendUserInvitation(request, user) {
    const smtpTransport = nodemailer.createTransport({
      service: config.mailProvider,
      auth: {
        user: config.mailAccount,
        pass: config.mailPassword,
      },
    });

    const mailOptions = {
      to: user.email,
      from: "invite_sifap@sifap.com",
      subject: "Sifap Invite",
      text: `You're invite to join in SIFAP system. Please create an account in the following link
        Please click on the following link, or paste this into your browser to complete the process:
        https://sifap.netlify.app/#/Register 
        If you did not request this, please ignore this email.`,
    };

    smtpTransport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
        return info.response;
      }
    });
  }

  async sendTokenToMail(email, token) {
    const smtpTransport = nodemailer.createTransport({
      service: config.mailProvider,
      auth: {
        user: config.mailAccount,
        pass: config.mailPassword,
      },
    });

    const mailOptions = {
      to: email,
      from: "passwordreset@demo.com",
      subject: "Sifap verification code",
      text: `Hello,
      For security purposes, you must enter the code below to verify your account. The code will only work for 5 minutes and if you request a new code, this code will stop working.
      Account verification code:
      ${token}
      `,
    };

    smtpTransport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
      } else {
        return info.response;
      }
    });
  }

  async createAccoutSetting(account) {
    const response = await this.mysqlLib.addAccountSetting(account);
    return response;
  }
  // CRUD Users Invitations
  async addUserInvited({ user }, createdBy) {
    const { email, role } = user;
    const userId = nanoid(4);

    const response = await this.mysqlLib.addUserInvited({
      email,
      role,
      userId,
      createdBy,
    });
    return response;
  }

  async getAllInvitedUsers() {
    const users = await this.mysqlLib.getInvitedUsers();
    return users;
  }

  async getActiveInvitesUsersByCreatedUser(userToken) {
    const users = await this.mysqlLib.getActiveInvitesUsersByCreatedUser(
      userToken.email
    );
    return users;
  }

  async getInvitedUserById(id) {
    const user = await this.mysqlLib.getInvitedUserById(id);
    return user;
  }

  async getInvitedUserByMail(userToken) {
    const user = await this.mysqlLib.getInvitedUserByMail(userToken.email);
    return user;
  }

  async getInvitedUserByCreatedMail({ email }) {
    const user = await this.mysqlLib.getInvitedUserByCreatedMail(email);
    return user;
  }

  async deleteInvitedUserById(id) {
    const user = await this.mysqlLib.removeInvitedUserByID(id);
    return user;
  }

  async updatePasswordUserByID(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const response = await this.mysqlLib.updatePasswordUserByID(
      id,
      hashedPassword
    );
    return response;
  }

  async getUserBytoken(token) {
    const user = await this.mysqlLib.getUserByToken(token);
    return user[0];
  }

  async activeTwoFactorUserByID(isActive, user) {
    const active = await this.mysqlLib.updateTwoFactorByUser(isActive, user);
    return active.affectedRows;
  }

  async activeTwoFactorAllUsersByCreated(isActive, user) {
    const active = await this.mysqlLib.activeTwoFactorAllUsersByCreated(
      isActive,
      user
    );
    return active.affectedRows;
  }

  async updateUserProfile(user, id) {
    const fiscalId = await this.mysqlLib.get("id", TABLE_FISCAL_DATA, "fiscalId", user.fiscalId);
    const data = {
      fiscalId: user.fiscalId,
      companyName: user.companyName,
    };

    if (fiscalId.length) {
      await this.mysqlLib.update(TABLE_FISCAL_DATA, data, "id", fiscalId[0].id);
      const userFiscalId = { fiscalId: fiscalId[0].id };
      await this.mysqlLib.update(TABLE_USER, userFiscalId, "userId", id);
    } else {

      const cols = [];
      const values = [];
      const arrayValues = [];

      for (let itemValues in data) {
        cols.push(itemValues);
        values.push(data[itemValues]);
      }
      arrayValues.push(values);
      await this.mysqlLib.upsert(TABLE_FISCAL_DATA, cols, arrayValues);
    }
    
    const idCountry =
      user.country === "COL" ? 1
        : user.country === "MEX" ? 2
          : user.country === "DOM" ? 3 : 0;
    const userProfile = {
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      city: user.city,
      state: user.state,
      idCountry: idCountry,
      twoFactorActive: user.twoFactorActive,
    };
    const updatedProfile = await this.mysqlLib.update(TABLE_USER, userProfile, "userId", id);
    return updatedProfile.affectedRows;
  }

  async insertUserProfileUrl(url, userId) {
    const changedImgProfile = await this.mysqlLib.updateProfileImage(
      url,
      userId
    );
    return changedImgProfile;
  }

  async updateRolByUserId(id, data) {
    const updatedRol = await this.mysqlLib.updateRolByUserId(id, data);
    return updatedRol.affectedRows;
  }

  async upsertFiscalData(data, id) {
    const countryId =
      data.country === "COL" ? 1
        : data.country === "MEX" ? 2
          : data.country === "DOM" ? 3 : undefined;
    delete data.country;
    const fiscalDataName = data["cfName"];
    const fiscalDataValues = data["cf"];
    const increment = data["increment"];
    delete data.cfName;
    delete data.cf;
    delete data.increment;
    const fiscalData = {
      id: countryId,
      ...data,
      ...fiscalDataName,
      ...fiscalDataValues,
      ...increment,
    };
    const userFiscalData = await this.mysqlLib.upsertUserFiscalData(fiscalData);
    return userFiscalData;
  }

  async updateUserData(data, id) {
    const updatedUserData = {
      firstName: data.firstName,
      lastName: data.lastName,
      dateOfBirth: data.dateOfBirth,
      country: data.country,
    };
    const userData = await this.mysqlLib.updateUserData(updatedUserData, id);
    return userData;
  }

  async checkInitialConfig(countryId) {
    if (countryId !== null || countryId !== undefined){
      return undefined;
    }
    const initialConfig = await this.mysqlLib.verifyInitialConfig(countryId);
    if (initialConfig) {
      return initialConfig.fiscalIdentifierName;
    } else {
      return initialConfig;
    }
  }

  async generateInvoceMx(invoiceData, userData) {
    const {
      firstName,
      phoneNumber,
      email,
      products,
      clientName,
      clientFiscalIdentifier,
      clientAdress,
      currency,
      cfdiUse,
      paymentMethod,
    } = invoiceData;

    //ESTÁ OK
    await this.insertProducts(products);
    const amount = this.calcTotalAmount(products);
    const IVA = 0.16;
    const tax = this.calcTax(amount, IVA);
  }

  async generateInvoceCol(invoiceData, userData) {
    console(invoiceData, userData);
  }

  async generateInvoceRd(invoiceData, userData) {
    console(invoiceData, userData);
  }

  async insertProducts(products) {
    const newProducts = Object.assign({}, products);
    console.log(newProducts);
    const arrayProducts = [];
    const columns = [];
    for (let product in newProducts) {
      delete newProducts[product].qty;
      arrayProducts.push(Object.values(newProducts[product]));
      columns.push(Object.keys(newProducts[product]));
    }

    //ITS OK
    await this.mysqlLib.upsert(TABLE_PRODUCTS, columns[0], arrayProducts);
  }

  calcTax(amount, taxValue) {
    console.log("test");
  }

  calcTotalAmount(products) {
    console.log(products, "2");
    const objProducts = [];
    for (let product in products) {
      objProducts.push(products[product]);
    }

    const reducer = (accum, currentValue) => accum.price * accum.qty;
    const total = objProducts.map(reducer);
    console.log(total);
  }

  clean(obj) {
    for (var propName in obj) { 
      if (obj[propName] === null || obj[propName] === "") {
        delete obj[propName];
      }
    }
  }

  async getCountry(id) {
    if (!id){
      return "No definido";
    }
    const country = await this.mysqlLib.get("code", TABLE_COUNTRIES, "idcountries", id);
    return country[0].code;
  }
}

module.exports = UsersService;
