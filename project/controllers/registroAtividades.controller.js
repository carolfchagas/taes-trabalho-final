const RegistroAtividades = require('../models/registroAtividades.model');

exports.getAllActivityLogs = (req, res) => {
    RegistroAtividades.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching activity logs' });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.getActivityLogById = (req, res) => {
    const id = req.params.id;
    RegistroAtividades.getById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching activity log' });
        } else if (!data) {
            res.status(404).send({ message: `Activity log with ID ${id} not found` });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.createActivityLog = (req, res) => {
    const newLog = req.body;

    if (!newLog.id_atividade || !newLog.id_aluno || !newLog.data_execucao || !newLog.tempo_realizado) {
        return res.status(400).send({ message: 'Activity ID, student ID, execution date, and time are required' });
    }

    RegistroAtividades.create(newLog, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error creating activity log' });
        } else {
            res.status(201).json(data);
        }
    });
};

exports.deleteActivityLogById = (req, res) => {
    const id = req.params.id;
    RegistroAtividades.deleteById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting activity log' });
        } else {
            res.status(200).send({ message: `Activity log with ID ${id} deleted successfully` });
        }
    });
};

exports.getByAlunoId = (req, res) => {
    const alunoId = req.params.id;

    RegistroAtividades.getByAlunoId(alunoId, (err, registros) => {
        if (err) {
            console.error('Erro ao buscar registros de atividades por aluno:', err);
            return res.status(500).json({ message: 'Erro ao buscar registros de atividades' });
        }

        if (!registros || registros.length === 0) {
            return res.status(404).json({ message: 'Nenhum registro de atividades encontrado para o aluno' });
        }

        res.status(200).json(registros);
    });
};
