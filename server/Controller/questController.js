const questModel = require('../Model/quest.model');
const userModel = require('../Model/user.model');

async function createQuest(req, res){
    try{
        const user = req.user;
        const quest = await questModel.findById(user.quest);
        const now = new Date();

        if (quest) {
            const questDate = new Date(quest.date); 
            const diffInHours = Math.abs(now - questDate) / 36e5;

            if (diffInHours < 24) {
                return res.status(200).json({
                    msg: "Returning existing quest within 24h",
                    quest: quest
                });
            }
        }

        const newQuest = new questModel({
            date: now,
            exercises: [
                { type: "pushup", value: 30 },
                { type: "squat", value: 40 }
            ]
        });

        await newQuest.save();

        user.quest = newQuest._id;
        await userModel.findByIdAndUpdate(
            user._id,
            { quest: newQuest._id },
            { new: true }
        );

        return res.status(201).json({
            msg: "New quest created successfully",
            quest: newQuest
        });


    }
    catch(error){
        console.log(error);
        res.status(500).json({
            msg: ""+error
        })
    }
}


async function getQuest(req, res) {
    try {
        const user = await userModel.findById(req.user._id).populate('quest');

        if (!user || !user.quest) {
            return res.status(404).json({ message: "Quest not found" });
        }

        res.status(200).json(user.quest);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: ""+error
        })
    }
}

// async function updateQuest(req, res){
//     try{


//     }
//     catch(error){


//     }
// }


module.exports = { createQuest, getQuest };