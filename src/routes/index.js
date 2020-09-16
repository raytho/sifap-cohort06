const express = require('express');
const { request, response } = require('express');
const router = express.Router();

let roles = [];
const dummy = [];

router.get("/", (request, response) => {
  console.log("Usuario ingresó a Home")
});

router.post("/", (request, response) => {
  const userLoginData = request.body;
  console.log(`Se han recibido los datos de logueo de usurio: ${userLoginData}`);
  const validateLogin = () => {
    // code
  }
});

router.get("/register", (request, response) => {
  console.log("Usuario ingresó a página de registro")
});

router.post("/register", (request, response) => {
  const userRegisterData = request.body;
  console.log(`Se han recibido los datos de registro de usurio: ${userRegisterData}`);
  const validateData = () => {
    // code
  }
});

router.get("/reset-password", (request, response) => {
  //code
});

router.post("/reset-password", (request, response) => {
  //code
});

router.get("/user/:id", (request, response) => {
  //code
});

router.post("/user/:id", (request, response) => {
  //code
});

router.get("/user/:id/profile", (request, response) => {
  //code
});

router.post("/user/:id/profile", (request, response) => {
  //code
});

router.get("/user/:id/stats", (request, response) => {
  //code
});

router.get("/super-admin", (request, response) => {
  //code
});

router.get("/super-admin/stats", (request, response) => {
  //code
});

router.get("/administrator/:id/manage-users", (request, response) => {
  //code
});

router.post("/administrator/:id/manage-users", (request, response) => {
  //code
});

router.get("/administrator/:id/regular-clients", (request, response) => {
  //code
});

router.post("/administrator/:id/regular-clients", (request, response) => {
  //code
});

router.get("/administrator/:id/stats", (request, response) => {
  //code
});

router.get("/help", (request, response) => {
  //code
});

router.post("/api/roles/add", (request, response) => {
  const role = request.body;
  console.log(role);
  roles.push(role);
  response.send(`Rol is added to the database`);
});

router.get("/api/roles/get", (request, response) => {
  if (roles.length === 0) {
    response.status(404).send(`Not found roles`);
  } else {
    response.json(roles);
  }
});

module.exports = router;