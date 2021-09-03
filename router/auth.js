import express from 'express';
import * as authController from '../controller/auth.js';
import { isAuth } from '../middleware/isAuth.js';
const authRouter = express.Router();

//POST /signup
authRouter.post('/signup', authController.signup);
//POST /login
authRouter.post('/login', authController.login);
//GET /me
authRouter.get('/me', isAuth, authController.login);

export default authRouter;
