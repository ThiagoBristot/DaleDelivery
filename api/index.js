import express from 'express';
import userRoutes from './userRoutes';
import path from 'path';

const app = express();
app.use(express.json());

// Use as rotas de usuário
app.use('/api', userRoutes);

// Serve arquivos estáticos do diretório build
app.use(express.static(path.join(__dirname, '../build')));

// Rota para servir o arquivo HTML principal
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

export default app;
