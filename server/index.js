const express = require('express');
const app = express();
require('./config/db.config')
let portNo = 5000 || process.env.PORT;

app.listen(portNo, __ => console.log("App is Running!"))
