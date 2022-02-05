const mongoose = require('mongoose')

// Create Manager
const managerShcema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "manager"
    },
});

const Manager = mongoose.model("manager", managerShcema);

module.exports = Manager;