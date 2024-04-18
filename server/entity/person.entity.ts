import { Person } from '~/server/class/person.class'

export class PersonRepository {
    constructor() {}

    getNameOfPerson(person: Person) {
        // Example: db query according to this person's name
        const name = person.getName()
        return name + " got from MongoDB"
    }
}