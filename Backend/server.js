const PORT = 8001
require("dotenv").config();

const app = require("./app.js")
app.listen(PORT, async () => {
    console.log(`server start http://localhost:${PORT}`)
})
