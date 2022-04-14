const sequelize = require("./db/db");

const dbAuthenticate = () => {
    sequelize
        .authenticate()
        .then(() => console.log("Connected to database"))
        .catch((error) => console.log(error));
    sequelize
        .sync({ force: false })
        .then(() => console.log("sync completed"))
        .catch((err) => console.log(err));
};

module.exports = dbAuthenticate;
