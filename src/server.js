
const express = require('express');
const dotenv = require('dotenv');
const connect = require('./config/db');

const userRoutes = require('./routes/user.routes');
const bookRoutes = require('./routes/book.routes');
const reservaRoutes = require('./routes/reserva.routes');

dotenv.config();
connect();

const app = express();
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reservas', reservaRoutes);

app.use((err, _, res, __) => {
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(process.env.PORT, () => console.log('Escuchando en el puerto 5000'));
