const express = require('express');
const { protect } = require('../Middleware/authMiddleware');
const { getUserData, updateData } = require('../Controller/userController');


const userRouter = express.Router();

userRouter.route('/')
.get(protect, getUserData)
.post(protect, updateData)

module.exports = userRouter;