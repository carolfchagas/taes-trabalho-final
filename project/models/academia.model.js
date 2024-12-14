const db = require('../config/db.config');

const Academia = {
    getAll: (result) => {
        db.query('SELECT * FROM Academia', (err, res) => {
            if (err) {
                console.error('Error fetching academies:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },

    getById: (id, result) => {
        db.query('SELECT * FROM Academia WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.error('Error fetching academy by ID:', err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    },

    create: (data, result) => {
        const query = `
            INSERT INTO Academia (nome, endereco, cidade, telefone) 
            VALUES (?, ?, ?, ?)`;
        db.query(query, [data.nome, data.endereco, data.cidade, data.telefone], (err, res) => {
            if (err) {
                console.error('Error creating academy:', err);
                result(err, null);
            } else {
                result(null, { id: res.insertId, ...data });
            }
        });
    },

    updateById: (id, data, result) => {
        const query = `
            UPDATE Academia 
            SET nome = ?, endereco = ?, cidade = ?, telefone = ? 
            WHERE id = ?`;
        db.query(query, [data.nome, data.endereco, data.cidade, data.telefone, id], (err, res) => {
            if (err) {
                console.error('Error updating academy:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },

    deleteById: (id, result) => {
        db.query('DELETE FROM Academia WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.error('Error deleting academy:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
};

module.exports = Academia;
