import connectDB from './config/config.js';   
//import route from './routes/index.js'; 
import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT;
import bodyParser from 'body-parser';

/**
* Middleware que parsea los datos que recibimos a través del 
* protocolo http(body-parse)
*/
app.use(bodyParser.json());
//app.use(route) //configuración de las rutas

connectDB();

app.get('/', (_req, res) => {
    res.json({message: "Welcome to the app"})
});

app.listen(PORT, () => {
    console.log(`Listen to the port ${PORT}`);
});

