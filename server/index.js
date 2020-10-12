const express = require('express');
const app = express();
const cors = require('cors')
require('./config/db.config')

app.use(cors())
app.use(express.json())
app.use('/', require('./routes/routes'))


// error handling middleware
app.use((req, res, next) => {
    const error = new Error("Request failed");
    error.status = 404;
    next(error)
})

// error handling middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message
    })
})

let portNo = 3000 || process.env.PORT;
app.listen(portNo, __ => console.log(`App is Running on Port ${portNo}`))
