/* eslint-disable no-unused-vars */
const MysqlLib = require("../lib/mysql");
const { nanoid, customAlphabet } = require("nanoid");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const config = require("../config");
const invoiceMxData = require("../utils/mocks/invoice");
const { createInvoice } = require("../services/files/createInvoiceMx");
const { uploadPdf } = require("../services/storage/profilePicturesUpload");
const multer = require("multer");

const TABLE_PRODUCTS = "product";
const TABLE_FISCAL_DATA = "fiscal_data";
const TABLE_USER = "users";
const TABLE_COUNTRIES = "countries";
const TABLE_CLIENTS = "clients";
const HEX_CHARACTER = "0123456789abcdef";
const TABLE_TAX_RECEIPT = "taxReceipt";
const TABLE_COUNTRY_CONFIG = "country_config";

//Impuestos por país
let IVA_COLOMBIA = 0.19;

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
      console.error(error);
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
        http://${request.host}/#/newpassword/${request.token} 
        If you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    smtpTransport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
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
        https://sifap.netlify.app/register 
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
    const fiscalId = await this.mysqlLib.get(
      "id",
      TABLE_FISCAL_DATA,
      "fiscalId",
      user.fiscalId
    );
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
    const updatedProfile = await this.mysqlLib.update(
      TABLE_USER,
      userProfile,
      "userId",
      id
    );
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
    const idCountry =
      data.country === "COL" ? 1
        : data.country === "MEX" ? 2
          : data.country === "DOM" ? 3 : 0;
    delete data.firstName;
    delete data.lastName;
    delete data.dateOfBirth;
    delete data.country;
    const fiscalDataName = data["cfName"];
    const fiscalDataValues = data["cf"];
    const increment = data["increment"];
    delete data.cfName;
    delete data.cf;
    delete data.increment;
    const fiscalData = {
      id: idCountry,
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
    if (countryId === null || countryId === undefined) {
      return undefined;
    }
    const initialConfig = await this.mysqlLib.verifyInitialConfig(countryId);
    if (initialConfig) {
      return initialConfig.fiscalIdentifierName;
    } else {
      return initialConfig;
    }
  }

  async generateInvoceMx(invoiceData, userData, res) {
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
    const pdfInvoice = await createInvoice(invoiceMxData, "invoice.pdf");
    const uploadeInvoice = await uploadPdf(pdfInvoice);
    console.log(uploadeInvoice);
    
    //ESTÁ OK
    await this.insertProducts(products);
    const amount = this.calcTotalAmount(products);
    const IVA = 0.16;
    const tax = +this.calcTax(amount, IVA).toFixed(2);
    const fiscalUUID = this.generateHexUUID();
    const fiscalTax = await this.generateFiscalTax(userData.idCountry);
    const valuesObj = {
      userFirstName: firstName,
      userFiscalId: clientFiscalIdentifier,
      userPhoneNumber: phoneNumber,
      userEmail: email,
      contactFiscalId: clientFiscalIdentifier,
      userAddress: clientAdress,
      currency: currency,
      methodPayment: paymentMethod,
      taxReceiptNumber: fiscalTax,
    };

    const insertedTaxReceipt = await this.mysqlLib.singleUpsert(
      TABLE_TAX_RECEIPT,
      valuesObj
    );
    res.status(200).json({
      message: insertedTaxReceipt.insertId,
      error: null,
    });
  }

  async generateInvoceCol(invoiceData, userData) {
    const {
      firstName,
      email,
      clientFiscalIdentifier,
      phoneNumber,
      products,
      paymentMethod,
    } = invoiceData;

    await this.insertProducts(products);
    const amount = this.calcTotalAmount(products);
    const tax = +this.calcTax(amount, IVA_COLOMBIA).toFixed(2);
    const fiscalUUID = this.generateHexUUID();
    const fiscalTax = this.generateFiscalTax(userData.idCountry);
  }

  async getFiscalData(fiscalId) {
    if (!fiscalId) {
      return undefined;
    }
    const fiscalData = await this.mysqlLib.get(
      "companyName, fiscalId",
      TABLE_FISCAL_DATA,
      "id",
      fiscalId
    );
    if (fiscalData.length) {
      return fiscalData[0];
    }
    return undefined;
  }

  async generateInvoceRd(invoiceData, userData) {
    console(invoiceData, userData);
  }

  async insertProducts(products) {
    const newProducts = Object.assign({}, products);
    const arrayProducts = [];
    const columns = [];
    for (let product in newProducts) {
      const { qty, ...filteredProduct } = newProducts[product];
      arrayProducts.push(Object.values(filteredProduct));
      columns.push(Object.keys(filteredProduct));
    }
    //ITS OK
    //await this.mysqlLib.upsert(TABLE_PRODUCTS, columns[0], arrayProducts);
  }

  calcTax(amount, taxValue) {
    return amount * taxValue;
  }

  calcTotalAmount(products) {
    const objProducts = [];

    for (let product in products) {
      objProducts.push(products[product]);
    }

    const reducer = (product) => product.qty * product.price;
    const total = objProducts.map(reducer);
    const totalAmount = total.reduce(
      (accum, currentValue) => accum + currentValue
    );
    return totalAmount;
  }

  clean(obj) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === "") {
        delete obj[propName];
      }
    }
    return obj;
  }

  async getCountry(id) {
    if (!id || id === 0) {
      return "No definido";
    }
    const country = await this.mysqlLib.get(
      "code",
      TABLE_COUNTRIES,
      "idcountries",
      id
    );
    return country[0].code;
  }

  async sendInvalidResponse(res) {
    res.status(400).json({
      message: "País inválido",
    });
  }

  async getUserClients(userId, res) {
    if (!userId) {
      res.status(400).json({
        message: "Error interno",
      });
    } else {
      const clientData = await this.mysqlLib.get(
        "*",
        TABLE_CLIENTS,
        "userId",
        userId
      );
      if (clientData.length) {
        res.status(200).json({
          clients: clientData,
        });
      } else {
        res.status(500).json({
          message: "No existen clientes para este usuario",
          clients: clientData,
        });
      }
    }
  }

  async getClient(clientId, res) {
    if (!clientId) {
      res.status(400).json({
        message: "Error interno",
      });
    } else {
      const clientData = await this.mysqlLib.get(
        "*",
        TABLE_CLIENTS,
        "clientId",
        clientId
      );
      if (clientData.length) {
        res.status(200).json({
          clients: clientData,
        });
      } else {
        res.status(500).json({
          message: "Cliente no encontrado",
          clients: clientData,
        });
      }
    }
  }

  async upsertClients(userId, clientData, res) {
    if (!userId || !clientData) {
      res.status(400).json({
        message: "Error interno",
      });
    } else {
      clientData.clientId = nanoid(4);
      clientData.userId = userId;
      const upsertedClient = await this.mysqlLib.singleUpsert(
        TABLE_CLIENTS,
        clientData
      );
      if (upsertedClient) {
        res.status(200).json({
          message: "Cliente agregado correctamente",
        });
      } else {
        res.status(500).json({
          message: "Error al crear cliente",
        });
      }
    }
  }

  async updateClient(clientId, clientData, res) {
    if (!clientId || !clientData) {
      res.status(400).json({
        message: "Error interno",
      });
    } else {
      const upsertedClient = await this.mysqlLib.update(
        TABLE_CLIENTS,
        clientData,
        "clientId",
        clientId
      );
      if (upsertedClient) {
        res.status(200).json({
          message: "Cliente actualizado correctamente",
        });
      } else {
        res.status(500).json({
          message: "Error al actualizar cliente",
        });
      }
    }
  }

  async deleteClient(clientId, res) {
    if (!clientId) {
      res.status(400).json({
        message: "Error interno",
      });
    } else {
      const deletedClient = await this.mysqlLib.delete(
        TABLE_CLIENTS,
        "clientId",
        clientId
      );
      if (deletedClient.affectedRows) {
        res.status(200).json({
          message: "Cliente eliminado",
        });
      } else {
        res.status(500).json({
          message: "Cliente no existente",
        });
      }
    }
  }

  generateHexUUID() {
    const nanoidOne = customAlphabet(HEX_CHARACTER, 8);
    const nanoidTwo = customAlphabet(HEX_CHARACTER, 4);
    const nanoidThree = customAlphabet(HEX_CHARACTER, 12);
    const uuid = `${nanoidOne()}-${nanoidTwo()}-${nanoidTwo()}-${nanoidTwo()}-${nanoidThree()}`;
    return uuid;
  }

  async generateFiscalTax(countryId) {
    const lastTaxReceipt = await this.getLastTaxReceipt(countryId);
    if (
      !lastTaxReceipt[0] ||
      lastTaxReceipt[0] === "" ||
      !lastTaxReceipt[0].length
    ) {
      const newTaxReceipt = await this.generateTaxReceipt(countryId);
      return newTaxReceipt;
    } else {
      return await this.generateNewTaxReceiptFromLast(lastTaxReceipt);
    }
  }

  async generateNewTaxReceiptFromLast(lastTaxReceipt) {
    const charChange = String.fromCharCode(
      lastTaxReceipt.charCodeAt(lastTaxReceipt - 1) + 1
    );
    const newTaxReceiptGenerated = lastTaxReceipt.replace(
      lastTaxReceipt.substring(
        lastTaxReceipt.length - 1,
        lastTaxReceipt.length
      ),
      charChange
    );
    return newTaxReceiptGenerated;
  }

  async getLastTaxReceipt(id) {
    const lastTaxReceipt = await this.mysqlLib.get(
      "taxReceiptNumber",
      TABLE_TAX_RECEIPT,
      "countryId",
      id
    );

    return lastTaxReceipt[lastTaxReceipt.length - 1];
  }

  async generateTaxReceipt(id) {
    let response = "";
    const countryConfig = await this.mysqlLib.get(
      "cf0, cf1, cf2, cf3, cf4, cf5",
      TABLE_COUNTRY_CONFIG,
      "id",
      id
    );
    const taxData = this.clean(countryConfig[0]);
    for (const [i, key] of Object.keys(taxData).entries()) {
      if (i === Object.keys(taxData).length - 1) {
        response += `${taxData[key]}`;
      } else {
        response += `${taxData[key]}-`;
      }
    }
    return response;
  }
}

module.exports = UsersService;
