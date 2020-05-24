var index = require("./index.js");

const findAllEmployees = () => {
    return  index.connection.query("SELECT * FROM employee");
}

const findAllRoles = () => {
    return index.connection.query("SELECT * FROM role");
}









module.exports = {
    findAllEmployees,
    findAllRoles
}