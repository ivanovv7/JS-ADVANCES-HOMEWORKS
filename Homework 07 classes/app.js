console.log("connected => classes")

// Create a class Animal that has:
// name
// type - carnivore/herbivore/omnivore
// age
// size
// eat - a method that checks if the input is an Animal.

// If the input is an Animal and If this object animal is herbivore write in the console: The animal ( this animal name ) is a herbivore and does not eat other animals

// If the input is an Animal, and If this object animal is not herbivore, then change the input Animal =>
//  property isEaten to true and log in the console: The animal (this animal name) ate the (the input animal name).


// If the animal is twice as large or larger than this animal than just log in the console: The animal (this animal name) tried to eat the (the input animal name) but it was too large.
// If the input is not an animal just write: The animal (this animal name) is eating (the input).
// isEaten = default false


class Animal {
    constructor(name, type, age, size,) {
        this.name = name;
        this.type = type;
        this.age = age;
        this.size = size;
        this.isEaten = false;
    }
    //  metod created outside of conscructor only accesable from the class itself !!
    eat(object) {
        //first condition
        if (object instanceof Animal == true && this.type == "herbivore") {
            console.log(`The animal ${this.name} is a ${this.type} and does not eat other animals`)

        }
        //second condition
        if (object instanceof Animal == true && this.type !== "herbivore") {
            object.isEaten = true;
            console.log(`The animal ${this.name} ate the ${object.name}`)

        }
        // third condition
        if (object.size * 2 > this.size || object.size > this.size) {
            // console.log(object.size * 2) it works =>> OK
            console.log(`The animal ${this.name} tried to eat ${object.name} but it was too large`)

        }
        //fourth condition
        if (object instanceof Animal == false) {
            console.log(`The animal ${this.name} is eating ${object.name}`)

        }



    }
}

let lion = new Animal("LION", "carnivore", 15, 10)

let deer = new Animal("DEER", "herbivore", 5, 4)
console.log(" *** *** INVOCATION 1, DEER IS THIS OBJECT, LION IS PASSED PARAMETAR OBJECT *** ***")
deer.eat(lion)// deer is herbivore and does not eat other animals =>> OK


console.log(" *** *** INVOCATION 2, LION IS THIS OBJECT, DEER IS PASSED PARAMETAR OBJECT *** ***")
lion.eat(deer) // the LION ate the DEER =>> OK
console.log(deer) // isEaten is manipulated since deer is eaten


console.log(" *** *** INVOCATION 3, using DUMMY - NOT ANIMAL INSTANCE OBJECT *** ***")

let dummyObject = { name: "DUMMY ANIMAL", type: "DUMMY TYPE", }

lion.eat(dummyObject) // lion eats dummy animal => OK
