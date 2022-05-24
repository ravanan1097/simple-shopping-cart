const express = require("express");
const app = express();
const bodyParser = require("body-parser");
require('dotenv').config();
const routes=require("./router/router");
const sequelize = require("./configs/dbconfig");


app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("/",routes);


const port = process.env.PORT;
app.listen(port, () => console.log("Listening on", port));


//Sequelize Function to authenticate and sync
sequelize.authenticate().then(() => console.log("Connected to Database Successfully ")).catch(err => console.log("Database Connection Failed", err.message));
sequelize.sync();