const express = require('express');
const app = express();
const authRouter = express.Router();
const { loginUser, register } = require('../Controller/authController');


app.use('/api/auth', authRouter);

//for login use http://localhost:<port>/api/auth/login
//for register use http://localhost:<port>/api/auth/register
 
authRouter
    .route("/login")
    .post(loginUser)
    
authRouter
    .route("/register")
    .post(register)

    
module.exports = authRouter;