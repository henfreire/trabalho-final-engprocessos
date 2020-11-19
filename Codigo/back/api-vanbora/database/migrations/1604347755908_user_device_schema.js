'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserDeviceSchema extends Schema {
  up () {
    this.create('user_devices', (table) => {
      table.increments()
      table.integer('id_aluno')
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('device_token', 255)
      table.timestamps()
    })
    this.table('users', (table) => {
      table.dropColumn('deviceToken')
    })
  }

  down () {
    this.drop('user_devices')
    this.alter('users', (table) => {
      table.string('deviceToken', 255)
    });
  }
}

module.exports = UserDeviceSchema
