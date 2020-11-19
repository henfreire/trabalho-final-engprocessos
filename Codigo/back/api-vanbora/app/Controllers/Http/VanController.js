'use strict'

const Van = use('App/Models/Van')

class VanController {
  async index () {
    return Van.all()
  }

  async store ({request}) {
    const data = request.all()
    const van = await Van.create(data)

    return van
  }

  async update ({params, request}) {
    const van = await Van.findOrFail(params.id);
    const data = request.all();

    van.merge(data);
    await van.save();

    return van
  }

  async show ({ params }) {
    const property = await Van.findOrFail(params.id)

    return property
  }

  async destroy ({ params, auth, response }) {
    const property = await Van.findOrFail(params.id)

    await property.delete()
  }
}

module.exports = VanController
