const mongoose = require('mongoose')


const vehiculeSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true
    },
    matricule:{
        type: String,
        required: true
    },
    chauffeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "chauffeur"
      }
})



const vehicule = mongoose.model("vehicule",vehiculeSchema);

module.exports = vehicule;
