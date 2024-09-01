import express from 'express';
import { userLogin, userRegister, userResetPassword, userReqPassword } from '../controllers/User.controllers.js';

const userRouter = express.Router();

// routes
userRouter.post('/login', userLogin);
userRouter.post('/register', userRegister);
userRouter.post('/reset-password', userReqPassword);
userRouter.post('/reset-password/:userId/:token', userResetPassword);

export default userRouter;