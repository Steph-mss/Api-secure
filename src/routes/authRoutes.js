const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { validate, registerRules, loginRules } = require('../middlewares/validator');

router.post('/register', registerRules(), validate, register);
router.post('/login', loginRules(), validate, login);

module.exports = router;
