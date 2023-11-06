const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  UserModel = require('../models/UserModel');

const ChangePassword = async(req,res)=>{

    try {
      const {password,password_confirm} = req.body;
      if(password && password_confirm){
        if(password !== password_confirm){
            res.send({status:"failed",message:"password and confirm password not match"});
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const newhashPassword = await bcrypt.hash(password,salt);
            console.log(req.user._id);
            await UserModel.findByIdAndUpdate(req.user._id,{$set:{
                password:newhashPassword
            }});
            res.send({status:"success",message:"password change successfullty"});
        }
      }
      else{
        res.send({status:"failed",message:"All fields are required"});
      }
    } catch (error) {
        console.log(error);
    }
}
module.exports = ChangePassword;