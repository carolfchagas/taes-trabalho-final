const db = require('../config/db.config');

const Pagamento = {
    getAll: (result) => {
        const query = `
            SELECT 
                Pagamento.id, Pagamento.modalidade, Pagamento.valor, Pagamento.id_transacao_paypal, Pagamento.data_pagamento,
                aluno.nome AS aluno_nome, personal.nome AS personal_nome
            FROM Pagamento
            JOIN Usuario AS aluno ON Pagamento.id_aluno = aluno.id
            JOIN Usuario AS personal ON Pagamento.id_personal_trainer = personal.id
        `;
        db.query(query, (err, res) => {
            if (err) {
                console.error('Error fetching payments:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },

    getById: (id, result) => {
        const query = `
            SELECT 
                Pagamento.id, Pagamento.modalidade, Pagamento.valor, Pagamento.id_transacao_paypal, Pagamento.data_pagamento,
                aluno.nome AS aluno_nome, personal.nome AS personal_nome
            FROM Pagamento
            JOIN Usuario AS aluno ON Pagamento.id_aluno = aluno.id
            JOIN Usuario AS personal ON Pagamento.id_personal_trainer = personal.id
            WHERE Pagamento.id = ?
        `;
        db.query(query, [id], (err, res) => {
            if (err) {
                console.error('Error fetching payment by ID:', err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    },

    create: (data, result) => {
        const query = `
            INSERT INTO Pagamento (id_aluno, id_personal_trainer, modalidade, valor, id_transacao_paypal, data_pagamento)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(
            query,
            [
                data.id_aluno,
                data.id_personal_trainer,
                data.modalidade,
                data.valor,
                data.id_transacao_paypal,
                data.data_pagamento
            ],
            (err, res) => {
                if (err) {
                    console.error('Error creating payment:', err);
                    result(err, null);
                } else {
                    result(null, { id: res.insertId, ...data });
                }
            }
        );
    },

    deleteById: (id, result) => {
        db.query('DELETE FROM Pagamento WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.error('Error deleting payment:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
};

module.exports = Pagamento;
