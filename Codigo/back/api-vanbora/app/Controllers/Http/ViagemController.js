'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with viagems
 */

const Viagem = use('App/Models/Viagem')
const UserDevice = use('App/Models/UserDevice')
const Ws = use('Ws')
const Event = use('Event')

class ViagemController {
  async index ({ params, request, auth }) {
    console.log('auth.user.id', auth.user.id)
    return Viagem
      .query()
      .where('id_motorista', auth.user.id)
      .with('alunos')
      .fetch()
  }

  async store ({ request, auth, response }) {
    const data = request.all()

    if (auth.user && !auth.user.isMotorista(auth.user.tipo)) {
      return response.status(400).json({
        status: 'error',
        message: 'Usuário não é motorista'
      })
    }
    const viagem = await Viagem.create({ ...data, id_motorista: auth.user.id })
    if (viagem) {
      await this.sendUpdateViagens({ auth })
      Event.fire('create::listaParticipacao')
      return viagem
    }
  }

  async update ({ params, request, response, auth }) {
    const viagem = await Viagem.findOrFail(params.id)
    const data = request.all()

    if (!auth.user.isMotorista(auth.user.tipo)) {
      return response.status(400).json({
        status: 'error',
        message: 'Usuário não é motorista'
      })
    }

    viagem.merge(data)
    await viagem.save()

    if (viagem) {
      await this.sendUpdateViagens({ auth })
      return viagem
    }
  }

  async show ({ params }) {
    const viagem = await Viagem
      .query()
      .where('id', params.id)
      .with('alunos')
      .fetch()

    return viagem
  }

  async destroy ({ params, auth, response }) {
    const property = await Viagem.findOrFail(params.id)

    const viagem = await property.delete()

    if (viagem) {
      await this.sendUpdateViagens({ auth })
      Event.fire('update-viagem::listaParticipacao', viagem.id)
      return viagem
    }
  }

  async addAlunos ({ request, auth, response }) {
    const data = request.all()

    const viagem = await Viagem.find(data.id_viagem)

    if (!viagem) return false

    const result = await viagem.alunos().attach(data.alunos)

    console.log('result')
    console.log(result)
    if (result) {
      Event.fire('update-viagem::listaParticipacao', viagem.id)
    }
    return result
  }

  async removeAlunos ({ request, auth, response }) {
    const data = request.all()

    const viagem = await Viagem.find(data.id_viagem)

    const result = await viagem.alunos().detach(data.alunos)

    if (result) Event.fire('update-viagem::listaParticipacao', viagem.id)

    return result
  }

  async search ({ request, auth, response }) {
    const search = request.all()

    const viagem = await Viagem.query().where(search).fetch()

    return viagem
  }

  async sendUpdateViagens ({ auth }) {
    const topic = Ws.getChannel('viagens:*').topic(`viagens:${auth.user.id}`)

    if (topic) {
      const data = await Viagem
        .query()
        .where('id_motorista', auth.user.id)
        .with('alunos')
        .fetch()
      topic.broadcastToAll('lista-viagens', data)
    }
  }

  async getAlunoTrip ({ params, request, auth }) {
    console.log('auth.user.id', auth.user.id)
    return Viagem
      .query()
      .whereHas('alunos', alunosQuery => {
        alunosQuery.wherePivot('id_aluno', auth.user.id)
      })
      .with('motorista')
      .fetch()
  }
}

module.exports = ViagemController
