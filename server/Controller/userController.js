const userModel = require('../Model/user.model');

// Get user by ID
async function getUserById(req, res) {
    try {
        const userId = req.user; // Get userId from request parameters
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


async function updateData(req, res){
    try{
        const user = req.user;
        const { name, email } = req.body;

        const updateUser = await userModel.findByIdAndUpdate(
            user._id,
            { name: name },
            { email: email }
        );
        
        res.status(200).json({
            msg: "updated successfully",
            data: updateUser
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            msg: ""+error
        })
    }
}


module.exports = { getUserById, updateData };
