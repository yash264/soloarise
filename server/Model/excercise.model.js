const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
    exerciseName: {
        type: String,
        required: true,
        trim: true, // Removes leading and trailing spaces
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create and export the Exercise model
const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;