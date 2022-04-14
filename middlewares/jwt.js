const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtVerify = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("Access denied");
    const verify = jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) return res.status(403).send("Invalid Token");
        req.user = user;
        next();
    });
};

module.exports = jwtVerify;
