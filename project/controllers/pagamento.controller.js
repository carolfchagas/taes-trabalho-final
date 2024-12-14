const Pagamento = require('../models/pagamento.model');

exports.getAllPayments = (req, res) => {
    Pagamento.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching payments' });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.getPaymentById = (req, res) => {
    const id = req.params.id;
    Pagamento.getById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching payment' });
        } else if (!data) {
            res.status(404).send({ message: `Payment with ID ${id} not found` });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.createPayment = (req, res) => {
    const newPayment = req.body;

    if (!newPayment.id_aluno || !newPayment.id_personal_trainer || !newPayment.modalidade || !newPayment.valor || !newPayment.id_transacao_paypal) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    newPayment.data_pagamento = new Date(); // Define a data de pagamento como o momento atual

    Pagamento.create(newPayment, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error creating payment' });
        } else {
            res.status(201).json(data);
        }
    });
};

exports.deletePaymentById = (req, res) => {
    const id = req.params.id;
    Pagamento.deleteById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting payment' });
        } else {
            res.status(200).send({ message: `Payment with ID ${id} deleted successfully` });
        }
    });
};
