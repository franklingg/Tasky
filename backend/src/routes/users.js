const router = require('express').Router();
const UserController = require('@controller/users');
const { authorizeUser } = require('@middlewares/Auth');

router.get('/', authorizeUser, UserController.getUser);
router.post('/register', UserController.registerUser);
router.post('/login', UserController.login);
router.put('/logout', authorizeUser, UserController.logout);

module.exports = router;