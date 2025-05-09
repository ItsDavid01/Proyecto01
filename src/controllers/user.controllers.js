const actions = require('../actions/user.actions');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Hacen falta datos' });
    }
    const u = await actions.registerUser({ name, email, password, role });
    const { password: _, ...out } = u.toObject();
    res.status(201).json(out);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Hacen falta datos' });
    }
    const { user, token } = await actions.loginUser({ email, password });
    const { password: _, ...out } = user.toObject();
    res.json({ user: out, token });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  const u = await actions.getUserById(req.user._id);
  res.json(u);
};

exports.update = async (req, res, next) => {
  const targetId = req.params.id;
  if (req.user._id.toString() !== targetId && req.user.role !== 'admin')
    return res.status(403).json({ message: 'No tiene permiso para hacer eso' });
  const u = await actions.updateUser(targetId, req.body);
  res.json(u);
};

exports.delete = async (req, res, next) => {
  const targetId = req.params.id;
  if (req.user._id.toString() !== targetId && req.user.role !== 'admin')
    return res.status(403).json({ message: 'No tiene permiso para hacer eso' });
  const u = await actions.softDeleteUser(targetId);
  res.json(u);
};
