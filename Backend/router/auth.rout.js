// import module.................................

const express = require("express");
const { singup, signin, getUser ,logout} = require("../controller/authcontroller");
const jwtAuth = require("../middleware/jwtAuth.js");
// ..Routs.............................................
const authrRouter = express.Router();
authrRouter.post("/singup", singup);
authrRouter.post("/signin", signin);
authrRouter.get("/user", jwtAuth, getUser);
authrRouter.get("/logout", jwtAuth, logout);
// .................. export it to use wherever needed

module.exports = authrRouter;
