const router = require('express').Router();
const ctrl   = require('../controllers/transaksiController');
const { verifyToken, isAdmin } = require('../middleware/auth');

router.get('/', verifyToken, ctrl.getAll);
router.get('/:id', verifyToken, ctrl.getById);
router.post('/', verifyToken, ctrl.create);
router.delete('/:id', verifyToken, isAdmin,  ctrl.remove);

module.exports = router;
