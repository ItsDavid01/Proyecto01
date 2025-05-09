const express = require('express');
const ctl = require('../controllers/reserva.controllers');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

router.post('/', authenticate, ctl.reserve);
router.get('/me', authenticate, ctl.userHistory);
router.get('/book/:id', authenticate, ctl.bookHistory);

module.exports = router;
