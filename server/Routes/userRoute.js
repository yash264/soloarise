const express = require('express');
const app = express();
const { getUserById, updateData } = require('../Controller/userController');
const { protect } = require('../Middleware/authMiddleware');
const router = express.Router();

router.get('/getData', protect,  getUserById);

router.post('/update', protect, updateData);
 
//router.get('/:id', protect,getUserById); // Get user by ID


module.exports = router;
