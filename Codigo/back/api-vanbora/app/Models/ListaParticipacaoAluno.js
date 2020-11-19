'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ListaParticipacaoAluno extends Model {
  static get table () {
    return 'lista_participacao_aluno'
  }

  aluno () {
    return this.hasOne('App/Models/User', 'id_aluno', 'id')
  }
}

module.exports = ListaParticipacaoAluno
