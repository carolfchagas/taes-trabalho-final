const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamento.controller');

router.get('/', pagamentoController.getAllPayments);
router.get('/:id', pagamentoController.getPaymentById);
router.post('/', pagamentoController.createPayment);
router.delete('/:id', pagamentoController.deletePaymentById);

module.exports = router;
