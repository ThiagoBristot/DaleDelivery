const express = require('express');
const cors = require('cors');
const db = require('./db'); // O arquivo de conexão com o banco de dados
const userRoutes = require('./api/userRoutes'); // Importa as rotas de usuário

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Usa as rotas de usuário
app.use(userRoutes);

// Inicie o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
