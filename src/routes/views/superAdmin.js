const express = require("express");
// eslint-disable-next-line no-unused-vars
const passport = require("passport");
const usersService = require("../../services/usersService");
const validationHandler = require("../../utils/middleware/validationHandler");

const { createUserSchema } = require("../../utils/schemas/users");
const { inviteUserSchema } = require("../../utils/schemas/usersInvitation");

const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;
const {
  uploadStadistics,
} = require("../../services/storage/profilePicturesUpload");

const csvStringifier = createCsvStringifier({
  header: [
    { id: "userId", title: "userId" },
    { id: "email", title: "email" },
    { id: "password", title: "password" },
    { id: "phoneNumber", title: "phoneNumber" },
    { id: "firstName", title: "firstName" },
    { id: "lastName", title: "lastName" },
    { id: "dateOfBirth", title: "dateOfBirth" },
    { id: "city", title: "city" },
    { id: "state", title: "state" },
    { id: "country", title: "country" },
    { id: "taxReceiptLimit", title: "taxReceiptLimit" },
    { id: "fiscalId", title: "fiscalId" },
    { id: "createdAt", title: "createdAt" },
    { id: "role", title: "role" },
    { id: "fiscalAct", title: "fiscalAct" },
    { id: "createdBy", title: "createdBy" },
    { id: "active", title: "active" },
    { id: "twoFactorActive", title: "twoFactorActive" },
    { id: "typeEmail", title: "typeEmail" },
    { id: "idCountry", title: "idCountry" },
    { id: "profile_picture_url", title: "profile_picture_url" },
  ],
});

require("../../utils/auth/strategies/jwt");

const inviteNewUser = (app) => {
  const router = express.Router();
  app.use("/api/superAdmin", router);

  // Invitations
  router.post("/invite-user", async (req, res, next) => {
    passport.authenticate(
      "jwt",
      { session: false },
      async (error, userToken) => {
        validationHandler(inviteUserSchema);

        const { email } = userToken;
        const { body: user } = req;
        const role = user.role;

        const userService = new usersService();
        if (userToken.role === "empleado") {
          res.status(500).json({ message: "Error creating user as employ" });
        } else {
          try {
            if (role.toLowerCase() === "administrador") {
              user.role = 2;
            } else {
              user.role = 3;
            }
            const userInvited = await userService.addUserInvited(
              { user },
              email
            );
            const sendInvite = await userService.sendUserInvitation(req, user);
            console.log(sendInvite);
            if (userInvited) {
              res.status(200).json({
                message: "Invitation sent",
              });
            } else {
              res.status(500).json({ message: "Error creating user" });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error creating user" });
          }
        }
      }
    )(req, res, next);
  });

  router.get("/getInvitedUsers", async (req, res, next) => {
    passport.authenticate(
      "jwt",
      { session: false },
      async (error, userToken) => {
        const userService = new usersService();
        try {
          const getUser = await userService.getActiveInvitesUsersByCreatedUser(
            userToken
          );
          if (getUser) {
            res.status(200).send(getUser);
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Error to get user" });
        }
      }
    )(req, res, next);
  });

  router.get("/getInvitedUsersFilter", async (req, res, next) => {
    passport.authenticate(
      "jwt",
      { session: false },
      async (error, userToken) => {
        const userService = new usersService();
        try {
          const getUser = await userService.getInvitedUserByCreatedMail(
            userToken
          );
          if (getUser) {
            res.status(200).send(getUser);
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Error to get user" });
        }
      }
    )(req, res, next);
  });

  router.get("/users-invitation/:id", async (req, res) => {
    const id = req.params.id;
    const userService = new usersService();
    try {
      const user = await userService.getInvitedUserById(id);
      if (user) {
        res.status(200).send(user);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error to get users" });
    }
  });

  // Pendiente
  router.put("/users-invitation/:id", async (req, res) => {
    const id = req.params.id;
    const userService = new usersService();
    try {
      const user = await userService.getUserById(id);
      if (user) {
        res.status(200).send(user);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error to get users" });
    }
  });

  router.delete("/users-invitation/:id", async (req, res) => {
    const id = req.params.id;
    const userService = new usersService();
    try {
      const user = await userService.deleteInvitedUserById(id);
      if (user) {
        res.status(201).json({
          user: id,
          message: "User deleted",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error on delete user" });
    }
  });

  // Users

  router.post(
    "/create-user",
    validationHandler(createUserSchema),
    async (req, res, next) => {
      const { body: user } = req;
      try {
        const userService = new usersService();
        const userCreated = await userService.addUser({ user });
        res.status(201).json({
          data: userCreated,
          message: "User created",
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get("/get-users", async (req, res) => {
    const userService = new usersService();
    try {
      const getUsers = await userService.getAllUsers();
      if (getUsers) {
        const csvFile = csvStringifier.stringifyRecords(getUsers);
        const responseaws = await uploadStadistics(csvFile, "users");
        res.status(200).json({
          data: responseaws,
          error: null,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Not found" });
    }
  });

  router.get("/get-user/:id", async (req, res) => {
    const id = req.params.id;
    const userService = new usersService();
    try {
      const getUser = await userService.getUserById(id);
      if (getUser) {
        res.status(200).send(getUser);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error to get user" });
    }
  });

  router.delete("/user/:id", async (req, res) => {
    const id = req.params.id;
    const userService = new usersService();
    try {
      const deletedUser = await userService.deleteUserById(id);
      if (deletedUser) {
        res.status(200).send({
          data: deletedUser,
          message: "User deleted",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error to get user" });
    }
  });

  //Pendiente
  // eslint-disable-next-line no-unused-vars
  router.put("/userEditRol/:id", async (req, res, next) => {
    passport.authenticate(
      "jwt",
      { session: false },
      async (error, userToken) => {
        const id = req.params.id;
        const data = req.body;
        const userService = new usersService();
        try {
          cosnole.log("Request data => ", data);
          if (data.role) {
            const updatedUser = await userService.updateRolByUserId(id, data);
            if (updatedUser) {
              res.status(200).send({
                data: updatedUser,
                message: "User updated",
              });
            } else {
              res.status(500).json({ message: "Error to get user" });
            }
          } else {
            res.status(500).json({ message: "Rol is required" });
          }
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: "Error to get user" });
        }
      }
    )(req, res, next);
  });
};

module.exports = inviteNewUser;
