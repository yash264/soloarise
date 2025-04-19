const userModel = require('../Model/user.model');

// Get user by ID
async function getUserById(req, res) {
    try {
        const userId = req.params.id; // Get userId from request parameters
        const user = await userModel.findById(userId).select('-password'); // Exclude the password field

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
}



module.exports = {
    getUserById
};