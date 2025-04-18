const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../Model/user.model');

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
const jwtKey = process.env.JWT_KEY;
const oneWeekInSeconds = 7 * 24 * 60 * 60;

// Login User
async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
         //400 Bad Request
        return res.status(400).json({
            success: false,
            message: "Please provide both email and password",
        });
    }

    try {
        const user = await User.findOne({ email: email }).exec();
        // Check if user exists
        //404 Not Found
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Invalid email or user does not exist",
            });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
             //401 Unauthorized
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }

        const id = user['_id'];
        //send user id payload in jwt token
        const token = jwt.sign({ payload: id }, jwtKey, { expiresIn: oneWeekInSeconds });
 
      // Set the JWT token in a cookie
        res.cookie('user', token, {
            httpOnly: true, // prevents client-side JavaScript from accessing the cookie
            maxAge: oneWeekInSeconds * 1000, // cookie expiration time in milliseconds
        });
 
        // 200 Okay data sent successfully
        res.status(200).json({
            success: true,
            message: "Login successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                points: user.points,
                level: user.level,
            },
            token: token,
        });
    } catch (error) {
         // 500 Internal Server Error
         // Issues like data connection
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
}

// Register User
async function register(req, res) {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields (name, email, password, username)",
        });
    }

    try {
        const userExists = await User.findOne({ email: email }).exec();
        if (userExists) {
             //email already taken by other user
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        const usernameExists = await User.findOne({ username: username }).exec();
        if (usernameExists) {
             //username already taken by other user
            return res.status(400).json({
                success: false,
                message: "Username is already taken",
            });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            name,
            email,
            username,
            password: hashedPassword,
        };
        //create new user in database
        const user = await User.create(newUser);
 
        //send user id payload in jwt token
        res.status(201).json({
            success: true,
            message: "Registered successfully",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                username: user.username,
                points: user.points,
                level: user.level,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
}

module.exports = { loginUser, register };