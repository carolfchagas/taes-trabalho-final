const express = require('express');
const router = express.Router();
const mensagemController = require('../controllers/mensagem.controller');

router.get('/', mensagemController.getAllMessages);
router.get('/:id', mensagemController.getMessageById);
router.post('/', mensagemController.createMessage);
router.delete('/:id', mensagemController.deleteMessageById);

module.exports = router;
