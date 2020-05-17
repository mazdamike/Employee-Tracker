

// View employees function
var viewEmployees = function() {
    console.log("viewing employees");
    startEmployeeTracker(); // does not work, pick up here
}


// View departments function
var viewDepartments = function() {
    console.log("viewing departments");
}


// View roles function
var viewRoles = function() {
    console.log("viewing roles");
}


// Add employees function
var addEmployees = function() {
    console.log("adding employees");
}


// Add departments function
var addDepartments = function() {
    console.log("adding departments");
}


// Add roles function
var addRoles = function() {
    console.log("adding roles");
}


// Update roles function
var updateRoles = function() {
    console.log("adding employees");
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