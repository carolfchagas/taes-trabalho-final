const db = require('../config/db.config');

const RegistroAtividades = {
    getAll: (result) => {
        const query = `
            SELECT 
                RegistroAtividades.id, RegistroAtividades.id_aluno, RegistroAtividades.data_execucao, 
                RegistroAtividades.tempo_realizado, Usuario.nome AS aluno_nome, 
                Atividade.descricao AS atividade_descricao
            FROM RegistroAtividades
            JOIN Usuario ON RegistroAtividades.id_aluno = Usuario.id
            JOIN Atividade ON RegistroAtividades.id_atividade = Atividade.id
        `;
        db.query(query, (err, res) => {
            if (err) {
                console.error('Error fetching activity logs:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },

    getById: (id, result) => {
        const query = `
            SELECT 
                RegistroAtividades.id, RegistroAtividades.id_aluno, RegistroAtividades.data_execucao, 
                RegistroAtividades.tempo_realizado, Usuario.nome AS aluno_nome, 
                Atividade.descricao AS atividade_descricao
            FROM RegistroAtividades
            JOIN Usuario ON RegistroAtividades.id_aluno = Usuario.id
            JOIN Atividade ON RegistroAtividades.id_atividade = Atividade.id
            WHERE RegistroAtividades.id = ?
        `;
        db.query(query, [id], (err, res) => {
            if (err) {
                console.error('Error fetching activity log by ID:', err);
                result(err, null);
            } else {
                result(null, res[0]);
            }
        });
    },

    create: (data, result) => {
        const query = `
            INSERT INTO RegistroAtividades (id_atividade, id_aluno, data_execucao, tempo_realizado)
            VALUES (?, ?, ?, ?)
        `;
        db.query(
            query,
            [data.id_atividade, data.id_aluno, data.data_execucao, data.tempo_realizado],
            (err, res) => {
                if (err) {
                    console.error('Error creating activity log:', err);
                    result(err, null);
                } else {
                    result(null, { id: res.insertId, ...data });
                }
            }
        );
    },

    deleteById: (id, result) => {
        db.query('DELETE FROM RegistroAtividades WHERE id = ?', [id], (err, res) => {
            if (err) {
                console.error('Error deleting activity log:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    },

    getByAlunoId: (idAluno, result) => {
        const query = `
            SELECT 
                RegistroAtividades.id, RegistroAtividades.id_aluno, RegistroAtividades.data_execucao, 
                RegistroAtividades.tempo_realizado, Usuario.nome AS aluno_nome, 
                Atividade.descricao AS atividade_descricao
            FROM RegistroAtividades
            JOIN Usuario ON RegistroAtividades.id_aluno = Usuario.id
            JOIN Atividade ON RegistroAtividades.id_atividade = Atividade.id
            WHERE RegistroAtividades.id_aluno = ?
        `;
        db.query(query, [idAluno], (err, res) => {
            if (err) {
                console.error('Error fetching activity logs by aluno ID:', err);
                result(err, null);
            } else {
                result(null, res);
            }
        });
    }    
};

module.exports = RegistroAtividades;
