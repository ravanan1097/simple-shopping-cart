const { Sequelize } = require("sequelize");
const seq = require("../configs/dbconfig");

const User = seq.define(
    'user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    }

},
    {
        timestamps: true
    }
);

module.exports = User;