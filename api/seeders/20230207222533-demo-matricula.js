'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Matriculas', [
      {
        status: 'confirmado',
        estudante_id: 1,
        turma_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'confirmado',
        estudante_id: 2,
        turma_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'confirmado',
        estudante_id: 3,
        turma_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'cancelado',
        estudante_id: 4,
        turma_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        status: 'confirmado',
        estudante_id: 11,
        turma_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },      {
        status: 'confirmado',
        estudante_id: 1,
        turma_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
