const {Sequelize} = require("sequelize");
require("dotenv").config();
const env = process.env;

const sequelize = new Sequelize(
    env.DB_NAME,
    env.DB_USER,
    env.DB_PASS,
    {
        dialect: env.DB_DIALECT,
        host: env.DB_HOST
    });

module.exports = sequelize;