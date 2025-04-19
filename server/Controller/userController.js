const userModel = require('../Model/user.model');

// Get user by ID
async function getUserById(req, res) {
    try {
        const userId = req.user._id // Get userId from request parameters
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

async function getUserData(req, res){
    try{
        const user = req.user;

        res.status(200).json(user);

    } catch(error){
        console.log(error);
        res.status(500).json({
            msg: "" + error
        })
    }
}

async function updateData(req, res) {
    try {
        const user = req.user;

        const updateUser = await userModel.updateMany(
            {
                _id: user._id,
            },
            {
                $set: req.body
            }
        );

    res.status(200).json({
        msg: "updated successfully",
        data: updateUser
    });
} catch (error) {
    console.log(error);
    res.status(500).json({
        msg: "" + error
    })
}
}

// Get all users sorted by points and level
async function getAllUsersSorted(req, res) {
    const userId = req.user._id;
    const offset = parseInt(req.query.offset) || 0;
    const limit = parseInt(req.query.limit) || 10;

    try {
        const allUsers = await userModel.find()
            .select('name username email points level')
            .sort({ points: -1, level: -1 });

        const totalUsers = allUsers.length;

        // Get paginated users
        const users = allUsers.slice(offset, offset + limit);

        // Find current user's rank
        const currentUserIndex = allUsers.findIndex(user => user._id.toString() === userId.toString());

        let currentUser = null;
        if (currentUserIndex !== -1) {
            const user = allUsers[currentUserIndex];
            currentUser = {
                ...user.toObject(),
                rank: currentUserIndex + 1
            };
        }

        res.status(200).json({
            success: true,
            users,
            totalUsers,
            currentUser
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error: " + error.message,
        });
    }
}



module.exports = { getUserById, updateData, getUserData,getAllUsersSorted };
