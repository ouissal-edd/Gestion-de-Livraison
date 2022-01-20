const mongoose = require('mongoose')

const livraisonShcema=new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    type : {
        type: String,
        required: true
    },
    poid : {
        type: Number,
        required: true
    },
   
    zone: {
        type: String,
        required: true
    },
    depart: {
        type: String,
        required: true

    },
    arrive: {
        type: String,
        required: true

    },
    distance: {
        type: Number,
        required: true
    },
    prix: {
    type: Number,
    required: true,
  },
  responsable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "responsable"
  }, 
  status:{
    type: String,
    required: true,
  },
  date:{
    type: Date,
    default: Date.now,
  },
    
    });

const Livraison = mongoose.model("livraison",livraisonShcema);

module.exports = Livraison;
