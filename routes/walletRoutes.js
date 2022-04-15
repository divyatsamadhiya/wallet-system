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
router.get("/transactions/:userId", checkTransactions);
router.get("/balance/:userId", checkBalance);

module.exports = router;
