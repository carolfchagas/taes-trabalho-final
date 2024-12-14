const PersonalTrainer = require('../models/personal_trainer.model');

exports.getAllPersonalTrainers = (req, res) => {
    PersonalTrainer.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching personal trainers' });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.getPersonalTrainerById = (req, res) => {
    const id = req.params.id;
    PersonalTrainer.getById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching personal trainer' });
        } else if (!data) {
            res.status(404).send({ message: `Personal Trainer with ID ${id} not found` });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.createPersonalTrainer = (req, res) => {
    const newPersonalTrainer = req.body;

    if (!newPersonalTrainer.id_usuario || !newPersonalTrainer.cref) {
        return res.status(400).send({ message: 'id_usuario and cref are required' });
    }

    PersonalTrainer.create(newPersonalTrainer, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error creating personal trainer' });
        } else {
            res.status(201).json(data);
        }
    });
};

exports.deletePersonalTrainerById = (req, res) => {
    const id = req.params.id;
    PersonalTrainer.deleteById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting personal trainer' });
        } else {
            res.status(200).send({ message: `Personal Trainer with ID ${id} deleted successfully` });
        }
    });
};
