// Import person class
import { Person } from '~/server/class/person.class'
import { PersonRepository } from '~/server/entity/person.entity'

export default defineEventHandler(async (event) => {
  // create a person object
  const person = new Person('John', 30)
  // get the name of the person
  const name = person.getName()

  // create a person repository object
  const personRepository = new PersonRepository()

  const toReturnIntermediate = {
    name,
    "message1": "This Data originate in the controller layer"
  }

  const toReturn = {
    ...toReturnIntermediate,
    "message2": personRepository.getNameOfPerson(person)
  }

  return toReturn
})
