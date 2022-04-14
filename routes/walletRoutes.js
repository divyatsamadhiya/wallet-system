const router = require("express").Router();
const jwtVerify = require("../middlewares/jwt");
const {
    creditAmount,
    debitAmount,
    checkTransactions,
    checkBalance,
} = require("../controllers/walletController");

router.use(jwtVerify);

router.put("/credit/:userId", creditAmount);
router.put("/debit/:userId", debitAmount);
router.get("/transaction", checkTransactions);
router.get("/balance/:id", checkBalance);

module.exports = router;
