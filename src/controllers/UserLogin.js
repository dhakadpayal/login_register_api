
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  UserModel = require('../models/UserModel');

const UserLogin = async (req,res)=>{
    try {
        const {email,password} = req.body;
            if(email&&password){
                const user = await UserModel.findOne({email:email});
                if(user != null){
                    const isMatch = await bcrypt.compare(password,user.password);
                    if((user.email == email )&& isMatch){
                        const token = jwt.sign({ userID:user._id},'hhhhhhh',{expiresIn:'5d'});
                        res.send({status:"success",message:"Login successfully",token:token});
                    }else{
                        res.send({status:"failed",message:"Email or Password invalid"});
                    }
                }
                else{
                    res.send({status:"failed",message:"user are a not registerd"});
                }
            }else{
                res.send({status:"failed",message:"All fields are require"});
            }
    } catch (error) {
        console.log(error)
    }
}

module.exports = UserLogin;