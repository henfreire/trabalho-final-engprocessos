'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ViagemSchema extends Schema {
  up () {
    this.create('viagem', (table) => {
      table.increments()
      table.string('apelido', 45)
      table.string('hora_partida', 45)
      table.string('origem', 100)
      table.string('destino', 100)
      table.string('dias_semana', 20)
      table.string('chave', 255)
      table.integer('id_motorista')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('viagem')
  }
}

module.exports = ViagemSchema
