const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado con mongoDB');
  } catch (error) {
    console.error('Error conectando a mongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;