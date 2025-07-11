import { Router } from "express";
import bcrypt from "bcrypt"; //paquete para hashear contraseña, verificación y generar el sal
import jwt from 'jsonwebtoken'; //importar jwt
import User from "../models/user.js";

const app = Router();

app.post('/login', (req, res) => {
    let body = req.body;

    User.findOne({ email: bodyParser.email}, (error, userDb => {
        if(error){
            return res.status(500).json({
                ok: false,
                error: error
            })
        }

        //verifica si el usuario o contraseña existe
        if(!userDb){
            return res.status(400).json({
                ok: false,
                error:{
                    message: 'Incorrect email or password'
                }
            })
        }

        //valida si la contaseña coincide con base de datos
        if(!bcrypt.compareSync(body.password, userDb.password)){
            return res.status(400).json({
                ok: false,
                error:{
                    message: 'Incorrect email or password'
                }
            })
        }

        //genera el token de autenticación
        let token = jwt.sing({
            user: userDb,
        }, process.env.SEED_AUTENTICACION,{
            expireIn: process.env.TOKEN_EXPIRATION
        })

        res.json({
            ok: true,
            user: userDb,
            token
        })
    }))
});

export default app;
