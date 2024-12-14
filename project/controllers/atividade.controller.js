const Atividade = require('../models/atividade.model');

exports.getAllActivities = (req, res) => {
    Atividade.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching activities' });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.getActivityById = (req, res) => {
    const id = req.params.id;
    Atividade.getById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching activity' });
        } else if (!data) {
            res.status(404).send({ message: `Activity with ID ${id} not found` });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.createActivity = (req, res) => {
    const newActivity = req.body;

    if (!newActivity.id_treino || !newActivity.tipo || !newActivity.descricao) {
        return res.status(400).send({ message: 'Training ID, type, and description are required' });
    }

    Atividade.create(newActivity, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error creating activity' });
        } else {
            res.status(201).json(data);
        }
    });
};

exports.updateActivityById = (req, res) => {
    const id = req.params.id;
    const updatedActivity = req.body;

    Atividade.updateById(id, updatedActivity, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error updating activity' });
        } else {
            res.status(200).send({ message: `Activity with ID ${id} updated successfully` });
        }
    });
};

exports.deleteActivityById = (req, res) => {
    const id = req.params.id;
    Atividade.deleteById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting activity' });
        } else {
            res.status(200).send({ message: `Activity with ID ${id} deleted successfully` });
        }
    });
};

exports.getByTreinoId = (req, res) => {
    const treinoId = req.params.treinoId;

    Atividade.getByTreinoId(treinoId, (err, atividades) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao buscar atividades.', error: err });
        } else {
            res.status(200).json(atividades);
        }
    });
};

exports.getByAlunoId = (req, res) => {
    const idAluno = req.params.id;

    RegistroAtividades.getByAlunoId(idAluno, (err, data) => {
        if (err) {
            console.error('Error fetching activity logs for aluno ID:', err);
            res.status(500).send({
                message: `Erro ao buscar registros de atividades para o aluno com ID ${idAluno}`,
            });
        } else if (!data.length) {
            res.status(404).send({
                message: `Nenhum registro de atividades encontrado para o aluno com ID ${idAluno}`,
            });
        } else {
            res.send(data);
        }
    });
};