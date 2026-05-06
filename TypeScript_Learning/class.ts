class Animal {
    name: string;
    sound?: string;
    species?: string;

    constructor(name: string, sound?: string, species?: string){
        this.name = name;
        this.sound = sound;
        this.species = species;
    }
    whoMakeSound() {
        if (this.sound) {
            console.log(`${this.name} makes the sound: ${this.sound}`);
        }
    }
}

const dog = new Animal("Buddy", "Woof", "Dog");
const cat = new Animal("cat", "Meow", "Cat");

// console.log(dog.name);
// console.log(cat.name);
const a = dog.whoMakeSound();
const b = cat.whoMakeSound();


