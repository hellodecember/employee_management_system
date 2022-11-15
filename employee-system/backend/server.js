const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// connect with mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/employeedatabase')
        .then((x) => {
            console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
        })
        .catch((err) => {
            console.error('Error connecting to mongo.', err.reason)
        });

// setting up port with express.js
const employeeRoute = require('../backend/routes/employee.route');
const app = express();

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/employee-system')));
app.use('/', express.static(path.join(__dirname, 'dist/employee-system')));
app.use('/api', employeeRoute);

// create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port);
});

// find 404 and handover to error handler
app.use((req, res, next) => {
    next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
    console.error(err.message); // log error message in server console
    if(!err.statusCode) {
        err.statusCode = 500    // if err has no specified error code, 
    }                           // set error code to 500
    res.status(err.statusCode).send(err.message)    // all requests must have a response,
});                                                 // let's send back status code and message