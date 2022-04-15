const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtVerify = (req, res, next) => {
    let token = req.header("authorization");
    if (!token) return res.status(401).send("Access denied");
    token = token.split(" ")[1];
    const verify = jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) return res.status(403).send("Invalid Token");
        req.user = user;
        next();
    });
};

module.exports = jwtVerify;
