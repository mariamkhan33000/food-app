const express = require('express')
const { getUserController, updateUserController, resetPasswordController } = require('../controllers/userConstroller')
const authMiddlewares = require('../middlewares/authMiddlewares')

const router = express.Router();

//router
// Get User || Get
router.get('/getUser', authMiddlewares, getUserController)

//update profile

router.put('/updateUser', authMiddlewares, updateUserController)

//Reset Password

router.post('/resetPassword', authMiddlewares, resetPasswordController)

module.exports = router