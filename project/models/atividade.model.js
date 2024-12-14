const db = require('../config/db.config');

const Atividade = {
    getAll: (result) => {
        const query = `
            SELECT 
                Atividade.id, Atividade.id_treino, Atividade.tipo, Atividade.descricao, 
                Atividade.series, Atividade.repeticoes, Atividade.tempo, Atividade.intensidade, 
                Atividade.observacoes, Treino.nome AS treino_nome
            FROM Atividade
            JOIN Treino ON Atividade.id_treino = Treino.id
        `;
        db.query(query, (err, res) => {
            if (err) {
                console.error('Error fetching activities:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },

    getById: (id, result) => {
        const query = `
            SELECT 
                Atividade.id, Atividade.id_treino, Atividade.tipo, Atividade.descricao, 
                Atividade.series, Atividade.repeticoes, Atividade.tempo, Atividade.intensidade, 
                Atividade.observacoes, Treino.nome AS treino_nome
            FROM Atividade
            JOIN Treino ON Atividade.id_treino = Treino.id
            WHERE Atividade.id = ?
        `;
        db.query(query, [id], (err, res) => {
            if (err) {
                console.error('Error fetching activity by ID:', err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    },

    create: (data, result) => {
        const query = `
            INSERT INTO Atividade (id_treino, tipo, descricao, series, repeticoes, tempo, intensidade, observacoes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.query(
            query,
            [
                data.id_treino,
                data.tipo,
                data.descricao,
                data.series || null,
                data.repeticoes || null,
                data.tempo || null,
                data.intensidade || null,
                data.observacoes || null
            ],
            (err, res) => {
                if (err) {
                    console.error('Error creating activity:', err);
                    result(err, null);
                } else {
                    result(null, { id: res.insertId, ...data });
                }
            }
        );
    },

    updateById: (id, data, result) => {
        const query = `
            UPDATE Atividade
            SET tipo = ?, descricao = ?, series = ?, repeticoes = ?, tempo = ?, intensidade = ?, observacoes = ?
            WHERE id = ?
        `;
        db.query(
            query,
            [
                data.tipo,
                data.descricao,
                data.series || null,
                data.repeticoes || null,
                data.tempo || null,
                data.intensidade || null,
                data.observacoes || null,
                id
            ],
            (err, res) => {
                if (err) {
                    console.error('Error updating activity:', err);
                    result(err, null);
                } else {
                    result(null, res);
                }
            }
        );
    },

    deleteById: (id, result) => {
        db.query('DELETE FROM Atividade WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.error('Error deleting activity:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },

    getByTreinoId: (treinoId, result) => {
        const query = `
            SELECT 
                Atividade.id, Atividade.id_treino, Atividade.tipo, Atividade.descricao, 
                Atividade.series, Atividade.repeticoes, Atividade.tempo, Atividade.intensidade, 
                Atividade.observacoes, Treino.nome AS treino_nome
            FROM Atividade
            JOIN Treino ON Atividade.id_treino = Treino.id
            WHERE Atividade.id_treino = ?
        `;
    
        db.query(query, [treinoId], (err, res) => {
            if (err) {
                console.error('Erro ao buscar atividades pelo ID do treino:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },
    
    
};

module.exports = Atividade;
