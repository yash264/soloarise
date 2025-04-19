const express = require('express');
const app = express();
const { getUserById, updateData } = require('../Controller/userController');
const { protect } = require('../Middleware/authMiddleware');
const router = express.Router();

app.use('/api/user', router);

router.post('/update', protect, updateData);
 
router.get('/:id', protect,getUserById); // Get user by ID


module.exports = router;
