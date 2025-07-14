import { Router } from "express";
import bcrypt from "bcrypt"; //paquete para hashear contraseña, verificación y generar el sal
import jwt from 'jsonwebtoken'; //importar jwt
import User from "../models/user.js";

const app = Router();

app.post('/', async (req, res) => {
    let body = req.body;

    try {
        const userDb = await User.findOne({ email: body.email });

        if (!userDb) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Incorrect email or password'
                }
            });
        }

        //valida si la contaseña coincide con base de datos
        if (!bcrypt.compareSync(body.password, userDb.password)) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'Incorrect email or password'
                }
            });
        }

        //genera el token de autenticación
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
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error: error.message
        });
    }
});

export default app;
