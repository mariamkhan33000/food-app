const userModel = require('../models/userModel')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
//Register
const registerController = async (req, res) => {
    try {
        const {username, email, password, phone, address} = req.body;
        //validation
        if(!username || !email || !password || !address || ! phone){
            return res.status(500).send({
                success: false,
                message: "Please Provide all field"
            })
        }
        //check user
        const existing = await userModel.findOne({email})
        if(existing) {
            return res.status(500).send({
                success:false,
                message: "Email Already Register please Login"
            })
        }
        //hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(password, salt)
        //create user
        const user = await userModel.create({username, email, password: hashPassword, address, phone})
        res.status(201).send({
            success: true,
            message: 'Successfully registered',
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msessage: 'Error in register Api',
            error
        })
    }
}

//Login 

const loginController = async (req, res) => {
    try {
        const {email,password} = req.body
        //valitdation
        if(!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please Provide email or password",
            })
        }
        //check user
        const user = await userModel.findOne({ email })
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User Not found'
            })
        }
        //compare password || check user password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(500).send({
                success:false,
                message: "Invalid Creditials"
            })
        }
        //token
        const token = JWT.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d'})
        user.password = undefined
        res.status(200).send({
            success: true,
            message: 'login successfully',
            token,
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            msessage: 'Error in Login Api',
            error
        })
    }
}

module.exports = {registerController, loginController}