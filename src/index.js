const { request, response } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

let roles = [];

app.use(cors());

//Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/roles/add", (request, response) => {
  const role = request.body;

  console.log(role);
  roles.push(role);
  debugger;
  response.send(`Rol is added to the database`);
});

app.get("/api/roles/get", (request, response) => {
  debugger;
  if (roles.length === 0) {
    response.status(404).send(`Not found roles`);
  } else {
    response.json(roles);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
