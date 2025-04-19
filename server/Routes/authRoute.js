const express = require('express');
const app = express();
const authRouter = express.Router();
const { loginUser, register } = require('../Controller/authController');


app.use('/api/auth', authRouter);
 
authRouter
    .route("/login")
    .post(loginUser)
    
authRouter
    .route("/register")
    .post(register)
    
module.exports = authRouter;