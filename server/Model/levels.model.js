const mongoose = require("mongoose");

const levelsSchema = new mongoose.Schema({
    level: {
        type: Number,
        required: true,
        unique: true,
        min: 1, // Ensures level is non-negative
    },
    positivePoints: { 
                  //points get if current level done
        type: Number, 
        required: true,
        default: function () {
            return 3 * this.level; // Default value is 3 times the level
        },
    },
    negativePoints: { // points deducted if not done
        type: Number,
        required: true,
        default: function () {
            return -1 * this.level; // Default value is -1 times the level
        },
    },
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Create and export the Levels model
const Levels = mongoose.model("Levels", levelsSchema);
module.exports = Levels;