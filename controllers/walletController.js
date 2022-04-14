// const Wallet = require("../models/walletModel");
// const User = require("../models/userModel");
const { User, Wallet } = require("../models/index");

const creditAmount = async (req, res) => {
    const { balance } = req.body;
    try {
        let walletBalance = await Wallet.findOne({
            where: { userId: req.params.userId },
        });
        let updatedBalance = walletBalance.balance + balance;
        if (updatedBalance > 500)
            return res.status(400).json({
                status: "Failure",
                msg: "You cannot hold more than 500$ in your wallet",
            });

        const addBalance = await Wallet.update(
            { balance: updatedBalance },
            { where: { userId: req.params.userId } }
        );
        return res.status(200).json({
            status: "Success",
            msg: `Transaction Successful. ${balance}$ credited to the wallet`,
            "Updated wallet balance": updatedBalance,
        });
    } catch (error) {
        return res.status(400).send(error);
    }
};

const debitAmount = async (req, res) => {
    const { balance } = req.body;
    try {
        let walletBalance = await Wallet.findOne({
            where: { userId: req.params.userId },
        });
        let updatedBalance = walletBalance.balance - balance;
        if (updatedBalance < 0)
            return res.status(400).json({
                status: "Failure",
                msg: "You dont have enough amount in your wallet to withdraw",
            });

        const subtractBalance = await Wallet.update(
            { balance: updatedBalance },
            { where: { userId: req.params.userId } }
        );
        return res.status(200).json({
            status: "Success",
            msg: `Transaction Successful. ${balance}$ debited from the wallet`,
            "Updated wallet balance": updatedBalance,
        });
    } catch (error) {
        return res.status(404).send(error);
    }
};

const checkBalance = async (req, res) => {
    Wallet.belongsTo(User);
    try {
        const userBalance = await User.findOne({
            where: { id: req.params.id },
            include: Wallet,
        });
        return res.status(200).json({
            userId: userBalance.id,
            name: userBalance.name,
            walletBalance: userBalance.wallet.balance,
        });
    } catch (error) {
        return res.status(404).json(error);
    }
};

const checkTransactions = async (req, res) => {};

module.exports = { creditAmount, debitAmount, checkTransactions, checkBalance };
