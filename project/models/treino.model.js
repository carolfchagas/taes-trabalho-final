const db = require('../config/db.config');

const Treino = {
    getAll: (result) => {
        const query = `
            SELECT 
                Treino.id, Treino.nome, Treino.data_inicio, Treino.data_fim, Treino.objetivo,
                Treino.id_aluno, Treino.id_personal_trainer,  -- Adicionando os IDs
                aluno.nome AS aluno_nome, personal.nome AS personal_nome
            FROM Treino
            JOIN Usuario AS aluno ON Treino.id_aluno = aluno.id
            JOIN Usuario AS personal ON Treino.id_personal_trainer = personal.id
        `;
        db.query(query, (err, res) => {
            if (err) {
                console.error('Error fetching workouts:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },

    getById: (id, result) => {
        const query = `
            SELECT 
                Treino.id, Treino.nome, Treino.data_inicio, Treino.data_fim, Treino.objetivo,
                Treino.id_aluno, Treino.id_personal_trainer,  -- Adicionando os IDs
                aluno.nome AS aluno_nome, personal.nome AS personal_nome
            FROM Treino
            JOIN Usuario AS aluno ON Treino.id_aluno = aluno.id
            JOIN Usuario AS personal ON Treino.id_personal_trainer = personal.id
            WHERE Treino.id = ?
        `;
        db.query(query, [id], (err, res) => {
            if (err) {
                console.error('Error fetching workout by ID:', err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    },
    

    create: (data, result) => {
        const query = `
            INSERT INTO Treino (id_aluno, id_personal_trainer, nome, data_inicio, data_fim, objetivo)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        db.query(
            query,
            [
                data.id_aluno,
                data.id_personal_trainer,
                data.nome,
                data.data_inicio,
                data.data_fim,
                data.objetivo
            ],
            (err, res) => {
                if (err) {
                    console.error('Error creating workout:', err);
                    result(err, null);
                } else {
                    result(null, { id: res.insertId, ...data });
                }
            }
        );
    },

    updateById: (id, data, result) => {
        const query = `
            UPDATE Treino
            SET nome = ?, data_inicio = ?, data_fim = ?, objetivo = ?
            WHERE id = ?
        `;
        db.query(
            query,
            [data.nome, data.data_inicio, data.data_fim, data.objetivo, id],
            (err, res) => {
                if (err) {
                    console.error('Error updating workout:', err);
                    result(err, null);
                } else {
                    result(null, res);
                }
            }
        );
    },

    deleteById: (id, result) => {
        db.query('DELETE FROM Treino WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.error('Error deleting workout:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },

    getByAlunoId: (alunoId, result) => {
        const query = `
            SELECT 
                Treino.id, Treino.nome, Treino.data_inicio, Treino.data_fim, Treino.objetivo,
                aluno.nome AS aluno_nome, personal.nome AS personal_nome
            FROM Treino
            JOIN Usuario AS aluno ON Treino.id_aluno = aluno.id
            JOIN Usuario AS personal ON Treino.id_personal_trainer = personal.id
            WHERE Treino.id_aluno = ?
        `;

        db.query(query, [alunoId], (err, res) => {
            if (err) {
                console.error('Erro ao buscar treinos do aluno:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }
};

module.exports = Treino;
