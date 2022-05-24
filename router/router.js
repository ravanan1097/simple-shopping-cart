const express=require("express");
const route=express.Router();
const usercontroller=require("../controller/usercontroller");
const inventorycontroller=require("../controller/inventorycontroller");
const cartController=require("../controller/cartcontroller");
const auth=require("../middleware/auth");
const verifyToken=require("../middleware/tokenverify");

//User controller
route.post("/register",usercontroller.register);
route.post("/login",usercontroller.login);
route.post("/updateuser",verifyToken,usercontroller.updateUser);
route.post("/deleteuser",verifyToken,usercontroller.deleteUser);

//Inventory controller
route.post("/createproduct",[verifyToken,auth],inventorycontroller.createProduct);
route.get("/allproducts",[verifyToken,auth],inventorycontroller.findAllProducts);
route.post("/deleteproduct",[verifyToken,auth],inventorycontroller.deleteProduct);
route.post("/updateproduct",[verifyToken,auth],inventorycontroller.updateProduct);

//Inventory details for user
route.get("/getproductsusers",verifyToken,inventorycontroller.getProductsForUsers);

//Cart controller
route.post("/addcart",verifyToken,cartController.addToCart);
route.get("/getcart",verifyToken,cartController.getCart);
route.post("/emptycart",verifyToken,cartController.emptyCart);



module.exports=route;