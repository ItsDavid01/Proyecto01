const express = require('express');
const ctl = require('../controllers/book.controllers');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();


router.get('/', ctl.getAll);
router.get('/:id', ctl.getById);

router.post('/', authenticate, authorize('createBook'), ctl.create);
router.put('/:id', authenticate, authorize('updateBook'), ctl.update);
router.delete('/:id', authenticate, authorize('deleteBook'), ctl.delete);

module.exports = router;
