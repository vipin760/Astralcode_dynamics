const express = require('express')
const { getSampleData, userRegister, userLogin } = require('../controller/user.controller')
const router = express()

router.route('/dummy').get(getSampleData);

router.route('/user/register').post(userRegister);

router.route('/user/login').post(userLogin);

module.exports = router