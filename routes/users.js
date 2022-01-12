const router = require('express').Router();
const {
  getUserById, updateUserInfo,
} = require('../controllers/users');
const { validateUserPatch } = require('../middlewares/validations');

router.get('/me', getUserById);
router.patch('/me', validateUserPatch, updateUserInfo);

module.exports = router;
