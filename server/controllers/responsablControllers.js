const Chauffeur = require('../models/Chauffeur')
const Responsable = require('../models/Responsable')
const Vehicule = require('../models/Vehicule')
const Livraison = require('../models/Livraison')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const {default: axios} = require("axios");
const MailToChauffeur = require('../mail/sendMail')
const logger = require('../logger/logger')



   const Login = async (req,res)=>{

        try{
            const {email_R,password_R}= req.body;

            // validation
            if( !email_R || !password_R )
            return res.status(400).json({errorMessage : "please enter amll require fields"})

            const existingResponsable = await Responsable.findOne({email_R})
            if (!existingResponsable)
            return res.status(401).json({errorMessage : "Wrong email or password"})

            const passwordCorrect = await bcrypt.compare(password_R,existingResponsable.password_R)
            if(!passwordCorrect)
            return res.status(401).json({errorMessage : "Wrong email or password"})
 
            const token = jwt.sign({
                'user': existingResponsable._id 
            }, process.env.JWT_SECRET);
        
            // send the token in cookie
            res.cookie('token', token, { httpOnly: true })
            res.cookie('role', existingResponsable.role, { httpOnly: true }).send()

        

        } catch (err){
            console.error(err);
            res.status(500).send();
        }
    }
     const LogOut = async (req,res) =>{
        res.cookie("token","",{
    
        httpOnly:true,
        expires : new Date(0)
        }).send();
    
        }

     const CreateChauffeur = async (req, res) => {
            try{
             
                const jeton = req.cookies.token;
                const token = jwt.decode(jeton)
                const responsable = token.user

                const {fullName_C, email_C ,password_C,passwordVerify_C ,type,matricule}= req.body;
            
                //validation 
                if(!fullName_C || !email_C || !password_C || !passwordVerify_C || !type || !matricule  )
                return res.status(400).json({errorMessage : "please enter all require fields"})
            
                if(password_C.length < 6)
                return res.status(400).json({errorMessage : "please enter a pass of at last 6 chrt"})
            
                if(password_C !== passwordVerify_C)
                return res.status(400).json({errorMessage : "please enter the same pass"})
            
                const existingChauffeur = await Chauffeur.findOne({email_C})
                if(existingChauffeur)
                return res.status(400).json({errorMessage : "email already exist"})

                const existingVheculeForChauffeur = await Vehicule.findOne({matricule})
                if(existingVheculeForChauffeur)
                return res.status(400).json({errorMessage : "Vehicule used"})

            
            
                //hash pass
                const salt = await bcrypt.genSalt()
                const passwordHash_C = await bcrypt.hash(password_C,salt)
            
                // add new Manager
                const newChauffeur = new Chauffeur ({
                   fullName_C:fullName_C
                   ,email_C:email_C
                   ,password_C :passwordHash_C,
                   responsable:responsable
                })
            
                const savedChauffeur = await newChauffeur.save();
                const chauffeur = savedChauffeur._id.toString();
                
                const newVehiculeForChauffeur = new Vehicule ({
                   type
                    ,matricule
                    ,chauffeur:chauffeur
                 })
                 const savedVehicule = await newVehiculeForChauffeur.save();

                 
                    //----------send info to the newUser
                    
                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.MAIL,
                            pass: process.env.PASS
                        }
                    });
                    let mailOptions = {
                        from: process.env.MAIL,
                        to: email_C,
                        subject: "MarocShip",
                        text: "Hello " +fullName_C+ " use this email: " +email_C+ " and this password: " +password_C+ " to acces into your account via : http://localhost:3000/MarocShip/Chauffeur/login"
        
                    };
                    transporter.sendMail(mailOptions, (err, data) => {
                        if (err) {
                            return console.log('Error occurs');
                        } else {
                            console.log('mail sent')
                            return res.status(200).json({
                                success: 1,
                                message: 'data has sent '
                            });
                        }
        
        
                    });
                    // -----------
                           
            } catch (err){
                console.error(err);
                res.status(500).send();
            }
                }

    
            const CreateLivraison = async (req, res) => {
                    try{
                        const jeton = req.cookies.token;
                        const token = jwt.decode(jeton)
                        const responsable = token.user

                        const {name, type ,poid,zone,depart,arrive}= req.body;

                        // get distance
                        const distance = await axios(`https://www.distance24.org/route.json?stops=${req.body.depart}|${req.body.arrive}`)
                        .then((response) => {
                            return response.data.distance
   
                          })
                          .catch((error) => {
                            console.log(error)
                          })
                             
  
                        // Calcule de Montant de chaque livraison par kg
                        if(req.body.zone == "Maroc"){
                        if (req.body.poid <= 3) {
                         prix = req.body.poid * 40;
                         } else if ( req.body.poid > 3) {
                         //  eliminer les 3 premier cmnd
                          leReste =  req.body.poid -3;
                          prix = (leReste * 5) + 3*40;

                         }
                        }else if (req.body.zone == "Europe"){
                             prix = req.body.poid * 160;
                        }
                        else if (req.body.zone == "Amerique "){
                             prix = req.body.poid * 220;
                        }
                        else if (req.body.zone == "Asie"){
                              prix = req.body.poid * 240;
                        }
                        else if (req.body.zone == "Australie "){
                              prix = req.body.poid * 260;
                        }


                        //validation 
                        if(!name || !type || !poid ||!zone||!depart||!arrive)
                        return res.status(400).json({errorMessage : "please enter all require fields"})
                    
                        const newLivraison = new Livraison ({
                            name:name
                           ,type:type
                           ,poid:poid                           
                           ,zone:zone
                           ,depart:depart
                           ,arrive:arrive
                           ,distance:distance
                           ,prix:prix
                           ,responsable:responsable
                           ,status:"disponible"
                
                        })
                    
                        const savedLivraison = await newLivraison.save();

                        const livraisonType = savedLivraison.type;
                        const livraisonPoid = savedLivraison.poid;
                        const voiture = await Vehicule.find({type:"B"})
                        const grand_camion = await Vehicule.find({type:"D"})
                        const petit_camion = await Vehicule.find({type:"C"})
                        const avion = await Vehicule.find({type:"Avion"})



                        // const grand_camion = await Vehicule.find({ type: "B" }).populate("chauffeur" )


                      

                        if (livraisonType  == "nationale"){
                            if ( livraisonPoid > 0 && livraisonPoid <= 200) {
                                for (let i = 0; i < voiture.length; i++) {
                                    const reslt = await Chauffeur.findById({_id:voiture[i].chauffeur})
                                    const email = reslt.email_C;
                                    const fullName = reslt.fullName_C;
                                   
                                    await MailToChauffeur(email, fullName,zone,depart,arrive,poid);
                                            
                                }
                       
                            }
                            else if(livraisonPoid > 200 && livraisonPoid <= 800) {
                                for (let i = 0; i < petit_camion.length; i++) {
                                    const reslt = await Chauffeur.findById({_id:petit_camion[i].chauffeur})
                                    const email = reslt.email_C;
                                    const fullName = reslt.fullName_C;
                                    
                                    await MailToChauffeur(email, fullName,zone,depart,arrive,poid);

                                            
                                }
         
        
                            } 
                            else if( livraisonPoid > 800 &&livraisonPoid <= 1600) {
                                
                                for (let i = 0; i < grand_camion.length; i++) {
                                    const reslt = await Chauffeur.findById({_id:grand_camion[i].chauffeur})
                                    const email = reslt.email_C;
                                    const fullName = reslt.fullName_C;
                                    
                                    await MailToChauffeur(email, fullName,zone,depart,arrive,poid);
                                            
                                }
                        }
                        else if (livraisonType == "internationale") {
                            for (let i = 0; i < avion.length; i++) {
                                const reslt = await Chauffeur.findById({_id:avion[i].chauffeur})
                                const email = reslt.email_C;
                                const fullName = reslt.fullName_C;
                                
                                await MailToChauffeur(email, fullName,zone,depart,arrive,poid);                      
                                        
                            }
                        }
                    
                    }
                                     
                                      
                    } catch (err){
                        console.error(err);
                        res.status(500).send();
                    }
                        }

   const getLivraison = async (req,res)=>{
         try{
        // const p = req.body.poid
        const Livraisons = await Livraison.find()
        console.log(Livraisons)
        return res.status(200).json({
        success: 1,
        data: Livraisons
        });
           
             }
              catch (err){
            console.error(err)
             res.status(500).send();
            }
                   
            }    
    const deletChauffeur = async (req,res)=>{
        const { id } = req.params
        const chauffeur = { _id: id }
    try {
        const result = await Chauffeur.deleteOne(chauffeur)
        logger.info(` Chauffeur numero : ${id} a ete supprimer par son  ${req.cookies.role} `)
        res.status(200).json(result)
    } catch (err) {
        logger.error(`${err}`);
        res.status(400).json({ error: err })
    }
        
            }
                        
module.exports={
    getLivraison
    ,CreateLivraison
    ,CreateChauffeur
    ,LogOut
    ,Login
    ,deletChauffeur
}
