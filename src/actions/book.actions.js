const Book = require('../models/book.model');

exports.createBook = async (data) => {
  return await new Book(data).save();
};

exports.getBookById = async (id) => {
  return await Book.findOne({ _id: id, isActive: true });
};

exports.getBooks = async (filters = {}) => {
  const q = { isActive: true };
  if (filters.genre) q.genre = filters.genre;
  if (filters.author) q.author = filters.author;
  if (filters.publisher) q.publisher = filters.publisher;
  if (filters.title) q.title = new RegExp(filters.title, 'i');
  if (filters.fromDate) q.publishedDate = { $gte: filters.fromDate };
  if (filters.toDate) q.publishedDate = { ...q.publishedDate, $lte: filters.toDate };
  if (filters.available != null) q.available = filters.available;
  return await Book.find(q);
};

exports.updateBook = async (id, data) => {
  return await Book.findOneAndUpdate({ _id: id, isActive: true }, data, { new: true });
};

exports.softDeleteBook = async (id) => {
  return await Book.findByIdAndUpdate(id, { isActive: false }, { new: true });
};
