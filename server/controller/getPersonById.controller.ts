import { PersonRepository } from '~/server/entity/person.entity';

export class PersonController {
    constructor() {}

    getNameOfPersonById(id: number) {
        // CALL REPOSITORY
        const repository = new PersonRepository()
        
        // Example: db query according to this person's id
        return repository.getNameOfPersonById(id)
    }
}