const usermodel=require("../models/users");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
require("dotenv").config();
const { token_key } = process.env


/**
 * @description For new user registration (Admin and Customer)
 * @param {*} req 
 * @param {*} res 
 * 
 */
exports.register=async (req,res)=>{
    try {
        let{name,userName,password,email,mobile,role}=req.body;
        
        let existingUser=await usermodel.findOne({where:{userName}});
        
        if(existingUser) return res.status(200).json({message:"User already exists"});
        
        const encPass = await bcrypt.hash(password, 8);

        await usermodel.create({
            name:name,
            userName:userName,
            password:encPass,
            email:email,
            mobile:mobile,
            role:role
        });
        return res.json({status:"Success",message:"User Created Successfully"}).status(201);

    } catch (error) {
        console.error(error);
        return res.status(500).json({status:"Failed",message:error.message})
    }
};

/**
 * @description Update user details
 * @param {*} req 
 * @param {*} res 
 * 
 */
exports.updateUser = async (req, res) => {
    try {
        const {name,userName,email,mobile,role} = req.body;
       
        let [updatedUser] = await usermodel.update({ name,email,mobile,role }, { where: { userName } });

        if (![updatedUser] == 0) {
            console.log("User  updated");
            return res.json({status:"Success",message:"User  updated"}).status(200);
        }
        else {
            return res.json({status:"Failed",message:"User not updated"}).status(200);
        }
    } catch (err) {
        console.err(err);
        res.json({message:err.message}).status(500);
    }

};

/**
 * @description Delete user with username
 * @param {*} req 
 * @param {*} res 
 * 
 */
exports.deleteUser=async(req,res)=>{
    try{
      let {userName}=req.body;
      let delUser=await usermodel.destroy({where:{userName}});
      
      if (!delUser==0) {
        console.log("User  deleted");
        return res.json({status:"Success",message:"User  deleted"}).status(200);
    }
    else {
        return res.json({status:"Failed",message:"User not  deleted"}).status(200);
    }
    }
    catch(err){
        console.error(err);
        res.json({message:err.message}).status(500);
    }
};

/**
 * @description Login for existing user 
 * @param {*} req 
 * @param {*} res 
 * @returns Jwt Token
 */
exports.login=async(req,res)=>{
    try {
        let {userName,password}=req.body;

        let currentUser=await usermodel.findOne({where:{userName}});
        if(!currentUser) return res.json(200).json({status:"No User",message:"User Not Found"});

        const checkPass = await bcrypt.compare(password, currentUser.password);

        if(currentUser && checkPass){
            const jwtToken=jwt.sign({userName:currentUser.userName,email:currentUser.email,role:currentUser.role},token_key,{expiresIn:"1h"});

            return res.status(200).json({status:"Success",accessToken:jwtToken});
        }

    } catch (error) {
        console.error(err);
        res.json({ststus:"Failed",message:err.message}).status(500);
    }
}