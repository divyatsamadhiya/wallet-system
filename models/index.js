const Wallet = require("../models/walletModel");
const User = require("../models/userModel");

User.hasOne(Wallet, { foreignKey: "userId" });
Wallet.belongsTo(User, { foreignKey: "userId" });

module.exports = { User, Wallet };
