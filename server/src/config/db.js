const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log('DB connected');
  } catch (error) {
    console.error('DB connection failed:', error.message);
  }
};

module.exports = connectDB;