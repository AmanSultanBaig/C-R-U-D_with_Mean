const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(success => console.log("Connection Established"))
    .catch(failure => console.log("Error occured while connceting mongoDB " + failure))

module.exports = mongoose;