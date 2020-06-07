const express = require('express');
const router = express.Router();
const registerValidator = require('../middlewares/registerValidator');
const loginValidator = require('../middlewares/loginValidator');

const userController = require('../controllers/user.controller');

router.get('/', userController.getUsersWithoutAdmin);
router.post('/register', registerValidator, userController.registerUser);
router.post("/login", loginValidator, userController.login);

module.exports = router;
