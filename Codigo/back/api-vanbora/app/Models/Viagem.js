'use strict'
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const { nanoid } = require('nanoid/async')
class Viagem extends Model {
  static get table () {
    return 'viagem'
  }

  static boot () {
    super.boot()

    this.addHook('beforeSave', async (viagemInstance) => {
      viagemInstance.chave = await nanoid(6)
    })
  }

  motorista () {
    return this.hasOne('App/Models/User', 'id_motorista', 'id')
  }

  alunos () {
    return this.belongsToMany('App/Models/User', 'id_viagem', 'id_aluno')
      .pivotTable('alunos_viagem')
  }
}

module.exports = Viagem
