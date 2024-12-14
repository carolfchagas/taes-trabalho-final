const db = require('../config/db.config');

const User = {
    getAll: (result) => {
        db.query('SELECT * FROM Usuario', (err, res) => {
            if (err) {
                console.error('Error fetching users:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },

    getById: (id, result) => {
        db.query('SELECT * FROM Usuario WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.error('Error fetching user by ID:', err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    },

    create: (user, result) => {
        const query = `
            INSERT INTO Usuario (nome, email, senha, tipo, idade, sexo, altura, peso, objetivo, descricao_objetivo)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(query, [
            user.nome,
            user.email,
            user.senha,
            user.tipo,
            user.idade,
            user.sexo,
            user.altura,
            user.peso,
            user.objetivo,
            user.descricao_objetivo,
        ], (err, res) => {
            if (err) {
                console.error('Error creating user:', err);
                result(err, null);
            } else {
                result(null, { id: res.insertId, ...user });
            }
        });
    },

    deleteById: (id, result) => {
        db.query('DELETE FROM Usuario WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.error('Error deleting user:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },

    updateById: (id, updatedData, result) => {
        const query = `
            UPDATE Usuario
            SET nome = ?, email = ?, senha = ?, tipo = ?, idade = ?, sexo = ?, altura = ?, peso = ?, objetivo = ?, descricao_objetivo = ?
            WHERE id = ?`;
        db.query(query, [
            updatedData.nome,
            updatedData.email,
            updatedData.senha,
            updatedData.tipo,
            updatedData.idade,
            updatedData.sexo,
            updatedData.altura,
            updatedData.peso,
            updatedData.objetivo,
            updatedData.descricao_objetivo,
            id,
        ], (err, res) => {
            if (err) {
                console.error('Error updating user:', err);
                result(err, null);
            } else if (res.affectedRows === 0) {
                result(null, null); // Usuário não encontrado
            } else {
                result(null, { id, ...updatedData });
            }
        });
    }
};

module.exports = User;
