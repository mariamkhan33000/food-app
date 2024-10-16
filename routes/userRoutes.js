const express = require('express')
const { getUserController, updateUserController, resetPasswordController, updatePasswordController, deleteProfileController } = require('../controllers/userConstroller')
const authMiddlewares = require('../middlewares/authMiddlewares')

const router = express.Router();

//router
// Get User || Get
router.get('/getUser', authMiddlewares, getUserController)

//update profile

router.put('/updateUser', authMiddlewares, updateUserController)

//Reset Password

router.post('/resetPassword', authMiddlewares, resetPasswordController)

//Update Password

router.post('/updatePassword', authMiddlewares, updatePasswordController)

//Delete User
router.delete("/deleteUser/:id", authMiddlewares, deleteProfileController)

module.exports = router