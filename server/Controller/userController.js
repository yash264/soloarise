const userModel = require('../Model/user.model');


async function getUserData(req, res){
    try{
        const user = req.user;
        
        res.status(200).json(user);
    } catch(error){
        console.log(error);
        res.status(500).json({
            msg: ""+error
        })
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


module.exports = { getUserData, updateData };