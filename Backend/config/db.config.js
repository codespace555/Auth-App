const mongoose = require("mongoose")
const Mongo_url =process.env.Mongo_url
const dbconnect = () => {
mongoose.connect(Mongo_url)
.then((conn) => console.log(`connect to ${conn.connection.host} `))
.catch((e) => console.log(e.messsge) )
}

module.exports = dbconnect
