const mongoose = require('mongoose')

// Create Manager
const managerShcema=new mongoose.Schema({
    fullName_M : {
        type: String,
        required: true
    },
    email_M : {
        type: String,
        required: true
    },
    password_M : {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "manager"
    },
    });

const Manager = mongoose.model("manager",managerShcema);

module.exports = Manager;
