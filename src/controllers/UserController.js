const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  UserModel = require('../models/UserModel');

const  UserController = async(req,res)=>{
        const {name,email,password,password_confirm,tc} = req.body;
        const user = await UserModel.findOne({email:email});
        if(user){
            res.send({status:"failed",message:"Email already exists"});
        }
        else{
            if(name&&email&&password&&password_confirm&&tc){
                if(password === password_confirm){
                  try {
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password,salt);
                    
                    const doc  = new UserModel({
                        name:name,
                        email:email,
                        password:hashPassword ,
                        tc:tc
                        
                    })
                    await doc.save();
                    const saved_user = await UserModel.findOne({email:email});
                    //jwt token 
                    const token = jwt.sign({ userID:saved_user._id},'hhhhhhh',{expiresIn:'5d'});

                    res.send({status:"success",message:"Register successfully",token:token});
                  } catch (error) {
                    res.send({status:"failed",message:"Unable to register"});
                  }
                }
                else{
                    res.send({status:"failed",message:"password and confirm password doesnt match"});
                }
            }
            else{
                res.send({status:"failed",message:"All fields are required"});
            }
        }
}



module.exports = UserController;

