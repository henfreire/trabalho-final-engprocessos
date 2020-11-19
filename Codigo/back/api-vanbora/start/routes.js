'use strict'

const Route = use('Route')

Route.post('sessions', 'SessionController.store')

Route.post('/login', 'UserController.login')
Route.post('passwords', 'ForgotPasswordController.store')
Route.post('/storeDeviceToken', 'UserController.storeDeviceToken')
  .middleware('auth')

// Viagens
Route.group(() => {
  Route.get('/aluno', 'ViagemController.getAlunoTrip')
  Route.get('/search', 'ViagemController.search')
  Route.post('/', 'ViagemController.store')
    .middleware('auth')
    .validator('Viagem')
  Route.resource('/', 'ViagemController')

  // Alunos Viagens
  Route.post('/alunos', 'ViagemController.addAlunos')
    .validator('AlunosViagem')

  Route.post('/alunos/remove', 'ViagemController.removeAlunos')
    .validator('AlunosViagem')


}).prefix('viagens').middleware('auth')

Route.group(() => {
  Route.resource('/', 'ListaParticipacaoController')
  Route.put('/aluno/participacao/:idListaParticipacaoAluno', 'ListaParticipacaoController.updateAlunoParticipacao')

}).prefix('lista-participacao').middleware('auth')

// Users
Route.post('users', 'UserController.store').validator('User')
Route.resource('users', 'UserController')
  .middleware('auth')

//Van
Route.post('van', 'VanController.store').validator('Van')
  .middleware('auth')
Route.resource('van', 'VanController')
  .middleware('auth')

Route.post('gerar-lp-dia/:dayNumber?', 'ListaParticipacaoController.gerarListaParticipacaoDia')
Route.put('update-alunos-lp/:idListaParticipacao', 'ListaParticipacaoController.updateAlunosListaParticipacao')
Route.put('update-alunos-viagem-lp/:idViagem', 'ListaParticipacaoController.updateAlunosViagemListaParticipacao')
