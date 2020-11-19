'use strict'

class ListaParticipacaoController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request

    console.log('A new subscription for lista participacao topic', socket.topic)
  }

  onMessage (message) {
    console.log('got message', message)
  }

  onClose () {
    console.log('Closing subscription for lista participacao topic', this.socket.topic)
  }
}

module.exports = ListaParticipacaoController
