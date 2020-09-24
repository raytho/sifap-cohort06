const express = require("express");
const ApiKeysService = require("../../services/apiKeys");
const roleService = require("../../services/roleService");
const RoleService = require("../../services/roleService");

function rolesApi(app) {
  const router = express.Router();
  app.use("/api/roles", router);

  const apiKeyService = new ApiKeysService();

  router.post("/role", async (req, res) => {
    try {
      const role = req.body;
      const roleService = new RoleService(role);
      await roleService.createRole(roleService);
      return res
        .status(200)
        .json({ message: `Role ${roleService.rolId} inserted` });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  });

  router.get("/getAllRoles", async (req, res) => {
    try {
      const roles = await apiKeyService.getAllRoles();
      return res.send(roles);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  });

  router.get("/getRole/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const roles = await apiKeyService.getRoleById({ id });
      return res.send(roles);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  });

  router.put("/role/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const values = req.body.name;
      const roles = await apiKeyService.changeRoleById({ id }, values);
      return res.status(200).send({ message: "Role edited" });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  });

  router.delete("/role/:id", async (req, res) => {
    try {
      return res.status(200).send({ message: "Role deleted" });
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  });
}

module.exports = rolesApi;
