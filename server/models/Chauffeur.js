const mongoose = require('mongoose')



const chauffeurShcema = new mongoose.Schema({
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
  livraisons: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "livraison",
  }, ],
  responsable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "responsable"
  },
  prime: {
    type: Number,
    default: 0
  },
  role: {
    type: String,
    default: "chauffeur"
  },
});

const Chauffeur = mongoose.model("chauffeur", chauffeurShcema);

module.exports = Chauffeur;