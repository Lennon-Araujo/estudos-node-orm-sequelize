const database = require('../models')

class TurmaController {
  static async listarTurmas(req, res) {
    try {
      const turmas = await database.Turmas.findAll()
      return res.status(200).json(turmas);
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async buscarTurma(req, res) {
    try {
      const { id } = req.params;
      const turma = await database.Turmas.findOne({ where: { id: Number(id) } })
      return res.status(200).json(turma);
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criarTurma(req, res) {
    try {
      const novaTurma = req.body;

      await database.Turmas.create(novaTurma)
      return res.status(200).json({ message: "Turma criada com sucesso." });
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async removerTurma(req, res) {
    try {
      const { id } = req.params;

      // Valida se turma existe
      const turma = await database.Turmas.findOne({ where: { id: Number(id) } })

      if (turma) {
        await database.Turmas.destroy({ where: { id: Number(id) } })
        return res.status(200).json({ message: "Turma deletada com sucesso." });
      } else {
        return res.status(404).json({ message: "Turma não encontrada." });
      }
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = TurmaController;