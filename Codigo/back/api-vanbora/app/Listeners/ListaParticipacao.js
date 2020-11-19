'use strict'

const Ws = use('Ws')
const User = use('App/Models/User')
const ListaParticipacaoModel = use('App/Models/ListaParticipacao')
const ListaParticipacao = exports = module.exports = {}

ListaParticipacao.create = async () => {
  console.log('lista participação create')
  const result = await ListaParticipacaoModel.gerarListaParticipacaoDia()
  console.log('result', result)
}

ListaParticipacao.updateByIdViagem = async (idViagem) => {
  console.log('lista participação update idViagem = ', idViagem)
  const result = await ListaParticipacaoModel.updateAlunosViagemListaParticipacao(idViagem)
  console.log('result', result)
}

ListaParticipacao.send = async (id) => {
  console.log('lista participação send', id)
  const topic = Ws.getChannel('lista-participacao:*')
    .topic(`lista-participacao:${id}`)
   console.log('topic', topic)
  if (topic) {
    const user = await User.find(id)
    console.log('user', user)
    const data = await ListaParticipacaoModel.getList({ user })
    console.log('data', data)
    topic.broadcastToAll('lista', data)
  }
}
