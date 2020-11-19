'use strict'

class Van {
  get rules () {
    return {
      placa: 'required',
      id_motorista: 'required'
    }
  }
}

module.exports = Van
