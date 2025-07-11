import { Router } from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validación básica
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    // Verifica si el email ya está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Ese email ya está registrado.' });
    }

    // Hashea la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crea el usuario
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'User'
    });

    // Guarda el usuario
    await user.save();

    // Devuelve el usuario sin la contraseña
    const userToReturn = user.toObject();
    delete userToReturn.password;

    res.status(201).json(userToReturn);
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario.' });
  }
});

export default router;