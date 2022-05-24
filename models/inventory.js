const { Sequelize } = require("sequelize");
const seq = require("../configs/dbconfig");

const Inventory=seq.define('inventory',{

    productName:{
        type:Sequelize.STRING,
        allowNull:false
    },
    productCode:{
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    price:{
        type:Sequelize.DOUBLE
    },
    inStock:{
        type:Sequelize.STRING,
        allowNull:false
    },
    isActive:{
        type:Sequelize.STRING,
        allowNull:false
    }
},
{
    timestamps:true
})

module.exports=Inventory;