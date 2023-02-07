const { Router } = require('express');
const TurmaController = require('../controllers/TurmaController.js')

const router = Router();

router.get('/turmas', TurmaController.listarTurmas)
router.get('/turmas/:id', TurmaController.buscarTurma)
router.post('/turmas', TurmaController.criarTurma)
router.delete('/turmas/:id', TurmaController.removerTurma)

module.exports = router;
