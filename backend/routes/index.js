import { Router } from "express";
import logingRoute from './login.js';
import registerRoute from './register.js';

const router = Router();

router.use('/register', registerRoute);
router.use('/login', logingRoute);

export default router;