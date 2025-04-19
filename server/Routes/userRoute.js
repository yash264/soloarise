const express = require('express');
const app = express();
const { getUserById } = require('../Controller/userController');
const { protect } = require('../Middleware/authMiddleware');

const userRouter = express.Router();
 
userRouter.route('/')
.get(protect, getUserById);


module.exports = userRouter;