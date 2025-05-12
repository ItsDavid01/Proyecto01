// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'sin token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (!user || !user.isActive) return res.status(401).json({ message: 'token invalido' });
    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

exports.authorize = (...reqPerms) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Sin autenticar' });
  }

  const userPerms = req.user.perms;
  const selfId = req.user._id.toString();
  const targetId = req.params.id;

  for (const perm of reqPerms) {
    if (perm.endsWith('Self')) {
      if (userPerms.includes(perm) && targetId === selfId) {
        return next();
      }
    } else {
      if (userPerms.includes(perm)) {
        return next();
      }
    }
  }

  return res.status(403).json({ message: 'No tienes permiso para hacer eso' })
};
