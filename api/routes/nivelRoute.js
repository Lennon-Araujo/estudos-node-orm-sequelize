const { Router } = require('express');
const NivelController = require('../controllers/NivelController.js')

const router = Router();

router.get('/niveis', NivelController.listarNiveis)
router.get('/niveis/:id', NivelController.buscarNivel)
router.post('/niveis', NivelController.criarNivel)
router.put('/niveis/:id', NivelController.atualizarNivel)
router.delete('/niveis/:id', NivelController.removerNivel)

module.exports = router;
