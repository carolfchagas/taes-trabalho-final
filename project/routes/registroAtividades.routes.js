const express = require('express');
const router = express.Router();
const registroAtividadesController = require('../controllers/registroAtividades.controller');

router.get('/', registroAtividadesController.getAllActivityLogs);
router.get('/:id', registroAtividadesController.getActivityLogById);
router.post('/', registroAtividadesController.createActivityLog);
router.delete('/:id', registroAtividadesController.deleteActivityLogById);
router.get('/aluno/:id', registroAtividadesController.getByAlunoId);

module.exports = router;
