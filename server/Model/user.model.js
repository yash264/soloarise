const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
        minlength: 6,
        validate: {
            validator: function (value) {
                return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value);
            },
            message: "Password must contain at least one letter, one number, and one special character",
        },
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

// Pre-save middleware to hash the password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the user model
const User = mongoose.model("User", userSchema);
module.exports = User;