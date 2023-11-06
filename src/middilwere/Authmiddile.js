
const jwt = require('jsonwebtoken');
const  UserModel = require('../models/UserModel');

const Authmiddile = async(req,res,next)=>{
        let token 
        const   {authorization} = req.headers;
        if(authorization && authorization.startsWith("Bearer")){
            try {
                token = authorization.split(' ')[1]

                const {userID} = jwt.verify(token,'hhhhhhh');
                req.user = await UserModel.findById(userID).select('-password')
                console.log(req.user)
                next();
            } catch (error) {
                console.log(error);
                res.status(401).send({status:"failed",message:"Unauthorize"});
            }
        }
        if(!token){
            res.status(401).send({status:"failed",message:"Unauthorize no token"});
        }
}
module.exports = Authmiddile;