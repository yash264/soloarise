const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

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
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true, 
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    points: {
        type: Number,
        default:0,
    },
    level: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    quest: {
        type: mongoose.Schema.Types.ObjectId,
        default: null,
        ref: 'questModel'
    }
}, { timestamps: true });

userSchema.pre('save', async function () {
 
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(this.password, salt);
    this.password = hashPass;
})


const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;