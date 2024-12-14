const express = require('express');
const router = express.Router();
const atividadeController = require('../controllers/atividade.controller');

router.get('/', atividadeController.getAllActivities);
router.get('/:id', atividadeController.getActivityById);
router.post('/', atividadeController.createActivity);
router.put('/:id', atividadeController.updateActivityById);
router.delete('/:id', atividadeController.deleteActivityById);
router.get('/treino/:treinoId', atividadeController.getByTreinoId);

module.exports = router;
