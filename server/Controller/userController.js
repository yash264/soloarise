const userModel = require('../Model/user.model');

async function getUserById(req, res) {
    try {
        const user = req.user;

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
}



module.exports = { getUserById };