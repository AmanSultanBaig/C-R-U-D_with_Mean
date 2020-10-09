const mongoose = require('mongoose');
require('dotenv').config()
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(success => console.log("Connection Established"))
    .catch(failure => console.log("Error occured while connceting mongoDB " + failure))

module.exports = mongoose;