'use strict'

const Task = use('Task')
const ListaParticipacaoModel = use('App/Models/ListaParticipacao')
class ListasParticipacao extends Task {
  static get schedule () {
    return '* 59 * * * *'
  }

  async handle () {
    this.info('Task ListasParticipacao handle ' + new Date().toLocaleTimeString())
    const result = await ListaParticipacaoModel.gerarListaParticipacaoDia()
    console.log('result', result)
  }
}

module.exports = ListasParticipacao
