import { Router } from "express";
import logingRoute from './login.js';
import registerRoute from './register.js';

const router = Router();

router.use('./login', logingRoute);
router.use('./register', registerRoute);

export default router;