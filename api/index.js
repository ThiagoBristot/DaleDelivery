import express from 'express';
import userRoutes from './userRoutes';

const app = express();
app.use(express.json());

// Use as rotas de usuário
app.use('/api', userRoutes);

export default app;
