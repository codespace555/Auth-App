// import module.................................

const mongoose = require("mongoose");
require("dotenv").config()
const Mongo_url = process.env.Mongo_url;
// here connect to database.......................
const dbconnect = () => {
  mongoose
    .connect(Mongo_url) //mongoDB Url
    .then((conn) => console.log(`connect to ${conn.connection.host} `))
    .catch((e) => console.log(e.messsge));
};

// .................. export it to use wherever needed

module.exports = dbconnect;
