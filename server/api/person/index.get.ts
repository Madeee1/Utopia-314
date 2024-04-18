// Import person class
import { Person } from '~/server/class/person.class'
import { PersonController } from '~/server/controller/person.controller'

export default defineEventHandler(async (event) => {
  // EXAMPLE SIMULATION OF INPUT FROM USER
  // create a person object
  const person = new Person('John', 30)
  // get the name of the person
  const name = person.getName()

  //Example of Calling Controller
  const controller = new PersonController()

  return controller.getNameOfPerson(person)
})
