'use strict'

const Event = use('Event')

Event.on('create::listaParticipacao', 'ListaParticipacao.create')

Event.on('send::listaParticipacao', 'ListaParticipacao.send')

Event.on('update-viagem::listaParticipacao', 'ListaParticipacao.updateByIdViagem')
