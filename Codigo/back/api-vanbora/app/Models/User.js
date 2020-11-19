'use strict'

const constants = require('../utils/contants')

const Model = use('Model')
const Hash = use('Hash')

class User extends Model {
  static boot () {
    super.boot()

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  van () {
    return this.hasOne('App/Models/Van', 'id', 'id_motorista')
  }

  isMotorista (tipo) {
    return tipo === constants.USER_TYPE.MOTORISTA
  }
}

module.exports = User
