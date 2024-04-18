import { Person } from '~/server/class/person.class';
import { PersonRepository } from '~/server/entity/person.entity';

export class PersonController {
    constructor() {}

    getNameOfPerson(person: Person) {
        // CALL REPOSITORY
        const repository = new PersonRepository()

        return {"contMessage": "message from controller", "repoMessage": repository.getNameOfPerson(person)}
        
    }
}