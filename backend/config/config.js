import mongoose from 'mongoose';

//conexión a la base de datos
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to mongodb:', error.message);
    process.exit(1);
  }
};

export default connectDB;