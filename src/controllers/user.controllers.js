const actions = require('../actions/user.actions');

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, perms = [] } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Hacen falta datos' });
    }
    const u = await actions.registerUser({ name, email, password, perms });
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
  const response = await actions.getUserById(req.user._id);
  const { password: _, ...out } = response.toObject();
  res.json(out);
};

exports.update = async (req, res, next) => {
  const response = await actions.updateUser(req.params.id, req.body);
  const { password: _, ...out } = response.toObject();
  res.json(out);
};

exports.delete = async (req, res, next) => {
  const response = await actions.softDeleteUser(req.params.id);
  const { password: _, ...out } = response.toObject();
  res.json(out);
};
