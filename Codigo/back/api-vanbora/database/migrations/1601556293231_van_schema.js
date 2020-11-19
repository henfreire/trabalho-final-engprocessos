'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VanSchema extends Schema {
  up () {
    this.create('van', (table) => {
      table.increments()
      table.string('foto', 100000)
      table.string('placa', 20)
      table.string('cor', 30)
      table.string('modelo', 255)
      table.integer('id_motorista')
        .notNullable()
        .unique()
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('van')
  }
}

module.exports = VanSchema
