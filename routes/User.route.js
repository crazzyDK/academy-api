import express from 'express';
import { userLogin, userRegister } from '../controllers/User.controllers.js';

const userRouter = express.Router();

// routes
userRouter.post('/login', userLogin);
userRouter.post('/register', userRegister);

export default userRouter;