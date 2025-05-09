const Reservation = require('../models/reserva.model');

exports.reserveBook = async ({ userId, bookId, dueAt }) => {
  return await new Reservation({ user: userId, book: bookId, dueAt }).save();
};

exports.getUserReservations = async (userId) => {
  return await Reservation.find({ user: userId }).populate('book');
};

exports.getBookReservations = async (bookId) => {
  return await Reservation.find({ book: bookId }).populate('user');
};
