const { Sequelize } = require('Sequelize')

const sequelize = new Sequelize("databaseno", "", "", {
    dialect: "sqlite",
    storage: "./database/database.sqlite"
});

sequelize.authenticate().then(() => {
    console.log("Usuario autenticado");
});

module.exports = sequelize;