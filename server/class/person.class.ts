// Exports a class Person
export class Person {
    // Constructor of the class Person
    constructor(
        // Property name of type string
        public name: string,
        // Property age of type number
        public age: number,
    ) {}
    // Method to get the name of the person
    getName() {
        // Return the name of the person
        return this.name
    }
}