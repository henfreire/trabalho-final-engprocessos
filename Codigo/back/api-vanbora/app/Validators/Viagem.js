'use strict'

class Viagem {
  get rules () {
    return {
      origem: 'required',
      destino: 'required',
      hora_partida: 'required',
      apelido: 'required',
      dias_semana: 'required'
    }
  }
}

module.exports = Viagem
