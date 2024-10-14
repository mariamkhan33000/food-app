const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')

//Get User Info
const getUserController = async (req, res) => {
   try {
    console.log(req.body.id)
    //find user
    const user = await userModel.findById({ _id: req.body.id })
    //validation
    if(!user) {
        return res.status(404).send({
            success:false,
            message: 'user not found'
        })
    }
    //hide Password 
    user.password = undefined
    //resp
    res.status(200).send({
        success:true,
        message: "Usr get Successfully",
        user
    })
   } catch (error) {
    console.log(error)
    res.status(500).send({
        success: false,
        message: "Error in get user Api",
        error
    })
   }
}

// update user 
const updateUserController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById({ _id: req.body.id })
        //validation
        if(!user) {
            return res.status(404).send({
                success: false,
                message: "user not found"
            })
        }
        //update
        const {username, address,phone} = req.body
        if(username) user.username = username
        if(address) user.address = address
        if(phone) user.phone = phone
        //save user
        await user.save();
        res.status(200).send({
            success: true,
            message: "User Update Successfully",
            user
        })
    } catch (error) {
        console.log(error) 
        res.status(500).send({
            success: false,
            message: 'Error In Update User Api'
        })
    }
}
// Reset Password

const resetPasswordController = async (req, res) => {
    try {
        const {email, newPassword, answer} = req.body
        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success: false,
                message: "Please Provide All Fields"
            })
        }
        const user = await userModel.findOne({email})
        if(!user) {
            return res.status(500).send({
                success: false,
                message: "User Not Found or Invlaid answer"
            })
        }

        // hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(newPassword, salt)
        user.password = hashPassword
        await user.save()
        res.status(200).send({
            success: true,
            message: "password Reset Successfull"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in Password reset API',
            error
        })
    }
}

// Update User Password

const updatePasswordController = async (req, res) => {
    try {
        // find user
        const user = await userModel.findById( req.body.id )
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }
        //get data for user

        const {oldPassword, newPassword} = req.body
        if(!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Old or new Password"
            })
        }
        
         //compare password || check user password
         const isMatch = await bcrypt.compare(oldPassword, user.password)
         if(!isMatch) {
             return res.status(500).send({
                 success:false,
                 message: "Invalid Old Password"
             })
         }
         // hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hash(newPassword, salt)
         user.password = hashPassword
         await user.save()
         res.status(200).send({
            success: true,
            message: "Password Updated"
         })
         
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in Password Update API',
            error
        })
    }
}

module.exports = {getUserController, updateUserController, resetPasswordController, updatePasswordController}