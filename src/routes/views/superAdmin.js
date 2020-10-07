const express = require("express");
// eslint-disable-next-line no-unused-vars
const { passport } = require("passport");
const usersService = require("../../services/usersService");
const validationHandler = require("../../utils/middleware/validationHandler");

const { createUserSchema } = require("../../utils/schemas/users");
const { inviteUserSchema } = require("../../utils/schemas/usersInvitation");

const inviteNewUser = (app) => {
  const router = express.Router();
  app.use("/api/superAdmin", router);

  // Invitations
  router.post(
    "/invite-user",
    validationHandler(inviteUserSchema),
    async (req, res) => {
      const { body: user } = req;
      const role = user.role;
      const userService = new usersService();
      try {
        if (role === "administrador") {
          user.role = 2;
        } else {
          user.role = 3;
        }
        const userInvited = await userService.addUserInvited({ user });

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
  );

  router.get("/getInvitedUsers", async (req, res) => {
    const userService = new usersService();
    try {
      const getUser = await userService.getAllInvitedUsers();
      if (getUser) {
        res.status(200).send(getUser);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error to get user" });
    }
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
        res.status(200).send(getUsers);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error to get users" });
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

  router.put("/user/:id", async (req, res) => {
    const id = req.params.id;
    const userService = new usersService();
    try {
      const updatedUser = await userService.updateUserById(id);
      if (updatedUser) {
        res.status(200).send({
          data: updatedUser,
          message: "User updated",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error to get user" });
    }
  });
};

module.exports = inviteNewUser;
