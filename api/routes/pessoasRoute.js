const { Router } = require('express');
const PessoaController = require('../controllers/PessoaController.js')

const router = Router();

router.get('/pessoas', PessoaController.listarPessoas)
router.get('/pessoas/:id', PessoaController.buscarPessoa)
router.post('/pessoas', PessoaController.criarPessoa)

module.exports = router;
