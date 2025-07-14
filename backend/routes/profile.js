import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';

const router = Router();

router.get('/', authMiddleware, (req, res) => {
  // req.user estará disponible si el token es válido
  res.json({ ok: true, user: req.user});
});

export default router;
