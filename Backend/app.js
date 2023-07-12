const express = require("express")
const authrRouter = require("./router/auth.rout.js")
const app = express()
app.use(express.json())

app.use("/api/auth" ,authrRouter)

app.use("/", (req,res) => {
    res.status(200).json({
        data:"JWTAuth Server"
    })
})



module.exports = app