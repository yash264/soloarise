const express = require('express');
const app = express();
const { getUserById } = require('../Controller/userController');
const { protect } = require('../Middleware/authMiddleware');
const router = express.Router();
app.use('/api/user', router);
 
router.get('/:id', protect,getUserById); // Get user by ID


module.exports = router;