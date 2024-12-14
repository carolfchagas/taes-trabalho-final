const express = require('express');
const router = express.Router();
const academiaController = require('../controllers/academia.controller');

router.get('/', academiaController.getAllAcademies);
router.get('/:id', academiaController.getAcademyById);
router.post('/', academiaController.createAcademy);
router.put('/:id', academiaController.updateAcademyById);
router.delete('/:id', academiaController.deleteAcademyById);

module.exports = router;
