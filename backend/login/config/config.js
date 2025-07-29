import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const {
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
  MONGODB_DB,
  MONGODB_CLUSTER_ATLAS
} = process.env;

const uri = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}` +
            `@cluster0.b6xpoeg.mongodb.net/${MONGODB_DB}` +
            `?${MONGODB_CLUSTER_ATLAS}`;

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