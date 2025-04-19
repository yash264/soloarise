const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');
const userModel = require('../Model/user.model');
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
const jwtKey = process.env.JWT_KEY;
const oneWeekInSeconds = 7 * 24 * 60 * 60;

async function loginUser(req, res) {
    const { email, password } = req.body;
   
    const user = await userModel.findOne({ email: email }).exec();
   
     
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const id = user['_id']
                const token = jwt.sign({ payload: id }, jwtKey, { expiresIn: oneWeekInSeconds });
                res.cookie('user', token, { 
                    httpOnly: true,
                    maxAge: oneWeekInSeconds * 1000
                });
              
                res.status(200).json({
                    success: true,
                    message: "Login successfully",
                    data: user,
                    token: token
                })
            }
            else {
                res.json({
                    success: false,
                    message: "Invalid Password" });
            }
        }
        else {
            res.json({
                success: false,
                message: "Invalid username" });
        }
}

async function register(req, res) {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
        return res.status(400).json({
            success: false,
            message: "Please enter all the fields",
        });
    }

    try {
        const body = req.body;
        const userExist = await userModel.findOne({email: body.email});
        if(userExist){
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }
        
        const user = await userModel.create(body);

        res.status(201).json({
            success: true,
            message: "Registered Successfully",
            data: user
        });
    } catch (error) {
        res.json({
            message: "error :"+error
        })
    }
}

module.exports = { loginUser, register };