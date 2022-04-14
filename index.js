const express = require("express");
const app = express();
require("dotenv").config();
const dbAuthenticate = require("./dbAuthenticate");
const router = require("./routes/userRoutes");
const jwtVerify = require("./middlewares/jwt");

//middlewares
app.use(express.json());
app.use("/api/v1", router);

const server = async () => {
    try {
        dbAuthenticate();
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is listening on port ${process.env.PORT}....`);
        });
    } catch (error) {
        console.log(error);
    }
};
server();
