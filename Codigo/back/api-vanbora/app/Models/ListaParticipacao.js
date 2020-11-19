'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const ListaParticipacaoAlunoModel = use('App/Models/ListaParticipacaoAluno')
const ViagemModel = use('App/Models/Viagem')
const WeeksDayUtils = require('../utils/weekdays.util')
const DateUtils = require('../utils/date.util')
const constants = require('../utils/contants')
const Event = use('Event')
const UserDevice = use('App/Models/UserDevice')

class ListaParticipacao extends Model {
  static get table () {
    return 'lista_participacao'
  }

  viagem () {
    return this.hasOne('App/Models/Viagem', 'id_viagem', 'id')
  }

  integrantes () {
    return this.hasMany('App/Models/ListaParticipacaoAluno', 'id', 'id_lista_participacao')
      .with('aluno')
  }

  integrante () {
    return this.hasOne('App/Models/ListaParticipacaoAluno', 'id', 'id_lista_participacao')
      .with('aluno')
  }

  static getList ({ user }) {
    const query = this.query().with('viagem')
      .where('data', '>=', DateUtils.convertTimeToDate(DateUtils.START_TIME))
      .where('data', '<=', DateUtils.convertTimeToDate(DateUtils.END_TIME))

    if (user.isMotorista(user.tipo)) {
      query.whereHas('viagem', viagemQuery => {
        viagemQuery.where('id_motorista', user.id)
      })
      query.with('integrantes')
    } else {
      query.whereHas('integrante', integrantesQuery => {
        integrantesQuery.where('id_aluno', user.id)
      })
      query.with('integrante')
    }
    return query.fetch()
  }

  static async gerarListaParticipacaoDia (day) {
    const dayNumber = (day !== null && day !== undefined) ? day : DateUtils.zonedDate.getDay()
    const dayWeek = WeeksDayUtils.list[dayNumber]

    console.log('day', day, 'dayWeek', dayWeek)
    const viagens = await ViagemModel.query()
      .with('alunos')
      .with('motorista')
      .where('dias_semana', 'like', `%${dayWeek}%`)
      .fetch()

    const items = viagens.toJSON()
    console.log('items viagens', items)
    const listsGenerated = []
    for (const viagem of items) {
      if (viagem.hora_partida) {
        const date = DateUtils.convertTimeToDate(viagem.hora_partida)
        const listFind = await this.query()
          .where({ data: date, id_viagem: viagem.id })
          .fetch()

        console.log(listFind.toJSON())
        // Se não encontrar, cria nova lista
        if (listFind.toJSON().length === 0) {
          const listCreated = await this.create({ data: date, id_viagem: viagem.id })
          if (listCreated) {
            listCreated.alunosOperation = await this.alunosListaParticipacao(listCreated.id)
            listCreated.viagem = viagem
            listsGenerated.push(listCreated.toJSON())
          }
        }
      }
    }

    const idsMotoristas = listsGenerated.map(item => item.viagem.id_motorista)
    const ids = [...new Set(idsMotoristas)]
    console.log('ids', ids)
    ids.forEach(id => Event.fire('send::listaParticipacao', id))

    if (listsGenerated.length) {
      listsGenerated.forEach((item) => {
        UserDevice.notifyAlunos(item.viagem)
      })
    }
    return listsGenerated
  }

  static async alunosListaParticipacao (idLista) {
    const result = {
      alunosAdicionados: [],
      alunosRemovidos: []
    }
    const list = await this.find(idLista)
    if (!list) return null

    const alunosViagemResult = await ViagemModel.query()
      .where('id', list.id_viagem)
      .with('alunos')
      .first()

    const alunosViagem = alunosViagemResult ? alunosViagemResult.toJSON() : null

    if (!alunosViagem && (alunosViagem && alunosViagem.alunos.length === 0)) return false

    const alunosListaParticipacaoResult = await ListaParticipacaoAlunoModel
      .query()
      .where({ id_lista_participacao: idLista })
      .fetch()

    const alunosListaParticipacao = alunosListaParticipacaoResult ? alunosListaParticipacaoResult.toJSON() : []

    const listAlunos = alunosViagem.alunos || []

    const alunosAdicionados = []
    for (const aluno of listAlunos) {
      const alunoExist = alunosListaParticipacao
        .some(item => item.id_aluno === aluno.id)
      if (!alunoExist) {
        const alunoAdd = await ListaParticipacaoAlunoModel.create({
          id_aluno: aluno.id,
          status: constants.TRIP_STATUS.PENDENTE,
          id_lista_participacao: idLista
        })

        alunosAdicionados.push(alunoAdd.toJSON())
      }
    }

    result.alunosAdicionados = alunosAdicionados
    // Removing alunos
    if (alunosListaParticipacao.length > listAlunos.length) {
      const alunosToRemove = alunosListaParticipacao
        .filter(alunoLP => !listAlunos
          .some(item => item.id === alunoLP.id_aluno))

      const idsToRemove = alunosToRemove.map(item => item.id)

      await ListaParticipacaoAlunoModel
        .query()
        .whereIn('id', idsToRemove)
        .delete()

      result.alunosRemovidos = alunosToRemove
    }

    if (result.alunosAdicionados.length !== 0 || result.alunosRemovidos.length !== 0) {
      Event.fire('send::listaParticipacao', alunosViagemResult.id_motorista)
    }

    return result
  }

  static async updateAlunosViagemListaParticipacao (idViagem) {
    console.log('Date utils START_TIME', DateUtils.convertTimeToDate(DateUtils.START_TIME))
    console.log('Date utils END_TIME', DateUtils.convertTimeToDate(DateUtils.END_TIME))

    const listaP = await this
      .query()
      .where('data', '>=', DateUtils.convertTimeToDate(DateUtils.START_TIME))
      .where('data', '<=', DateUtils.convertTimeToDate(DateUtils.END_TIME))
      .where('id_viagem', idViagem)
      .first()

    if (!listaP) return false

    return this.alunosListaParticipacao(listaP.id)
  }
}

module.exports = ListaParticipacao
