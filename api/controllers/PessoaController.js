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
      const novaPessoa = req.body;

      // Valida se pessoa já existe
      const pessoa = await database.Pessoas.findOne({ where: { email: novaPessoa.email } })

      if (pessoa) {
        return res.status(409).json({ message: "Por favor utilize outro e-mail." });
      }

      await database.Pessoas.create(novaPessoa)
      return res.status(200).json({ message: "Usuário criado com sucesso." });
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizarPessoa(req, res) {
    try {
      const { id } = req.params;
      const novaPessoa = req.body;
      // Valida se pessoa já existe
      const pessoa = await database.Pessoas.findOne({ where: { id: Number(id) } })

      if (pessoa) {
        await database.Pessoas.update(novaPessoa, { where: { id: Number(id) } })
        return res.status(200).json({ message: "Usuário atualizado com sucesso."});
      } else {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async removerPessoa(req, res) {
    try {
      const { id } = req.params;

      // Valida se pessoa existe
      const pessoa = await database.Pessoas.findOne({ where: { id: Number(id) } })

      if (pessoa) {
        await database.Pessoas.destroy({ where: { id: Number(id) } })
        return res.status(200).json({ message: "Usuário deletado com sucesso." });
      } else {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PessoaController;