var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employee_trackerdb"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  console.log("****************" + "\n" + "Employee Tracker" + "\n" + "****************");
  // run the startEmployeeTracker function after the connection is made to prompt the user
  startEmployeeTracker();
});

// start Employee Tracker function
function startEmployeeTracker() {
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View employees",
        "View departments",
        "View roles",
        "Add employees",
        "Add departments",
        "Add roles",
        "Update employee roles",
        "Exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View employees":
        viewEmployees();
        break;

      case "View departments":
        viewDepartments();
        break;

      case "View roles":
        viewRoles();
        break;

      case "Add employees":
        addEmployees();
        break;

      case "Add departments":
        addDepartments();
        break;

      case "Add roles":
        addRoles();
        break;

      case "Update employee roles":
          updateRoles();
          break;

      case "Exit":
        connection.end();
        break;
      }
    });
}