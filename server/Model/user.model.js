const mongoose = require("mongoose");
 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, // remove trailing spaces
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, 
        //regex
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"], // Email validation
    },
    password: {
        type: String,
        required: true,
        minlength: 8, // Minimum length of 8 characters
    },
    points:{
        type:Number,
         default:0,
    },
    level: {
        type: Number,
        default:1,
        min: 1,
        max: 100,
    },
    dialyQuest: [
        {
            exerciseId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Exercise", // referencing to Exercise model
                required: true,
            },
            totalTime: {
                type: Number, // Total time in kms(for running)
                              //for some exercises there is count(for squats,pushups etc..)
                required: true,
            },
            timeDone: {
                type: Number, // Time completed in minutes
                required: true,
                default:0   //initially timedone 0
            },
        },
    ],
}, { timestamps: true });

userSchema.index({ username: 1, email: 1 });


// Create and export the user model
const User = mongoose.model("User", userSchema);
module.exports = User;