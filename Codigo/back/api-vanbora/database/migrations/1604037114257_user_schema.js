'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.string('deviceToken', 255)
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('deviceToken')
    })
  }
}

module.exports = UserSchema
