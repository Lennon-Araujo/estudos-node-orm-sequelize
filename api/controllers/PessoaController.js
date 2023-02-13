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
        return res.status(200).json({ message: "Usuário atualizado com sucesso." });
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

  static async buscarMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      const matricula = await database.Matriculas.findOne({ where: { id: Number(matriculaId), estudante_id: Number(estudanteId) } })
      return res.status(200).json(matricula);
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async criarMatricula(req, res) {
    const { estudanteId } = req.params;
    const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) }

    try {
      // Valida se pessoa existe
      const pessoa = await database.Pessoas.findOne({ where: { id: Number(novaMatricula.estudante_id) } })

      if (!pessoa) {
        return res.status(404).json({ message: "O estudante informado não existe." });
      }

      const turma = await database.Turmas.findOne({ where: { id: Number(novaMatricula.turma_id) } })

      if (!turma) {
        return res.status(404).json({ message: "A turma informada não existe." });
      }

      await database.Matriculas.create(novaMatricula)
      return res.status(200).json({ message: "Matrícula criada com sucesso." });
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async atualizarMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;
      const novaMatricula = { ...req.body, estudante_id: Number(estudanteId), matricula_id: Number(matriculaId) };

      const matricula = await database.Matriculas.findOne({ where: { id: Number(novaMatricula.matricula_id) } })

      if (!matricula) {
        return res.status(404).json({ message: "A matrícula informada não existe." });
      }
      // Valida se pessoa existe
      const pessoa = await database.Pessoas.findOne({ where: { id: Number(novaMatricula.estudante_id) } })

      if (!pessoa) {
        return res.status(404).json({ message: "O estudante informado não existe." });
      }

      const turma = await database.Turmas.findOne({ where: { id: Number(novaMatricula.turma_id) } })

      if (!turma) {
        return res.status(404).json({ message: "A turma informada não existe." });
      }

      await database.Matriculas.update(novaMatricula, { where: { id: Number(novaMatricula.matricula_id), estudante_id: Number(estudanteId) } })
      return res.status(200).json({ message: "Matrícula atualizada com sucesso." });
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }

  static async removerMatricula(req, res) {
    try {
      const { estudanteId, matriculaId } = req.params;

      // Valida se pessoa existe
      const pessoa = await database.Pessoas.findOne({ where: { id: Number(estudanteId) } })

      if (!pessoa) {
        return res.status(404).json({ message: "O estudante informado não existe." });
      }

      const matricula = await database.Matriculas.findOne({ where: { id: Number(matriculaId) } })

      if (!matricula) {
        return res.status(404).json({ message: "A matrícula informada não existe." });
      }

      await database.Matriculas.destroy({ where: { id: Number(matriculaId), estudante_id: Number(estudanteId) } })
      return res.status(200).json({ message: "Matricula deletada com sucesso." });
    } catch (error) {
      return res.status(500).json(error.message)
    }
  }
}

module.exports = PessoaController;