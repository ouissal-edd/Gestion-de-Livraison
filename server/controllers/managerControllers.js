const Manager = require('../models/Manager')
const Responsable = require('../models/Responsable')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

   const Login = async (req,res)=>{

        try{
            const {email_M,password_M}= req.body;

            // validation
            if( !email_M || !password_M )
            return res.status(400).json({errorMessage : "please enter amll require fields"})

            const existingManager = await Manager.findOne({email_M})
            if (!existingManager)
            return res.status(401).json({errorMessage : "Wrong email or password"})

            const passwordCorrect = await bcrypt.compare(password_M,existingManager.password_M)
            if(!passwordCorrect)
            return res.status(401).json({errorMessage : "Wrong email or password"})
 
            const token = jwt.sign({
                'user': existingManager._id 
            }, process.env.JWT_SECRET);
        
            // send the token in cookie
          
            res.cookie('token', token, { httpOnly: true })
            res.cookie('role', existingManager.role, { httpOnly: true }).send()

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

    const CreateResponsable = async (req, res) => {
            try{
                const jeton = req.cookies.token;
                const token = jwt.decode(jeton)
                const manager = token.user

            
                const {fullName_R, email_R ,password_R,passwordVerify_R}= req.body;
            
                //validation 
                if(!fullName_R || !email_R || !password_R || !passwordVerify_R)
                return res.status(400).json({errorMessage : "please enter amll require fields"})
            
                if(password_R.length < 6)
                return res.status(400).json({errorMessage : "please enter a pass of at last 6 chrt"})
            
                if(password_R !== passwordVerify_R)
                return res.status(400).json({errorMessage : "please enter the same pass"})
            
                const existingResponsable = await Responsable.findOne({email_R})
                if(existingResponsable)
                return res.status(400).json({errorMessage : "email already exist"})
            
                //hash pass
                const salt = await bcrypt.genSalt()
                const passwordHash_R = await bcrypt.hash(password_R,salt)
            
                // add new Manager
                const newResponsable = new Responsable ({
                   fullName_R:fullName_R
                   ,email_R:email_R
                   ,password_R :passwordHash_R,
                   manager:manager
                })
            
                const savedResponsable = await newResponsable.save();
            
            
            } catch (err){
                console.error(err);
                res.status(500).send();
            }
                }

                module.exports={
                    CreateResponsable
                    ,LogOut
                    ,Login
                }