const database = require('../models')

class NivelController {
  static async listarNiveis(req, res) {
    try {
      const niveis = await database.Niveis.findAll()
      return res.status(200).json(niveis);
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async buscarNivel(req, res) {
    try {
      const { id } = req.params;
      const nivel = await database.Niveis.findOne({ where: { id: Number(id) } })
      return res.status(200).json(nivel);
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criarNivel(req, res) {
    try {
      const novoNivel = req.body;

      // Valida se nível já existe
      const nivel = await database.Niveis.findOne({ where: { descr_nivel: novoNivel.descr_nivel } })

      if (nivel) {
        return res.status(409).json({ message: "Por favor utilize outra descrição." });
      }

      await database.Niveis.create(novoNivel)
      return res.status(200).json({ message: "Nível criado com sucesso." });
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizarNivel(req, res) {
    try {
      const { id } = req.params;
      const novoNivel = req.body;
      // Valida se nível já existe
      const nivel = await database.Niveis.findOne({ where: { id: Number(id) } })

      if (nivel) {
        await database.Niveis.update(novoNivel, { where: { id: Number(id) } })
        return res.status(200).json({ message: "Nível atualizado com sucesso."});
      } else {
        return res.status(404).json({ message: "Nível não encontrado." });
      }
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async removerNivel(req, res) {
    try {
      const { id } = req.params;

      // Valida se nivel existe
      const nivel = await database.Niveis.findOne({ where: { id: Number(id) } })

      if (nivel) {
        await database.Niveis.destroy({ where: { id: Number(id) } })
        return res.status(200).json({ message: "Nível deletado com sucesso." });
      } else {
        return res.status(404).json({ message: "Nível não encontrado." });
      }
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = NivelController;