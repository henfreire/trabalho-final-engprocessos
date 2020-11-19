'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ListaParticipacaoAlunoSchema extends Schema {
  up () {
    this.create('lista_participacao_aluno', (table) => {
      table.increments()
      table.string('status', 45)
      table.string('status_notificacao', 45)
      table.datetime('data_notificacao')
      table.integer('id_lista_participacao')
        .notNullable()
        .references('id')
        .inTable('lista_participacao')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
      table.integer('id_aluno')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  down () {
    this.drop('lista_participacao_aluno')
  }
}

module.exports = ListaParticipacaoAlunoSchema
