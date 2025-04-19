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


module.exports = { getUserData };