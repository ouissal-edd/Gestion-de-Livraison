const mongoose = require('mongoose')


const responsableShcema = new mongoose.Schema({
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
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "manager"
    },
    role: {
        type: String,
        default: "responsable"
    },
});

const Responsable = mongoose.model("responsable", responsableShcema);

module.exports = Responsable;