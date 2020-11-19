'use strict'

class UserValidator  {
  get rules () {
    return {
      email: 'required|email|unique:users,email',
      password: 'required',
      tipo: 'required'
    }
  }
}

module.exports = UserValidator
