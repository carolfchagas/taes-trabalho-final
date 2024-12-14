const db = require('../config/db.config');

const Mensagem = {
    getAll: (result) => {
        const query = `
            SELECT 
                Mensagem.id, Mensagem.assunto, Mensagem.conteudo, Mensagem.data_envio,
                remetente.nome AS remetente_nome, destinatario.nome AS destinatario_nome
            FROM Mensagem
            JOIN Usuario AS remetente ON Mensagem.id_remetente = remetente.id
            JOIN Usuario AS destinatario ON Mensagem.id_destinatario = destinatario.id
        `;
        db.query(query, (err, res) => {
            if (err) {
                console.error('Error fetching messages:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },

    getById: (id, result) => {
        const query = `
            SELECT 
                Mensagem.id, Mensagem.assunto, Mensagem.conteudo, Mensagem.data_envio,
                remetente.nome AS remetente_nome, destinatario.nome AS destinatario_nome
            FROM Mensagem
            JOIN Usuario AS remetente ON Mensagem.id_remetente = remetente.id
            JOIN Usuario AS destinatario ON Mensagem.id_destinatario = destinatario.id
            WHERE Mensagem.id = ?
        `;
        db.query(query, [id], (err, res) => {
            if (err) {
                console.error('Error fetching message by ID:', err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    },

    create: (data, result) => {
        const query = `
            INSERT INTO Mensagem (id_remetente, id_destinatario, assunto, conteudo, data_envio)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.query(
            query,
            [data.id_remetente, data.id_destinatario, data.assunto, data.conteudo, data.data_envio],
            (err, res) => {
                if (err) {
                    console.error('Error creating message:', err);
                    result(err, null);
                } else {
                    result(null, { id: res.insertId, ...data });
                }
            }
        );
    },

    deleteById: (id, result) => {
        db.query('DELETE FROM Mensagem WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.error('Error deleting message:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
};

module.exports = Mensagem;
