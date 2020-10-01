const express = require("express");
const ApiKeysService = require("../../services/apiKeys");
const usersService = require("../../services/usersService");

const inviteNewUser = (app) => {
  const router = express.Router();
  app.use("/api/superAdmin", router);

  router.post("/invite-user", async (req, res) => {
    console.log(req.body);
    // Acá irian los 3 datos de nombre, email y rol
    const email = req.body.email;
    const firstName = req.body.firstName;
    const role = req.body.role;

    const inviteUser = {
      email: email,
      firstName: firstName,
      role: role,
    };

    const apiKeyService = new ApiKeysService();
    try {
      if (inviteUser.role === "administrador") {
        inviteUser.role = 2;
      } else {
        inviteUser.role = 3;
      }
      const userInvited = await apiKeyService.addUserInvited(inviteUser);

      if (userInvited) {
        res.status(200).json({
          message: "User created",
        });
      } else {
        res.status(500).json({ message: "Error creating user" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating user" });
    }
  });

  router.get("/getAllUsers", async (req, res) => {
    const apiKeyService = new ApiKeysService();
    try {
      const getUsers = await apiKeyService.getSuperAdminUsers();
      if (getUsers) {
        res.status(200).send(getUsers);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error to get users" });
    }
  });

  router.get("/user/:id", async (req, res) => {
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

  router.put("/user/:id", async (req, res) => {
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

  router.delete("/user/:id", async (req, res) => {
    const id = req.params.id;
    const userService = new usersService();
    try {
      const user = await userService.deleteUserById(id);
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
};

module.exports = inviteNewUser;
