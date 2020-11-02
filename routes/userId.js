const express = require('express');
const router = express.Router();

const userIdCtrl = require('../controllers/userId');

router.post('/signup', userIdCtrl.signup);
router.post('/login', userIdCtrl.login);

module.exports = router;
