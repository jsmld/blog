const mongoose = require('mongoose');

// This stops my request to the db timing out
// mongoose.set('bufferTimeoutMS', 20000);

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`DB connected: ${conn.connection.host}`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB;
