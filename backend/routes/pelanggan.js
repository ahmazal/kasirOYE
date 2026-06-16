const router = require('express').Router();
const ctrl   = require('../controllers/pelangganController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, ctrl.getAll);
router.get('/:id', verifyToken, ctrl.getById);
router.post('/', verifyToken, ctrl.create);
router.put('/:id', verifyToken, ctrl.update);
router.delete('/:id', verifyToken, ctrl.remove);

module.exports = router;
