const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('./db'); // O arquivo de conexão com o banco de dados

const router = express.Router();

// Rota de Cadastro
router.post('/api/register', async (req, res) => {
  const { phone, password, fullName, address } = req.body;
  const fullAddress = `${address.street}, ${address.number}, ${address.neighborhood}, ${address.complement}`;

  console.log('Dados recebidos no registro:', { phone, password, fullName, address });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir dados do usuário no banco de dados
    await db.query(
      `INSERT INTO users (phone, password, fullName, address) VALUES (?, ?, ?, ?)`,
      [phone, hashedPassword, fullName, fullAddress]
    );

    res.status(201).json({ success: true, message: 'Usuário cadastrado com sucesso!', fullName });
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

    if (!user || user.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Login bem-sucedido!', 
      fullName: user[0].fullName 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});

module.exports = router;
