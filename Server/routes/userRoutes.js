const express = require('express');
const tryCatch = require('../middlewares/tryCatch');
const { register, login } = require('../controllers/userController');
const router = express.Router();

router.post('/register', tryCatch(register));
router.post('/login', tryCatch(login));

module.exports = router;
