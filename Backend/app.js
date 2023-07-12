
const express = require("express")
const authrRouter = require("./router/auth.rout.js")
const dbconnect = require("./config/db.config.js")
const app = express()
dbconnect()
app.use(express.json())


app.use("/api/auth", authrRouter)

app.use("/", (req, res) => {
    res.status(200).json({
        data: "JWTAuth Server"
    })
})



module.exports = app