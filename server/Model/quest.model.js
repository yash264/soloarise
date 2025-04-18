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
                enum: ['pushup', 'squat', 'plank', 'bicep curl', 'running'],
                required: true,
            },
            value: {
                type: Number,
                required: true
            }
        }
    ]

},{
    timestamps:true
})


const questModel = mongoose.model("questModel", questSchema);
module.exports = questModel;