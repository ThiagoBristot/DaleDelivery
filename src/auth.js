const express = require('express');
const bcrypt = require('bcrypt');
const db = require('./db'); // O arquivo de conexão com o banco de dados

const router = express.Router();

// Rota de Cadastro
router.post('/api/register', async (req, res) => {
  const { phone, password, fullName, address } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const { street, number, neighborhood, complement } = address;

    // Inserir dados do usuário no banco de dados
    const result = await db.query(
      `INSERT INTO users (phone, password, fullName, street, number, neighborhood, complement) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [phone, hashedPassword, fullName, street, number, neighborhood, complement]
    );

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});

// Rota de Login
router.post('/api/login', async (req, res) => {
  const { phone, password } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE phone = ?', [phone]);

    if (!user.length) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Aqui você pode criar um token JWT se necessário
    // const token = jwt.sign({ userId: user[0].id }, 'seuSegredo', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login bem-sucedido!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

module.exports = router;
