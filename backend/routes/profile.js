import { Router } from 'express';
import passport from '../config/passport.js';

const router = Router();

router.get(
  '/',
  (req, res, next) => { console.log('Llega a /profile'); next(); },
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('Autenticado, req.user:', req.user);
    res.json({ ok: true, user: req.user });
  }
);

export default router;
