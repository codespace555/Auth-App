
const express = require("express")
const { singup } = require("../controller/authcontroller")
const authrRouter = express.Router()
authrRouter.post("/singup", singup)
authrRouter.post("/singin", singin)

module.exports = authrRouter