const express = require('express');
const { protect } = require('../Middleware/authMiddleware');
const { getUserData } = require('../Controller/userController');


const userRouter = express.Router();

userRouter.route('/')
.get(protect, getUserData);

module.exports = userRouter;