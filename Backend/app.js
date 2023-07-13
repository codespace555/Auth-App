
const express = require("express")
const authrRouter = require("./router/auth.rout.js")
const dbconnect = require("./config/db.config.js")
const cookieParser = require("cookie-parser")
const app = express()
dbconnect()
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authrRouter)

app.use("/", (req, res) => {
    res.status(200).json({
        data: "JWTAuth Server"
    })
})



module.exports = app