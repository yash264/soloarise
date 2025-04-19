const axios = require("axios");
const questModel = require('../Model/quest.model');
const userModel = require('../Model/user.model');


const fetch_data = async (body) => {
    try {
        const response = await axios.post("http://127.0.0.1:5000/predict", body);
        
        return response.data

    } catch (error) {
        return error;
 
    }
}

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

        const data = await userModel.findById(user._id);

        const response = await fetch_data({
            previous_level: data.level,
            points: data.points
        })

        const newQuest = new questModel({
            date: now,
            exercises: [
                {  
                    type: response.recommendation[0].type,
                    value: response.recommendation[0].value,
                    practise: response.recommendation[0].exercise,
                    tips: response.recommendation[0].tips
                },
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
            console.log("nonotnotnnto");
            return res.status(404).json({ message: "Quest not found" });
        }
        console.log(user.quest);

        res.status(200).json(user.quest);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: ""+error
        })
    }
}

async function updateQuest(req, res){
    try{
        const { date, exercises } = req.body;
        const allDone = exercises.every(ex => {
            const value = parseFloat(ex.value);
            const done = parseFloat(ex.done);
            return !isNaN(value) && !isNaN(done) && done >= value;
        });

        const updatedExercises = exercises.map(ex => {
            const value = parseFloat(ex.value);
            const done = parseFloat(ex.done);
            const isCompleted = !isNaN(value) && !isNaN(done) && done >= value;
            return {
                ...ex,
                completed: isCompleted
            };
        });
        const allCompleted = updatedExercises.every(ex => ex.completed);
        const updatedQuest = await questModel.findOneAndUpdate(
            { date: date },
            {
                exercises: updatedExercises,
                completed: allCompleted
            },
            { upsert: true, new: true }
        );

        return res.status(200).json({
            success: true,
            message: 'Quest updated successfully',
            data: updatedQuest
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            msg: ""+error
        })
    }
}


module.exports = { createQuest, getQuest, updateQuest };