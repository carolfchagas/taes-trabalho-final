const express = require('express');
const router = express.Router();
const treinoController = require('../controllers/treino.controller');

router.get('/', treinoController.getAllWorkouts);
router.get('/:id', treinoController.getWorkoutById);
router.post('/', treinoController.createWorkout);
router.put('/:id', treinoController.updateWorkoutById);
router.delete('/:id', treinoController.deleteWorkoutById);
router.get('/aluno/:id_aluno', treinoController.getWorkoutsByAlunoId);

module.exports = router;
