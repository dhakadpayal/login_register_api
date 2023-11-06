const express = require('express');
const userRouter = express.Router();
const UserController = require('../controllers/UserController');
const UserLogin = require('../controllers/UserLogin');
const ChangePassword = require('../controllers/ChangePassword');
const Authmiddile = require('../middilwere/Authmiddile');

userRouter.use('/changepassword',Authmiddile)

userRouter.post('/register',UserController)
userRouter.post('/login',UserLogin)
userRouter.post('/changepassword',ChangePassword);

module.exports = userRouter;