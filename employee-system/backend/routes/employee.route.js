const express = require('express');
const app = express();
const employeeRoute = express.Router();

// employee model
let Employee = require('../models/Employee');

// add Employee
employeeRoute.route('/create').post((req, res, next) => {
    Employee.create(req.body, (error, data) => {
        if(error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
});

// get all Employees
employeeRoute.route('/').get((req, res) => {
    Employee.find((error, data) => {
        if(error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
});

// get single Employee
employeeRoute.route('/read/:id').get((req, res) => {
    Employee.findById(req.params.id, (error, data) => {
        if(error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
});

// update Employee
employeeRoute.route('/update/:id').put((req, res, next) => {
    Employee.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if(error) {
            console.log(error);
            return next(error);
        }
        else {
            res.json(data);
            console.log('Data updated successfully');
        }
    })
});

// delete Employee
employeeRoute.route('/delete/:id').delete((req, res, next) => {
    Employee.findOneAndRemove(req.params.id, (error, data) => {
        if(error) {
            return next(error)
        }
        else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = employeeRoute;