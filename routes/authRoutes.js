const express = require('express')
const router = express.Router()
const { registerController } = require('../controllers/authControllsers')



//route
//Register || Post
router.post('/register', registerController )

module.exports = router