'use strict'
const User = use('App/Models/User')
const UserDevice = use('App/Models/UserDevice')

class UserController {
  async index () {
    return User.all()
  }

  async store ({ request }) {
    const data = request.all()

    const user = await User.create(data)

    return user
  }

  async update ({ params, auth, request, response }) {
    const user = await User.findOrFail(params.id)
    const data = request.all()

    if (data.tipo && auth.user.tipo !== data.tipo) {
      return response.status(400).json({
        status: 'error',
        message: 'Usuário não pode mudar o tipo'
      })
    }

    user.merge(data)
    await user.save()

    return user
  }

  async show ({ params }) {
    const user = await User.findOrFail(params.id)

    if (user && user.isMotorista(user.tipo)) {
      user.van = await user.van().fetch()
    }
    return user
  }

  async destroy ({ params, auth, response }) {
    const property = await User.findOrFail(params.id)

    if (property.id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await property.delete()
  }

  async login ({ request, auth, response }) {
    try {
      // validate the user credentials and generate a JWT token
      const token = await auth.attempt(
        request.input('email'),
        request.input('password')
      )
      const user = await User.findBy('email', request.input('email'))
      return response.json({
        status: 'success',
        data: {
          token,
          user
        }
      })
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'Invalid email/password'
      })
    }
  }

  async storeDeviceToken ({ request, response }) {
    try {
      const { id, deviceToken } = await request.all()

      console.log('deviceToken', deviceToken, 'id', id)
      if (!deviceToken) return null

      return await UserDevice.findOrCreate({
        id_aluno: id,
        device_token: deviceToken
      })
    } catch (error) {
      console.error(error)
      response.status(400).json({
        status: 'error',
        message: 'Unable to store the device token'
      })
    }
  }
}

module.exports = UserController
