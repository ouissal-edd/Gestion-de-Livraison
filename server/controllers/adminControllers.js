const Admin = require('../models/Admin')
const Manager = require('../models/Manager')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


//   Register Admin
const Register = async (req, res) => {
    try {

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

        const existingAdmin = await Admin.findOne({
            email
        })
        if (existingAdmin)
            return res.status(400).json({
                errorMessage: "email already exist"
            })

        //hash pass
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)
        // console.log(passwordHash)

        // add new admin
        const newAdmin = new Admin({
            fullName: fullName,
            email: email,
            password: passwordHash
        })

        const savedAdmin = await newAdmin.save();


        // create token
        const token = jwt.sign({
            'user': savedAdmin._id
        }, process.env.JWT_SECRET);
        // console.log(token)

        // send the token in cookie
        res.cookie('token', token, {
            httpOnly: true
        })
        res.cookie('role', existingAdmin.role, {
            httpOnly: true
        }).send()



    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

// Log In Admin

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

        const existingAdmin = await Admin.findOne({
            email
        })
        if (!existingAdmin)
            return res.status(401).json({
                errorMessage: "Wrong email or password"
            })

        const passwordCorrect = await bcrypt.compare(password, existingAdmin.password)
        if (!passwordCorrect)
            return res.status(401).json({
                errorMessage: "Wrong email or password"
            })

        const token = jwt.sign({
            'user': existingAdmin._id
        }, process.env.JWT_SECRET);
        // console.log(token)

        // send the token in cookie
        res.cookie('token', token, {
            httpOnly: true
        })
        res.cookie('role', existingAdmin.role, {
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
    })
    res.cookie("role", "", {

        httpOnly: true,
        expires: new Date(0)
    }).send();

}

// Creat  Manager
const CreateManager = async (req, res) => {
    try {

        const {
            fullName_M,
            email_M,
            password_M,
            passwordVerify_M
        } = req.body;
        // console.log(fullName_M, email_M, password_M, passwordVerify_M)

        //validation 
        if (!fullName_M || !email_M || !password_M || !passwordVerify_M)
            return res.status(400).json({
                errorMessage: "please enter amll require fields"
            })

        if (password_M.length < 6)
            return res.status(400).json({
                errorMessage: "please enter a pass of at last 6 chrt"
            })

        if (password_M !== passwordVerify_M)
            return res.status(400).json({
                errorMessage: "please enter the same pass"
            })

        const existingManager = await Manager.findOne({
            email_M
        })
        if (existingManager)
            return res.status(400).json({
                errorMessage: "email already exist"
            })

        //hash pass
        const salt = await bcrypt.genSalt()
        const passwordHash_M = await bcrypt.hash(password_M, salt)

        // add new Manager
        const newManager = new Manager({
            fullName_M,
            email_M,
            password_M: passwordHash_M
        })

        const savedManager = await newManager.save();
        res.json(savedManager)




    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

const getManager = async (req, res) => {
    try {
        const Managers = await Manager.find()
        res.json(Managers)
    } catch (err) {
        console.error(err)
        res.status(500).send();
    }

}
const deletManager = async (req, res) => {
    const {
        id
    } = req.params
    const manager = {
        _id: id
    }
    try {
        const result = await Manager.deleteOne(manager)
        logger.info(` Manager: ${id} a ete supprimer par son super admin `)
        res.status(200).json(result)
    } catch (err) {
        logger.error(`${err}`);
        res.status(400).json({
            error: err
        })
    }

}


const updateManager = async (req, res) => {
    console.log(req.params.id);
    const newManagerUpdate = {
        fullName_M: req.body.fullName_M,
        email_M: req.body.email_M,

    };
    try {
        const manager = await Manager.updateOne({
                _id: req.params.id
            },
            newManagerUpdate
        );
        res.status(200).json({
            success: 1,
            manager,
        });
    } catch (error) {
        res.status(400).json({
            success: 0,
            message: error.message,
        });
    }
}


module.exports = {
    Login,
    LogOut,
    getManager,
    CreateManager,
    Register,
    deletManager,
    updateManager
}