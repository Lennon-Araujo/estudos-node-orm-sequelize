const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js')

const router = Router();

router.get('/pessoas', PessoaController.listarPessoas)
router.get('/pessoas/:id', PessoaController.buscarPessoa)
router.post('/pessoas', PessoaController.criarPessoa)
router.put('/pessoas/:id', PessoaController.atualizarPessoa)
router.delete('/pessoas/:id', PessoaController.removerPessoa)
router.get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.buscarMatricula)
router.post('/pessoas/:estudanteId/matriculas', PessoaController.criarMatricula)
router.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.atualizarMatricula)

module.exports = router;
