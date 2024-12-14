const User = require('../models/user.model');

exports.getAllUsers = (req, res) => {
    User.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching users' });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.getUserById = (req, res) => {
    const id = req.params.id;
    User.getById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching user' });
        } else if (!data) {
            res.status(404).send({ message: `User with ID ${id} not found` });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.createUser = (req, res) => {
    const newUser = req.body;
    User.create(newUser, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error creating user' });
        } else {
            res.status(201).json(data);
        }
    });
};

exports.deleteUserById = (req, res) => {
    const id = req.params.id;
    User.deleteById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting user' });
        } else {
            res.status(200).send({ message: `User with ID ${id} deleted successfully` });
        }
    });
};

exports.updateUserById = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    User.updateById(id, updatedData, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error updating user profile' });
        } else if (!data) {
            res.status(404).send({ message: `User with ID ${id} not found` });
        } else {
            res.status(200).json({ message: 'User profile updated successfully', data });
        }
    });
};
