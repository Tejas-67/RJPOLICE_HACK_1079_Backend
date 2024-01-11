const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController')
router.get('/', (req, res) => {
    return res.send("ping pong");
});
router.get('/register',authController.registration);
router.get('/login',authController.login);
module.exports = router;