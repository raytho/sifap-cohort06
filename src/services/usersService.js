const MysqlLib = require("../lib/mysql");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const config = require("../config");

class UsersService {
  constructor() {
    this.mysqlLib = new MysqlLib();
  }

  async createSuperAdminUser({ user }, userInvitation) {
    const { firstName, fiscalId, email, password, country, typeEmail } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = userInvitation.role;
    const createdBy = userInvitation.createdBy;
    const userId = nanoid(4);

    const response = await this.mysqlLib.createSuperAdminUser({
      firstName,
      fiscalId,
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

  async updateUserProfile(user, id) {
    const updatedProfile = await this.mysqlLib.updateUserProfile(user, id);
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
    return updatedRol;
  }
}

module.exports = UsersService;
