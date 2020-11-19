'use strict'

class ViagenController {
  constructor (params) {
    const { socket, request } = params
    this.socket = socket
    this.request = request

    console.log('A new subscription for viagem topic', socket.topic)
  }

  onMessage (message) {
    console.log('got message', message)
  }

  onClose () {
    console.log('Closing subscription for viagem topic', this.socket.topic)
  }
}

module.exports = ViagenController
