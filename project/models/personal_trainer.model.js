const db = require('../config/db.config');

const PersonalTrainer = {
    getAll: (result) => {
        const query = `
            SELECT Usuario.id, Usuario.nome, Usuario.email, PersonalTrainer.cref, PersonalTrainer.especialidade 
            FROM PersonalTrainer 
            INNER JOIN Usuario ON PersonalTrainer.id_usuario = Usuario.id
        `;
        db.query(query, (err, res) => {
            if (err) {
                console.error('Error fetching personal trainers:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },

    getById: (id, result) => {
        const query = `
            SELECT Usuario.id, Usuario.nome, Usuario.email, PersonalTrainer.cref, PersonalTrainer.especialidade 
            FROM PersonalTrainer 
            INNER JOIN Usuario ON PersonalTrainer.id_usuario = Usuario.id 
            WHERE PersonalTrainer.id_usuario = ?
        `;
        db.query(query, [id], (err, res) => {
            if (err) {
                console.error('Error fetching personal trainer by ID:', err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    },

    create: (data, result) => {
        const query = `
            INSERT INTO PersonalTrainer (id_usuario, cref, especialidade) 
            VALUES (?, ?, ?)
        `;
        db.query(query, [data.id_usuario, data.cref, data.especialidade], (err, res) => {
            if (err) {
                console.error('Error creating personal trainer:', err);
                result(err, null);
            } else {
                result(null, { id_usuario: data.id_usuario, ...data });
            }
        });
    },

    deleteById: (id, result) => {
        const query = `DELETE FROM PersonalTrainer WHERE id_usuario = ?`;
        db.query(query, [id], (err, res) => {
            if (err) {
                console.error('Error deleting personal trainer:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
};

module.exports = PersonalTrainer;
