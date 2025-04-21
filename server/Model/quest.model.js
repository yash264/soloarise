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
                enum: ['pushUps', 'squat', 'planks', 'bicepsCurl'],
                required: true,
            },
            value: {
                type: String,
                required: true
            },
            done: {
                type: String,
                default: "0"
            },
            tips: {
                type: String,
                required: true
            },
            completed: {
                type: Boolean,
                default: false
            }
        }
    ],
    completed: {
        type: Boolean,
        default: false
    },
},{
    timestamps:true
})


const questModel = mongoose.model("questModel", questSchema);
module.exports = questModel;