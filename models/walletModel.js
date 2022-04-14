const Sequelize = require("sequelize");
const sequelize = require("../db/db");

const Wallet = sequelize.define("wallets", {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        default: 0,
    },
    transactions: {
        type: Sequelize.JSON,
    },
});

module.exports = Wallet;
