
const express = require("express")
const { singup } = require("../controller/authcontroller")
const authrRouter = express.Router()
authrRouter.post("/singup", singup)

module.exports = authrRouter