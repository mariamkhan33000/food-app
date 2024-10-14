const userModel = require("../models/userModel")

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
module.exports = {getUserController, updateUserController}