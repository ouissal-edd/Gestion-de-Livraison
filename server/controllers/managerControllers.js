const Manager = require('../models/Manager')
const Responsable = require('../models/Responsable')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const logger = require('../logger/logger')


const Login = async (req, res) => {

    try {
        const {
            email,
            password
        } = req.body;

        // validation
        if (!email || !password)
            return res.status(400).json({
                errorMessage: "please enter amll require fields"
            })

        const existingManager = await Manager.findOne({
            email
        })
        if (!existingManager)
            return res.status(401).json({
                errorMessage: "Wrong email or password"
            })

        const passwordCorrect = await bcrypt.compare(password, existingManager.password)
        if (!passwordCorrect)
            return res.status(401).json({
                errorMessage: "Wrong email or password"
            })

        const token = jwt.sign({
            'user': existingManager._id
        }, process.env.JWT_SECRET);

        // send the token in cookie

        res.cookie('token', token, {
            httpOnly: true
        })
        res.cookie('role', existingManager.role, {
            httpOnly: true
        }).send()

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

const LogOut = async (req, res) => {
    res.cookie("token", "", {

        httpOnly: true,
        expires: new Date(0)
    }).send();

}

const CreateResponsable = async (req, res) => {
    try {
        const jeton = req.cookies.token;
        const token = jwt.decode(jeton)
        const manager = token.user


        const {
            fullName,
            email,
            password,
            passwordVerify
        } = req.body;


        //validation 
        if (!fullName || !email || !password || !passwordVerify)
            return res.status(400).json({
                errorMessage: "please enter amll require fields"
            })

        if (password.length < 6)
            return res.status(400).json({
                errorMessage: "please enter a pass of at last 6 chrt"
            })

        if (password !== passwordVerify)
            return res.status(400).json({
                errorMessage: "please enter the same pass"
            })

        const existingResponsable = await Responsable.findOne({
            email
        })
        if (existingResponsable)
            return res.status(400).json({
                errorMessage: "email already exist"
            })

        //hash pass
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        // add new Manager
        const newResponsable = new Responsable({
            fullName: fullName,
            email: email,
            password: passwordHash,
            manager: manager
        })

        const savedResponsable = await newResponsable.save();


    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}


const getResponsable = async (req, res) => {
    try {
        const Responsables = await Responsable.find()
        res.json(Responsables)
    } catch (err) {
        console.error(err)
        res.status(500).send();
    }

}

const deletResp = async (req, res) => {
    const {
        id
    } = req.params
    const responsable = {
        _id: id
    }
    try {
        const result = await Responsable.deleteOne(responsable)
        logger.info(` Responsable: ${id} a ete supprimer par son Manager `)
        res.status(200).json(result)
    } catch (err) {
        console.log(err);
        res.status(400).json({
            error: err
        })
    }

}


const updateResponsable = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body.fullName,
        req.body.email,
    )
    const newResponsableUpdate = {
        fullName: req.body.fullName,
        email: req.body.email,

    };
    try {
        const resp = await Responsable.updateOne({
                _id: req.params.id
            },
            newResponsableUpdate
        );
        res.status(200).json({
            success: 1,
            resp,
        });
    } catch (error) {
        res.status(400).json({
            success: 0,
            message: error.message,
        });
    }
}


module.exports = {
    CreateResponsable,
    LogOut,
    Login,
    getResponsable,
    updateResponsable,
    deletResp
}