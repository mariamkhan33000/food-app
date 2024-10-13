const express = require('express')
const { getUserController } = require('../controllers/userConstroller')
const authMiddlewares = require('../middlewares/authMiddlewares')

const router = express.Router();

//router
// Get User || Get
router.get('/getUser', authMiddlewares, getUserController)

module.exports = router