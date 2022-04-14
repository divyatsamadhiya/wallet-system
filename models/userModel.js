const Sequelize = require("sequelize");
const sequelize = require("../db/db");

const User = sequelize.define("users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});
module.exports = User;
