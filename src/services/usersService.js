/* eslint-disable no-unused-vars */
const MysqlLib = require("../lib/mysql");
const { nanoid, customAlphabet } = require("nanoid");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const config = require("../config");
const invoiceMxData = require("../utils/mocks/invoice");
const { createInvoice } = require("../services/files/createInvoiceMx");
const { uploadPdf } = require("../services/storage/profilePicturesUpload");
const numberToLetter = require("../lib/numbersToLetter");

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

    const idCountry =
      country === "COL"
        ? 1
        : country === "MEX"
          ? 2
          : country === "DOM" ? 3 : 0;

    const response = await this.mysqlLib.createSuperAdminUser({
      firstName,
      userId,
      email,
      password: hashedPassword,
      typeEmail,
      country,
      idCountry,
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
        https://sifap.netlify.app/newpassword/${request.token} 
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


  async sendinvoiceToMail(email, invoice) {
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
      subject: "Tienes una nueva factura de sifap",
      text: `Hola,
      Por favor accede al siguiente link para descargar tu factura:
      ${invoice}
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
      await this.mysqlLib.singleUpsert(TABLE_FISCAL_DATA, data);
      let userFiscalId = await this.mysqlLib.get("id", TABLE_FISCAL_DATA, "fiscalId", data.fiscalId);
      userFiscalId = {fiscalId: userFiscalId[0].id };
      await this.mysqlLib.update(TABLE_USER, userFiscalId, "userId", id);
    }

    const idCountry =
      user.country === "COL"
        ? 1
        : user.country === "MEX"
          ? 2
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

  async generateInvoceMx(invoiceData, userLoginData) {
    let userData = await this.mysqlLib.get("userId, idCountry, fiscalId", TABLE_USER, "userId", userLoginData.userId);
    userData = userData[0];

    if (!userData.fiscalId || !userData.idCountry){
      return false;
    }

    let {
      client,
      products,
      currency,
      cfdiUse,
      paymentMethod,
      ivaPorcent,
    } = invoiceData;
    ivaPorcent = Number(ivaPorcent);

    await this.upsertOrUpdateClient(client.fiscalId, client, userData.userId);
    await this.insertProducts(products);
    const clientId = await this.mysqlLib.get("clientId", TABLE_CLIENTS, "fiscalId", client.fiscalId);
    const amount = this.calcTotalAmount(products);
    const tax = +this.calcTax(amount, ivaPorcent).toFixed(2);
    const fiscalUUID = this.generateHexUUID();
    const fiscalTax = await this.generateFiscalTax(userData.idCountry);
    const totalWithLetter= numberToLetter(amount + tax);
    const emitterData = await this.mysqlLib.get("companyName, fiscalId", TABLE_FISCAL_DATA, "id", userData.fiscalId);
    const now = new Date().toLocaleString("en-US", {timeZone: "America/Mexico_City"});
    const satCertNumber = customAlphabet("000001234567589", 20);
    const digitalSingCfdi = "ZCDwrNgcG0bCgvVi8HN5pmPfIk/iyRCKnkwIKLox9uHOf14unlPuKv7OHU6uVpGDI+W0cGfkvAdxh8sBY6b7NmBwfvLq7CbYT088c6phJLm7zuiYJB+ngJ5o0v0Fs8QgBFIxn5quLf4739z3Zbe0J/4v2bAJg2oNp1qECq8w4e1dcIw14SxTGCtJDOfj9QPQOoOFdt6EpjG2544eKn4P1ljx9OGg0kt6w/CDDofvXGr93Zow3mg3yolW8FhlQny8xdX1YaQFDwrKmKEw6UGP6Nempt+mtRVJWQzvGZGD9iTaM6CdCfxfTpnmtCpZCF60KSy1nnYu+VUfGnaNGZMd2Q==";
    const satDigitalSign = "hNl+BdleVrXeAMgtTeKADtcqjaSylq3FUjYUmDDhEnYVDEsBfEO/ZNkP0f7NtEA7o5lY9AIS5OXJU8HaojhKri63djPzoxHGBXDjYzvTIlUgpx0ZI3JhDz+qjbWLaTIOddQZ80ElCTyEToofbB4LPg845X/LMNIN3d2h8amVdxotF0/ZWIGF3x0JeEssest6VvJ5HNSQYD8bxR3/CXQKK2670husLzBXKAYY2Twucd22V4FCIRNaUAq80/+LtQRlvC1Zzv+3o5SPm2GevLVMN67iawr6nk3tRJyoN/pfjtmNLyqyk6bpBvIy+JwMO+upTc3z1DD9OP+PSsWwQbtLOQ==";
    const originalChain= `||1.1|${fiscalUUID}|${now}|SVT110323827|ZCDwrNgcG0bCgvVi8HN5pmPfIk/iyRCKnkwIKLox9uHOf14unlPuKv7OHU6uVpGDI+W0cGfkvAdxh8sBY6b7NmBwfvLq7CbYT088c6phJLm7zuiYJB+ngJ5o0v0Fs8QgBFIxn5quLf4739z3Zbe0J/4v2bAJg2oNp1qECq8w4e1dcIw14SxTGCtJDOfj9QPQOoOFdt6EpjG2544eKn4P1ljx9OGg0kt6w/CDDofvXGr93Zow3mg3yolW8FhlQny8xdX1YaQFDwrKmKEw6UGP6Nempt+mtRVJWQzvGZGD9iTaM6CdCfxfTpnmtCpZCF60KSy1nnYu+VUfGnaNGZMd2Q==|00001000000413073350||`;
    for (let product in products){
      delete products[product].description;
      products[product].quantity = Number(products[product].quantity);
      products[product].price = Number(products[product].price);
    }
  
    const invoiceInputData = {
      emitter: {
        name: emitterData[0].companyName,
        address: "",
        fiscalId: emitterData[0].fiscalId,
      },
      client: {
        name:client.fullName,
        address: client.fiscalAddress,
        fiscalId: client.fiscalId
      },
      currency,
      wayToPay: paymentMethod || "01",
      folio: fiscalTax,
      logoUrl: "https://i.imgur.com/FjzAcjI.png",
      subtotal: amount,
      taxes: tax,
      total: (amount + tax),
      totalWithLetter,
      fiscalFolio: fiscalUUID,
      products,
      cfdiUse,
      paymentMethod: "Pago en una sola exhibición",
      createdAt: now.toLocaleString(),
      satCertNumber: satCertNumber(),
      serialNumberCertEmiter: satCertNumber(),
      dateOfCertification: now.toLocaleString(),
      expeditionPlace: "24118",
      digitalSingCfdi,
      satDigitalSign,
      originalChain,
      certProvider: "SVT110323827",
    };
 
    const pdfInvoice = await createInvoice(invoiceInputData);
    const uploadedInvoice = await uploadPdf(pdfInvoice);
    
    const invoiceSavedData = {
      taxReceiptId: nanoid(8),
      clientId: clientId[0].clientId,
      subtotal: amount,
      taxes: tax,
      currency: currency || "MXN",
      methodPayment: paymentMethod || "01",
      total: (amount + tax),
      emmiterId: userData.userId,
      countryId: userData.idCountry,
      taxReceiptNumber: fiscalTax,
      url: uploadedInvoice,
    };
    await this.mysqlLib.singleUpsert( TABLE_TAX_RECEIPT, invoiceSavedData);
    await this.sendinvoiceToMail(client.email, uploadedInvoice);
    return uploadedInvoice;
  }

  // Future feature
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

  // Future feature
  async generateInvoceRd(invoiceData, userData) {
    console(invoiceData, userData);
  }

  async insertProducts(products) {
    const arrayProducts = [];
    for (let product in products) {
      const { quantity, total, ...filteredProduct } = products[product];
      arrayProducts.push(Object.values(filteredProduct));
    }
    await this.mysqlLib.upsert(TABLE_PRODUCTS, "description, id, price, name, unit", arrayProducts);
  }

  calcTax(amount, taxValue) {
    return amount * (taxValue/100);
  }

  calcTotalAmount(products) {   
    const reducer = (product) => product.quantity * product.price;
    const total = products.map(reducer);
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
    const clientData = await this.mysqlLib.get(
      "*",
      TABLE_CLIENTS,
      "clientId",
      clientId
    );
    return clientData;
  }

  async getClientByFiscalID(fiscalId) {
    const clientData = await this.mysqlLib.get(
      "*",
      TABLE_CLIENTS,
      "fiscalId",
      fiscalId
    );
    return clientData;
  }

  async upsertClients(userId, clientData) {
    clientData.clientId = nanoid(4);
    clientData.userId = userId;
    const upsertedClient = await this.mysqlLib.singleUpsert(
      TABLE_CLIENTS,
      clientData
    );
    return upsertedClient;
  }

  async updateClient(clientId, clientData, res) {
    const upsertedClient = await this.mysqlLib.update(
      TABLE_CLIENTS,
      clientData,
      "clientId",
      clientId
    );
    return upsertedClient;
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

  async upsertOrUpdateClient(clientId, clientData, userId) {
    const client = await this.getClientByFiscalID(clientId);
    if (client.length) {
      await this.updateClient(client[0].clientId, clientData );
    } else {
      await this.upsertClients(userId, clientData);
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
    if (!lastTaxReceipt) {
      const newTaxReceipt = await this.generateTaxReceipt(countryId);
      return newTaxReceipt;
    } else {
      return await this.generateNewTaxReceiptFromLast(lastTaxReceipt.taxReceiptNumber);
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

  async getInvoiceHistory(userId){
    const invoiceHistory = await this.mysqlLib.getInvoiceHistory(userId);
    return invoiceHistory;
  }
}

module.exports = UsersService;
