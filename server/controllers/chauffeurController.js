const Chauffeur = require('../models/Chauffeur')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Livraison = require('../models/Livraison');
const dyjs = require("dayjs");




   const Login = async (req,res)=>{

        try{
            const {email_C,password_C}= req.body;

            // validation
            if( !email_C || !password_C )
            return res.status(400).json({errorMessage : "please enter amll require fields"})

            const existingChauffeur = await Chauffeur.findOne({email_C})
            if (!existingChauffeur)
            return res.status(401).json({errorMessage : "Wrong email or password"})

            const passwordCorrect = await bcrypt.compare(password_C,existingChauffeur.password_C)
            if(!passwordCorrect)
            return res.status(401).json({errorMessage : "Wrong email or password"})
 
            const token = jwt.sign({
                'user': existingChauffeur._id 
            }, process.env.JWT_SECRET);
        
            // send the token in cookie

            res.cookie('token', token, { httpOnly: true })
            res.cookie('role', existingChauffeur.role, { httpOnly: true }).send()
        

        } catch (err){
            console.error(err);
            res.status(500).send();
        }
    }

 const LogOut= async (req,res) =>{
        res.cookie("token","",{
    
        httpOnly:true,
        expires : new Date(0)
        }).send();
    
        }

const takeDelivery = async(req,res)=>{
try {
    const jeton = req.cookies.token;
    const token = jwt.decode(jeton)
    const Chauffeur_id = token.user

    // prendre la livraison affectée 
    const livraison = await Chauffeur.findOneAndUpdate({ _id:Chauffeur_id },{ $push: { livraisons: req.body.ref_livraison  } });
    const Disable_livraison = await Livraison.findOneAndUpdate({ _id:req.body.ref_livraison},{ $set: { status: "non disponible"  } });
    
    return res.status(200).json({success : "this delivery is affected to u :)"})

}
catch (err){
    console.error(err)
    res.status(500).send();
}
    }

// get day who i want start my month 



const Prime = async(req,res)=>{
    try {
        const jeton = req.cookies.token;
        const token = jwt.decode(jeton)
        const Chauffeur_id = token.user

        let totaleDistance = 0;
        let allLivraison =[];

        let prix = 0 ;
        let prime = 0 ;
    
        // prendre la livraison affectée 
        const chauffeur = await Chauffeur.findById({ _id:Chauffeur_id })

        await Promise.all( chauffeur.livraisons.map(async(element) => {
        console.log(element)
        const livraison = await Livraison.findById({ _id: element })
        allLivraison.push(livraison)
        totaleDistance+=livraison.distance 
        prix+=livraison.prix 

        }))
        

        if (totaleDistance === 1000) {
            prime = prix * 0.15
            const result = await Chauffeur.updateOne({ _id: Chauffeur_id }, { prime: prime });
            res.json({ result, prime })
          } else if (totaleDistance > 1000 && totaleDistance <= 2000) {
            prime = prix * 0.22
            const result = await Chauffeur.updateOne({ _id: Chauffeur_id }, { prime: prime });
            res.json({ result, prime })
          } else if (totaleDistance > 2000 && totaleDistance <= 2500) {
            prime = prix * 0.33
            const result = await Chauffeur.updateOne({ _id: Chauffeur_id }, { prime: prime });
            res.json({ result, prime })
          }
    
    }
    catch (err){
        console.error(err)
        res.status(500).send();
    }
        }



        module.exports = {
            Prime
            ,takeDelivery
            ,LogOut
            ,Login
        }