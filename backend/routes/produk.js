const router = require('express').Router();
const ctrl   = require('../controllers/produkController');
const { verifyToken, isAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/',       verifyToken,                              ctrl.getAll);
router.get('/:id',    verifyToken,                              ctrl.getById);
router.post('/',      verifyToken, isAdmin, upload.single('gambar'), ctrl.create);
router.put('/:id',    verifyToken, isAdmin, upload.single('gambar'), ctrl.update);
router.delete('/:id', verifyToken, isAdmin,                    ctrl.remove);

module.exports = router;
