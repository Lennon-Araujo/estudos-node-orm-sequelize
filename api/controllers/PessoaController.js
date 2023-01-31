const database = require('../models')

class PessoaController {
  static async listarPessoas(req, res) {
    try {
      const pessoas = await database.Pessoas.findAll()
      return res.status(200).json(pessoas);
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async buscarPessoa(req, res) {
    try {
      const { id } = req.params;
      const pessoa = await database.Pessoas.findOne({ where: { id: Number(id) } })
      return res.status(200).json(pessoa);
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criarPessoa(req, res) {
    try {
      const pessoa = req.body;
      await database.Pessoas.create(pessoa)
      return res.status(200).json({message: "Usuário criado com sucesso."});
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PessoaController;