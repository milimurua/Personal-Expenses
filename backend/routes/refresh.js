import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const app = Router();


app.post('/', async(req, res) => {
    const { refreshToken } = req.body;
    if(!refreshToken) {
        return res.status(401).json({error: 'No token'});
    }

    try{
        //Verifica firma y expiración
        const payload = jwt.verify(refreshToken, process.env.SEED_REFRESH);

        //Busca al usuario y verifica que el refreshToken coincida
        const userDb = await User.findById(payload.id);
        if (!userDb || userDb.refreshToken !== refreshToken) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        //Genera un nuevo token
        let token = jwt.sign(
            { user: userDb },
            process.env.SEED_AUTENTICACION,
            { expiresIn: process.env.TOKEN_EXPIRATION }
        );

        res.json({
            ok: true,
            user: userDb,
            token
        });
    }catch(error){

    }
});

export default app;