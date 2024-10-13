const userModel = require('../models/userModel')
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
        //create user
        const user = await userModel.create({username, email, password, address, phone})
        res.status(201).send({
            success: true,
            message: 'Successfully registered'
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
        const user = await userModel.findOne({email: email, password: password})
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User Not found or password mismatch'
            })
        }
        res.status(200).send({
            success: true,
            message: 'login successfully',
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