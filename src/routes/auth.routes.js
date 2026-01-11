import express from 'express';
import { AuthController } from '../controllers/auth.controller.js';
import { authorize } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/profile/:id', AuthController.profile);

export default router;