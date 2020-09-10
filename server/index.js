const express = require('express');
const app = express();
require('./config/db.config')

app.use('/', require('./routes'))

let portNo = 5000 || process.env.PORT;
app.listen(portNo, __ => console.log("App is Running!"))
