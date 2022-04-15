const { User, Wallet } = require("../models/index");

const creditAmount = async (req, res) => {
    const { balance, transactions } = req.body;
    let date = new Date().toLocaleString();
    try {
        let walletBalance = await Wallet.findOne({
            where: { userId: req.params.userId },
        });

        if (req.user.id != req.params.userId)
            return res.status(401).send("Access denied");

        let updatedBalance = walletBalance.balance + balance;
        if (updatedBalance > 500)
            return res.status(400).json({
                status: "Failure",
                msg: "You cannot hold more than 500$ in your wallet",
            });

        let transaction = {
            Status: "Success",
            Credited: balance,
        };
        walletBalance.transactions[date] = transaction;

        const addBalance = await Wallet.update(
            {
                balance: updatedBalance,
                transactions: walletBalance.transactions,
            },
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
    let date = new Date().toLocaleString();
    try {
        let walletBalance = await Wallet.findOne({
            where: { userId: req.params.userId },
        });
        if (req.user.id != req.params.userId)
            return res.status(401).send("Access denied");

        let updatedBalance = walletBalance.balance - balance;
        if (updatedBalance < 0)
            return res.status(400).json({
                status: "Failure",
                msg: "You dont have enough amount in your wallet to withdraw",
            });

        let transaction = {
            Status: "Success",
            Debited: balance,
        };
        walletBalance.transactions[date] = transaction;

        const subtractBalance = await Wallet.update(
            {
                balance: updatedBalance,
                transactions: walletBalance.transactions,
            },
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
    // Wallet.belongsTo(User);
    if (req.user.id != req.params.userId)
        return res.status(401).send("Access denied");
    try {
        const userBalance = await User.findOne({
            where: { id: req.params.userId },
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

const checkTransactions = async (req, res) => {
    const id = req.params.userId;
    if (req.user.id != id) return res.status(401).send("Access denied");
    let { page } = req.query;
    try {
        const user = await User.findOne({
            where: { id: id },
            include: Wallet,
        });
        let transactions = Object.entries(user.wallet.transactions);

        if (Object.keys(user.wallet.transactions).length <= 10) {
            return res.status(200).json({
                userId: user.id,
                name: user.name,
                trasactions: user.wallet.transactions,
            });
        } else {
            if (page) {
                let limit = 10 * page - 10;
                transactions = transactions.slice(limit, limit + 10);
                trasactions = Object.fromEntries(transactions);
                return res.status(200).json({
                    userId: user.id,
                    name: user.name,
                    trasactions: transactions,
                });
            } else {
                transactions = transactions.slice(0, 10);
                trasactions = Object.fromEntries(transactions);
                return res.status(200).json({
                    userId: user.id,
                    name: user.name,
                    trasactions: transactions,
                });
            }
        }
    } catch (error) {
        res.status(404).send(error);
    }
};

module.exports = { creditAmount, debitAmount, checkTransactions, checkBalance };
