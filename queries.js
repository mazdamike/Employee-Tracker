var index = require("./index.js");
var cTable = require("console.table");

// View employees function
var viewEmployees = function () {
    index.connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        index.start();
    });
}

// View departments function
var viewDepartments = function () {
    index.connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        index.start();
    });
}

// View roles function
var viewRoles = function () {
    index.connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        index.start();
    });
}


// Add employees function
var addEmployees = function () {
    




}


// Add departments function
var addDepartments = function () {
    
}


// Add roles function
var addRoles = function () {
    
}


// Update roles function
var updateRoles = function () {
    
}


module.exports = {
    viewEmployees: viewEmployees,
    viewDepartments: viewDepartments,
    viewRoles: viewRoles,
    addEmployees: addEmployees,
    addDepartments: addDepartments,
    addRoles: addRoles,
    updateRoles: updateRoles
};