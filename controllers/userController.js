const { User, Wallet } = require("../models/index");

const { userValidate, loginValidate } = require("../validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const { error } = userValidate.validate(req.body);
    if (error) return res.status(400).send(error.details[0]);

    const userExist = await User.findOne({ where: { email: email } });
    if (userExist != null)
        return res.status(400).json({
            status: "Failed",
            msg: "User already registered, Please try login",
        });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
        const user = await User.create({ name, email, password: hashPassword });
        const wallet = await Wallet.create({ balance: 0, userId: user.id });
        res.status(201).json({ id: user.id, name, email });
    } catch (error) {
        res.status(400).send(error);
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const { error } = loginValidate.validate(req.body);
    if (error) return res.status(400).send(error.details[0]);

    const user = await User.findOne({ where: { email } });
    if (user === null)
        return res.status(400).json({
            status: "Failed",
            msg: "Email does not exist, Please register yourself first",
        });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
        return res.status(400).json({ msg: "Incorrect password" });

    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "300s",
    });
    res.header("auth-token", jwtToken);
    res.status(201).json({
        status: "Success",
        msg: "Logged In",
        token: jwtToken,
    });
};

module.exports = { registerUser, loginUser };
