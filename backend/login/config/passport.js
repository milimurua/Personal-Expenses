/**
 * Passport-jwt: se encarga de: extraer el token, verificar fimar y expiración, buscar el usurio 
 * y manejar errores si el token es inválido o expiró
 */

import { ExtractJwt, Strategy } from "passport-jwt";
import passport from "passport";
import User from '../models/user.js';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SEED_AUTENTICACION
};

passport.use(new Strategy(opts, async (jwt_payload, done) => {
    try {
      console.log('Passport: payload recibido:', jwt_payload);
      const user = await User.findById(jwt_payload.id);
      if (user) {
        console.log('Passport: usuario encontrado');
        return done(null, user);
      } else {
        console.log('Passport: usuario no encontrado');
        return done(null, false);
      }
    } catch (err) {
      console.log('Passport: error en la estrategia', err);
      return done(err, false);
    }
  }));

export default passport;