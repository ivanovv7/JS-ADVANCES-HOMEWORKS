console.log("CONECTED")

console.log("*** *** EXERCISE 1 *** ***")

// Exercise 1
// Create a Person constructor function that has:

// firstName
// lastName
// age
// getFullName - method
// Create a Student constructor function that inherits from Person and has:

// academyName
// studentId
// study - method that writes in the console: The student firstName is studying in the academyName
// Create two Student objects



// Create a Person constructor
function Person(firstName, lastName, age) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;

    this.getFullName = function () {
        return `${this.firstName} ${this.lastName}`
    }

    //Exercise 2 => final requirement 
    this.returnAcamedy = function (objectStudent) {
        return `The student visits the ${objectStudent.academyName} (FINAL REQUIREMENT)`
    }

}
//*** TESTITNG THE FUNCTION CONSTRUCTOR ***
// let personOne = new Person("ivan","ivanov",27)
// console.log(personOne)
// console.log(personOne.getFullName()) 

function Student(firstName, lastName, age, studentId) {
    // the line of code bellow says: => "every new Object created from Student will inherit all properties from Person OC"
    Object.setPrototypeOf(this, new Person(firstName, lastName, age))

    //new properties of Student object constructor
    this.academyName = "'To be changed'"
    this.studentId = studentId;

    this.study = function () {
        console.log(`The student ${firstName} is studying in the ${this.academyName} academy`)
        console.log(`The student ${this.getFullName()} is studying in the ${this.academyName} academy`) // testing if i can just pass the method from generic constructor => it worked!!
    }


}

//Instance #1 - Ivan
let studentIvan = new Student("Ivan", "Ivanov", "27", "SEDC", 3224)
console.log("Student #1", studentIvan)
studentIvan.study()// calling of method from generic construcor 

//Instance #2 - Dragan
let studentDragan = new Student("Dragan", "Ivanov", 50, "WHISKY EDU", 7273)
console.log("Student #2", studentDragan)
studentDragan.study() // calling of method from generic construcor



console.log("*** *** EXERCISE 2 *** ***")


// Exercise 2
// Create a method on the Person prototype that accepts a Student of any academy and returns the academy that that student is in. ==> DONE ABOVE

// Create DesignStudent, CodeStudent and NetworkStudent constructor functions that inherit from Student.

// Note: For all students, the academyName property should be auto generated based on which Student we are creating ( design, code or network )





// DesignStudent
// isStudentOfTheMonth - boolean
// attendAdobeExam - method that writes in console: The student firstName is doing an adobe exam!

function DesignStudent(firstName, lastName, age, studentId, isStudentOfTheMonth) {
    Object.setPrototypeOf(this, new Student(firstName, lastName, age, studentId))

    //Polymorphism of existing/hardcoded property of CF Student hence every new object will have automatically this academy
    //I am not sure if i complete the objective: "For all students, the academyName property should be auto generated based on which Student we are creating"? ?
    this.academyName = "DESIGN ACADEMY"

    // new propertis for DesignStudent
    this.isStudentOfTheMonth = isStudentOfTheMonth;

    this.attendAdobeExam = function () {
        console.log(`The student ${this.firstName} is doing an adobe exam`)
    }


}

let designStudentOne = new DesignStudent("Slavco", "Stojmenski", 55, 5468, true)

console.log(designStudentOne)
designStudentOne.attendAdobeExam()





// CodeStudent
// hasIndividualProject - boolean
// hasGroupProject - boolean
// doProject(type) - method that accepts string. If the string is individual or group it should write that the person is working on the project of that
//  type and set the value to true on the property of the project


function CodeStudent(firstName, lastName, age, studentId) {

    Object.setPrototypeOf(this, new Student(firstName, lastName, age, studentId))

    this.academyName = "CODE ACADEMY"

    // By default set to false, will be manipulated with every invocation of method doProject()
    this.hasIndividualProject = false;
    this.hasGroupProject = false;

    this.doProject = function (type) {
        if (type === "individual") {
            this.hasGroupProject = false;
            this.hasIndividualProject = true;
        }
        //vice versa
        else if (type === "group") {
            this.hasGroupProject = true;
            this.hasIndividualProject = false;
        }
        else {
           console.error(`Please provide "group" or "individual" as a parametar with small letters :))`)
        }

        console.log(`The student ${firstName} is working on a project of the type: ${type}`)
    }

}

let codeStudent = new CodeStudent("drake", "graham", 33, 666)
console.log(codeStudent)// hasIndividualProject and hasGroupProject are false at this point, all properties inherited => OK.
//console.log(codeStudent.academyName) => OK.

codeStudent.doProject("individual") // printed in cnosole => OK
console.log(codeStudent) // hasIndividualProject is manipulated to "true" => OKK.
codeStudent.doProject("group")
console.log(codeStudent)// works vice versa ===> OK.

//codeStudent.doProject("qweqrt") => testing else block it works => OK.




// NetworkStudent
// academyPart - number
// attendCiscoExam - method that writes in console: the student firstNAme is doing a cisco exam!

function NetworkStudent(firstName, lastName, age, studentId) {
    Object.setPrototypeOf(this, new Student(firstName, lastName, age, studentId))

    this.academyName = "NETWORK ACADEMY"

    // new property
    this.academyPart = 5;

    this.attendCiscoExam = function () {
        console.log(`The student ${firstName} is doing a cisco exam !!!`)
    }

}

let networkStudentOne = new NetworkStudent("Zdravko", "Jordanov", 29, 36987)
console.log(networkStudentOne)
networkStudentOne.attendCiscoExam() // printed in console ==> OK.




// Create one of each students Check all students with the Student method for checking students academy

//Design student => pass object as an argument for method from Person object constructor
console.log(designStudentOne.returnAcamedy(designStudentOne))

//Code student
console.log(codeStudent.returnAcamedy(codeStudent))

//Network student
console.log(networkStudentOne.returnAcamedy(networkStudentOne))