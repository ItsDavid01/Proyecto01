const express = require('express');
const ctl = require('../controllers/user.controllers');
const { authenticate, authorize } = require('../middleware/auth');
const router = express.Router();

router.post('/register', ctl.register);
router.post('/login', ctl.login);

router.put('/:id', authenticate, authorize('updateSelf', 'updateUser'), ctl.update);
router.delete('/:id', authenticate, authorize('deleteSelf', 'deleteUser'), ctl.delete);

module.exports = router;
