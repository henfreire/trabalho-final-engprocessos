'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Van extends Model {
  static get table () {
    return 'van'
  }
}

module.exports = Van
