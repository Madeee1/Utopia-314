import { PersonController } from '~/server/controller/getPersonById.controller'

export default defineEventHandler(async (event) => {
  // EXAMPLE:
  // Getting a person name when the user has a person id
  const id = 1

  //Example of Calling Controller
  const controller = new PersonController()

  return controller.getNameOfPersonById(id)
})
