const express = require('express')
const { getUserController, updateUserController } = require('../controllers/userConstroller')
const authMiddlewares = require('../middlewares/authMiddlewares')

const router = express.Router();

//router
// Get User || Get
router.get('/getUser', authMiddlewares, getUserController)

//update profile

router.put('/updateUser', authMiddlewares, updateUserController)

module.exports = router