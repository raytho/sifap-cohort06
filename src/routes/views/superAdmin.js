const express = require("express");
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

    const userService = new usersService();
    try {
      if (inviteUser.role === "administrador") {
        inviteUser.role = 2;
      } else {
        inviteUser.role = 3;
      }
      const userInvited = await userService.addUserInvited(inviteUser);

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

  router.get("/getInvitedUsers", async (req, res) => {
    const userService = new usersService();
    try {
      const getUsers = await userService.getAllInvitedUsers();
      if (getUsers) {
        res.status(200).send(getUsers);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error to get users" });
    }
  });

  router.get("/users-invitation/:id", async (req, res) => {
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
