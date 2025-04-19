const mongoose = require("mongoose");

const questSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    exercises: [
        {
            type: {
                type: String,
                enum: ['pushUps', 'squat', 'planks', 'bicepsCurl', 'running'],
                required: true,
            },
            value: {
                type: String,
                required: true
            },
            practise: {
                type: String,
                required: true,
            },
            tips: {
                type: String,
                required: true
            }
        }
    ]

},{
    timestamps:true
})


const questModel = mongoose.model("questModel", questSchema);
module.exports = questModel;