import { Router } from "express";
import logingRoute from './login.js';
import registerRoute from './register.js';
import profileRoute from './profile.js';

const router = Router();

router.use('/register', registerRoute);
router.use('/login', logingRoute);
router.use('/profile', profileRoute);

export default router;