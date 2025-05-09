const actions = require('../actions/book.actions');

exports.create = async (req, res, next) => {
  const book = await actions.createBook(req.body);
  res.status(201).json(book);
};

exports.getById = async (req, res, next) => {
  const b = await actions.getBookById(req.params.id);
  res.json(b);
};

exports.getAll = async (req, res, next) => {
  const filters = {
    genre: req.query.genre,
    author: req.query.author,
    publisher: req.query.publisher,
    title: req.query.title,
    fromDate: req.query.fromDate,
    toDate: req.query.toDate,
    available: req.query.available
  };
  const list = await actions.getBooks(filters);
  res.json(list);
};

exports.update = async (req, res, next) => {
  const b = await actions.updateBook(req.params.id, req.body);
  res.json(b);
};

exports.delete = async (req, res, next) => {
  const b = await actions.softDeleteBook(req.params.id);
  res.json(b);
};
