/* eslint-disable no-unused-vars */
// Modules
const express = require("express");
const helmet = require("helmet");
const config = require("./config");
const notFoundHandler = require("./utils/middleware/notFoundHandler");
const authApiRouter = require("./routes/api/auth");
const rolesApiRouter = require("./routes/api/roles");
const home = require("./routes/views/home");
const userViewRouter = require("./routes/views/user");

// App
const app = express();

// Middlewares
app.use(express.json());
app.use(helmet());

// Routes
app.use("/", home);
authApiRouter(app);
userViewRouter(app);
rolesApiRouter(app);

// 404 handler
app.use(notFoundHandler);

// Init Server
const server = app.listen(config.port, () => {
  console.log(`Server running on port: ${config.port}`);
});
