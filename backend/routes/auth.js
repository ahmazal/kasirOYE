const router = require('express').Router();
const { login, register, me } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.post('/login', login);
router.post('/register', verifyToken, isAdmin, register); // hanya admin
router.get('/me', verifyToken, me);

module.exports = router;
