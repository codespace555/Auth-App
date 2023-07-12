const PORT = process.env.PORT || 3000
require("dotenv").config();

const app = require("./app.js")
app.listen(PORT, () => {
    console.log(`server start http://localhost:${PORT}`)
})
