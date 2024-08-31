import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/Database.js';
import userRouter from './routes/User.route.js';
import courseRouter from './routes/Course.route.js';
import projectRouter from './routes/Project.route.js';

dotenv.config();

const app = express();
app.use(express.json());

// routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/projects', projectRouter);

// connect to MongoDB database
connectDB();

// server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Starting in the ${PORT}`);
});