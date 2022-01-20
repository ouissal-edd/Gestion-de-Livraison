const mongoose = require('mongoose')

// Admin
const adminShcema=new mongoose.Schema({
fullName : {
    type: String,
    required: true
},
email : {
    type: String,
    required: true
},
password : {
    type: String,
    required: true
},
role: {
    type: String,
    default: "admin"
},
});



const Admin = mongoose.model("admin",adminShcema);


module.exports = Admin;
