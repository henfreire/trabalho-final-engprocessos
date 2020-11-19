'use strict'

const ListaParticipacao = use('App/Models/ListaParticipacao')
const ListaParticipacaoAluno = use('App/Models/ListaParticipacaoAluno')
const Event = use('Event')

class ListaParticipacaoController {
  async index ({ auth }) {
    const { user } = auth
    return ListaParticipacao.getList({ user })
  }

  async updateAlunoParticipacao ({ params, request, auth, response }) {
    const data = request.all()
    const item = await ListaParticipacaoAluno.find(params.idListaParticipacaoAluno)

    if (!item) return response.error()

    item.merge(data)

    await item.save()

    if (item) {
      const lista = await ListaParticipacao
        .query()
        .where('id', item.id_lista_participacao)
        .with('viagem')
        .first()

      const result = lista.toJSON()
      if (result.viagem.id_motorista) {
        Event.fire('send::listaParticipacao', result.viagem.id_motorista)
      }
    }
    return item
  }

  async gerarListaParticipacaoDia ({ params }) {
    return ListaParticipacao.gerarListaParticipacaoDia(params.dayNumber)
  }

  async updateAlunosListaParticipacao ({ params }) {
    return ListaParticipacao.alunosListaParticipacao(params.idListaParticipacao)
  }

  async updateAlunosViagemListaParticipacao ({ params }) {
    return ListaParticipacao.updateAlunosViagemListaParticipacao(params.idViagem)
  }
}

module.exports = ListaParticipacaoController
