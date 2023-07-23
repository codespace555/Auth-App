// import module.................................

const express = require("express");
const authrRouter = require("./router/auth.rout.js");
require("dotenv").config();
const dbconnect = require("./config/db.config.js");
const cookieParser = require("cookie-parser");
const cros = require("cors")

const app = express();
dbconnect();
app.use(express.json());
app.use(cookieParser());
app.use(cros({
    origin: [process.env.CLIENT_URL],
    credentials: true // for cookies cross domain access
}))
// console.log(CLIENT_URL,PORT)

app.use("/api/auth", authrRouter);

app.use("/", (req, res) => {
  res.status(200).send({
    data: "JWTAuth Server",
  });
});

// .................. export it to use wherever needed

module.exports = app;
