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

async function createQuest(req, res) {
    try {
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
        await userModel.update(
            user._id,
            { quest: newQuest._id },
            { new: true }
        );

        return res.status(201).json({
            msg: "New quest created successfully",
            quest: newQuest
        });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "" + error
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
            msg: "" + error
        })
    }
}


const xpByExercise = {
    pushUps: 10,
    squat: 8,
    planks: 12,
    bicepsCurl: 9,
    running: 15
};

/*async function updateQuest(req, res) {
    try {
        const { exercise } = req.body;
        const user = req.user;
        const value = parseFloat(exercise.value);
        const done = parseFloat(exercise.done);
        const isCompleted = !isNaN(value) && !isNaN(done) && done >= value;

        const updatedExercise = {
            ...exercise,
            completed: isCompleted
        };

        const questId = user.quest;
        let quest = await questModel.findById(questId);

        const existingExercises = quest.exercises || [];
        const index = existingExercises.findIndex(ex => ex.name === exercise.name);

        if (index !== -1) {
            existingExercises[index] = updatedExercise;
        } else {
            existingExercises.push(updatedExercise);
        }

        const allCompleted = existingExercises.every(ex => ex.completed);

        quest.exercises = existingExercises;
        quest.completed = allCompleted;
        await quest.save();

        return res.status(200).json({
            success: true,
            message: 'Quest updated successfully',
            data: quest
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "" + error
        });
    }
}*/

async function updateQuest(req, res) {
    try {
        const { exercise } = req.body;
        console.log(exercise);
        const user = req.user;
        const value = parseFloat(exercise.value);
        const done = parseFloat(exercise.done);
        const isCompleted = !isNaN(value) && !isNaN(done) && done >= value;

        if (isCompleted) {

            await userModel.updateMany(
                { 
                    _id: user._id, 
                },
                {
                    level: user.level + 1,
                    points: user.points + 10
                },
            );

            const updateTask = await questModel.updateMany(
                {
                    _id: user.quest,
                },
                {
                    completed: isCompleted,
                }
            );

            return res.status(200).json({
                success: true,
                message: 'Quest updated successfully',
                data: updateTask
            });
        }
        else {
            return res.status(200).json({
                success: true,
                message: 'Complete your task',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "" + error
        });
    }
}

module.exports = { createQuest, getQuest, updateQuest };