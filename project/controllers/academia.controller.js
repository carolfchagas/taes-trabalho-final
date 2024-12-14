const Academia = require('../models/academia.model');

exports.getAllAcademies = (req, res) => {
    Academia.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching academies' });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.getAcademyById = (req, res) => {
    const id = req.params.id;
    Academia.getById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching academy' });
        } else if (!data) {
            res.status(404).send({ message: `Academy with ID ${id} not found` });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.createAcademy = (req, res) => {
    const newAcademy = req.body;

    if (!newAcademy.nome || !newAcademy.endereco || !newAcademy.cidade) {
        return res.status(400).send({ message: 'Name, address, and city are required' });
    }

    Academia.create(newAcademy, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error creating academy' });
        } else {
            res.status(201).json(data);
        }
    });
};

exports.updateAcademyById = (req, res) => {
    const id = req.params.id;
    const updatedAcademy = req.body;

    Academia.updateById(id, updatedAcademy, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error updating academy' });
        } else {
            res.status(200).send({ message: `Academy with ID ${id} updated successfully` });
        }
    });
};

exports.deleteAcademyById = (req, res) => {
    const id = req.params.id;
    Academia.deleteById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting academy' });
        } else {
            res.status(200).send({ message: `Academy with ID ${id} deleted successfully` });
        }
    });
};
