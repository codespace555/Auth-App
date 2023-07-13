
const express = require("express")
const { singup , signin } = require("../controller/authcontroller")
const authrRouter = express.Router()
authrRouter.post("/singup", singup)
authrRouter.post("/signin", signin)

module.exports = authrRouter