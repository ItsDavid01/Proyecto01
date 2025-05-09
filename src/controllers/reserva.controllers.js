const actions = require('../actions/reserva.actions');

exports.reserve = async (req, res, next) => {
    const r = await actions.reserveBook({
        userId: req.user._id,
        bookId: req.body.bookId,
        dueAt: req.body.dueAt
    });
    res.status(201).json(r);
};

exports.userHistory = async (req, res, next) => {
    const hist = await actions.getUserReservations(req.user._id);
    res.json(hist);
};

exports.bookHistory = async (req, res, next) => {
    const hist = await actions.getBookReservations(req.params.id);
    res.json(hist);
};
