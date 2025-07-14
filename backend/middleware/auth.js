import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).json({ ok: false, error: 'No token provided' });
    }
  
    const token = authHeader.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, process.env.SEED_AUTENTICACION);
      req.user = decoded.user; // o como guardes el usuario en el token
      next();
    } catch (err) {
      return res.status(401).json({ ok: false, error: err.message });
    }
}

export default authMiddleware;