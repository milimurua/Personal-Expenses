import connectDB from './config/config.js';  
import passport from './config/passport.js'; 
import routesIndex from './routes/index.js'; 

import express from 'express';
const app = express();

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
import bodyParser from 'body-parser';

app.use(passport.initialize());

/**
* Middleware que parsea los datos que recibimos a través del 
* protocolo http(body-parse)
*/
app.use(bodyParser.json());
app.use('/', routesIndex); //configuración de las rutas

connectDB();

app.get('/', (_req, res) => {
    res.json({message: "Welcome to the app"});
});

// Health check endpoint for Docker
app.get('/health', (_req, res) => {
    res.status(200).json({status: 'OK', message: 'Server is running'});
});

app.listen(PORT, () => {
    console.log(`Listen to the port ${PORT}`);
});