const { Sequelize } = require("sequelize");
const seq = require("../configs/dbconfig");
const User=require("./users");

const Cart=seq.define('cart',{
    product:{
        type:Sequelize.STRING,
        allowNull:false
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    totalPrice:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
},
{
    timestamps:true
});

User.hasMany(Cart);
Cart.belongsTo(User)

module.exports=Cart;