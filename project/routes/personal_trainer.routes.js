const express = require('express');
const router = express.Router();
const personalTrainerController = require('../controllers/personal_trainer.controller');

router.get('/', personalTrainerController.getAllPersonalTrainers);
router.get('/:id', personalTrainerController.getPersonalTrainerById);
router.post('/', personalTrainerController.createPersonalTrainer);
router.delete('/:id', personalTrainerController.deletePersonalTrainerById);

module.exports = router;
