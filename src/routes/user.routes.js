const express = require('express');
const ctl = require('../controllers/user.controllers');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.post('/register', ctl.register);
router.post('/login', ctl.login);

router.get('/me', authenticate, ctl.getMe);
router.put('/:id', authenticate, ctl.update);
router.delete('/:id', authenticate, ctl.delete);

module.exports = router;
