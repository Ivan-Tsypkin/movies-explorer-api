const router = require('express').Router();
const { loginUser } = require('../controllers/users');
const { validateSignin } = require('../middlewares/validations');

router.post('/', validateSignin, loginUser);

module.exports = router;
