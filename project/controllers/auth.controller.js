const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../config/db.config');

// Secret para geração de tokens JWT
const JWT_SECRET = 'sua_chave_secreta';

exports.login = (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send({ message: 'Email e senha são obrigatórios' });
    }

    const query = 'SELECT * FROM Usuario WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) {
            console.error('Error during login:', err);
            return res.status(500).send({ message: 'Erro interno do servidor' });
        }

        if (results.length === 0) {
            return res.status(404).send({ message: 'Usuário não encontrado' });
        }

        const user = results[0];
        
        if (senha !== user.senha) {
            return res.status(401).send({ message: 'Senha inválida' });
        }

        // Gera o token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, tipo: user.tipo },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login bem-sucedido', token });
    });
};

exports.logout = (req, res) => {
    // Para simular o logout, basta o cliente descartar o token. Aqui, apenas retorna uma mensagem de sucesso.
    res.status(200).send({ message: 'Logout realizado com sucesso' });
};

exports.validateToken = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extrair o token do cabeçalho

    if (!token) {
        return res.status(401).send({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET); // Valida o token
        res.status(200).json(decoded); // Retorna os dados decodificados do token
    } catch (error) {
        console.error('Erro na validação do token:', error);
        res.status(401).send({ message: 'Token inválido' });
    }
};