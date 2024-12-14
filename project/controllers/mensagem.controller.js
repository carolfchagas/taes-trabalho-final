const Mensagem = require('../models/mensagem.model');

exports.getAllMessages = (req, res) => {
    Mensagem.getAll((err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching messages' });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.getMessageById = (req, res) => {
    const id = req.params.id;
    Mensagem.getById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error fetching message' });
        } else if (!data) {
            res.status(404).send({ message: `Message with ID ${id} not found` });
        } else {
            res.status(200).json(data);
        }
    });
};

exports.createMessage = (req, res) => {
    const newMessage = req.body;

    if (!newMessage.id_remetente || !newMessage.id_destinatario || !newMessage.conteudo) {
        return res.status(400).send({ message: 'Sender, recipient, and content are required' });
    }

    newMessage.data_envio = new Date(); // Define a data de envio como o momento atual

    Mensagem.create(newMessage, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error creating message' });
        } else {
            res.status(201).json(data);
        }
    });
};

exports.deleteMessageById = (req, res) => {
    const id = req.params.id;
    Mensagem.deleteById(id, (err, data) => {
        if (err) {
            res.status(500).send({ message: 'Error deleting message' });
        } else {
            res.status(200).send({ message: `Message with ID ${id} deleted successfully` });
        }
    });
};
