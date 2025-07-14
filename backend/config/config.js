import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGODB_URI;

console.log('Conectando a MongoDB en:', uri);

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Conexión exitosa a MongoDB');
    console.log('Base de datos actual:', mongoose.connection.name);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error.message);
  }
};

export default connectDB;