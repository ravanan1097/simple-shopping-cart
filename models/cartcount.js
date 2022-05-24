const { Sequelize } = require("sequelize");
const seq = require("../configs/dbconfig");
const User=require("./users");

const CartCount=seq.define(
    'cart_count',{
        count:{
            type:Sequelize.INTEGER,
            allowNull:true
        }
    }
);

User.hasOne(CartCount);
CartCount.belongsTo(User);

module.exports=CartCount;