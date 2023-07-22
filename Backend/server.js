const PORT = process.env.PORT
require("dotenv").config();

const app = require("./app.js")
app.listen(PORT, () => {
    console.log(`server start http://localhost:${PORT}`)
})
