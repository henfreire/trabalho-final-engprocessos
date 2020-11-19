'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlunosViagemSchema extends Schema {
  up () {
    this.create('alunos_viagem', (table) => {
      table.increments()
      table.integer('id_viagem')
        .notNullable()
        .references('id')
        .inTable('viagem')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.integer('id_aluno')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('alunos_viagem')
  }
}

module.exports = AlunosViagemSchema
