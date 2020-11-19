'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ListaParticipacaoSchema extends Schema {
  up () {
    this.create('lista_participacao', (table) => {
      table.increments()
      table.datetime('data')
      table.integer('id_viagem')
        .notNullable()
        .references('id')
        .inTable('viagem')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('lista_participacao')
  }
}

module.exports = ListaParticipacaoSchema
