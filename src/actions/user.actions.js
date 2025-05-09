const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const PEPPER = process.env.PEPPER;

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.registerUser = async ({ name, email, password, role }) => {
  if (await User.findOne({ email })) {
    const err = new Error('El email ya fue registrado'); err.status = 400; throw err;
  }
  const salt = await bcrypt.genSalt(10);
  const pwdPeppered = password + PEPPER;
  const hash = await bcrypt.hash(pwdPeppered, salt);
  return await new User({ name, email, password: hash, role }).save();
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email, isActive: true });
  const pwdPeppered = password + PEPPER;
  if (!user || !await bcrypt.compare(pwdPeppered, user.password)) {
    const err = new Error('Email o contraseña invalidos'); err.status = 401; throw err;
  }
  const token = jwt.sign({ sub: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return { user, token };
};

exports.getUserById = async (id) => {
  return await User.findOne({ _id: id, isActive: true });
};

exports.updateUser = async (id, data) => {
  return await User.findOneAndUpdate({ _id: id, isActive: true }, data, { new: true });
};

exports.softDeleteUser = async (id) => {
  return await User.findByIdAndUpdate(id, { isActive: false }, { new: true });
};

