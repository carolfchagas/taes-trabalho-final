const Treino = require('../models/treino.model');

exports.getAllWorkouts = (req, res) => {
    Treino.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching workouts' });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.getWorkoutById = (req, res) => {
    const id = req.params.id;
    Treino.getById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching workout' });
        } else if (!data) {
            res.status(404).send({ message: `Workout with ID ${id} not found` });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.createWorkout = (req, res) => {
    const newWorkout = req.body;

    if (!newWorkout.id_aluno || !newWorkout.id_personal_trainer || !newWorkout.nome || !newWorkout.data_inicio || !newWorkout.data_fim || !newWorkout.objetivo) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    Treino.create(newWorkout, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error creating workout' });
        } else {
            res.status(201).json(data);
        }
    });
};

exports.updateWorkoutById = (req, res) => {
    const id = req.params.id;
    const updatedWorkout = req.body;

    Treino.updateById(id, updatedWorkout, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error updating workout' });
        } else {
            res.status(200).send({ message: `Workout with ID ${id} updated successfully` });
        }
    });
};

exports.deleteWorkoutById = (req, res) => {
    const id = req.params.id;
    Treino.deleteById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting workout' });
        } else {
            res.status(200).send({ message: `Workout with ID ${id} deleted successfully` });
        }
    });
};

exports.getWorkoutsByAlunoId = (req, res) => {
    const alunoId = req.params.id_aluno;

    Treino.getByAlunoId(alunoId, (err, treinos) => {
        if (err) {
            res.status(500).json({ message: 'Erro ao buscar treinos do aluno', error: err });
        } else {
            res.status(200).json(treinos);
        }
    });
};