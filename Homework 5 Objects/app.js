console.log("*** connected ***")

console.log("****** EXERCISE 1 ******")

// Exercise 1
// Create 3 object templates. Academy, Student and Subject. The structure should be: 

//1. Academy

// Name - string
// Students - array of Students
// Subjects - array of Subjects
// Start - Date when it starts
// End - Date when it ends
// NumberOfClasses - number of subjects * 10, not settable
// PrintStudents - method that prints all students in console
// PrintSubjects - method that prints all subjects in console

function Academy(name, studentsAcademy, subjects, start, end) {
    this.name = name; // this should be an string
    this.studentsAcademy = studentsAcademy; // this should be an array
    this.subjects = subjects; // this should be an array
    this.start = start;
    this.end = end;

    this.numberOfClasses = this.subjects.length * 10;

    this.printStudents = function () {
        this.studentsAcademy.forEach((student) => {
            console.log("The studentsAcademy are :", student)
        });
    }

    this.printSubjects = function () {
        this.subjects.forEach((subject) => {
            console.log("The subjects are:", subject)
        })
    }
}

let sedc = new Academy("SEDC", ["ivan", "sara", "dragan", "ance"], ['javascript', "html", "css"], "10.10.2022", "10.11.2023")

let {studentsAcademy} = sedc // Object destruction => will be used in EXERCISE 2

//console.log(sedc.subjects.length) => works 

console.log(sedc)
sedc.printStudents() // works
sedc.printSubjects()//works


// 2. Subject

// Title - string
// NumberOfClasses - default 10, not settable
// isElective - boolean
// Academy - Academy object
// Students - array of Students
// OverrideClasses - accepts a number and rewrites the NumberOfClasses property with that number. The number can't be smaller than 3.

function Subject(title, isElective, academy, studentsSubject){
    this.title = title; // this should be string
    this.isElective = isElective; // this should be boolean
    this.academy = academy; // this should be object
    this.studentsSubject = studentsSubject;// this should be array

    this.numberOfClasses = 10

    this.overrideClasses = function(number){
        number >= 3 ? this.numberOfClasses = number : console.log(`number ${number} is smaller than "3" pleace provide a larger number`)
    }
}

let advancedJs = new Subject("javascript",true,{name:"sedc", started:1995, employees:1200,},['ivan','ance','sara','dragan'])

let {studentsSubject} = advancedJs // Object destruction => will be used in EXERCISE 2

console.log(advancedJs) // console log the new INSTANCE 

advancedJs.overrideClasses(5) // when i put smaller number than 3 i get the error and "numberOfClasses" is not changed
console.log(advancedJs.numberOfClasses) // it is 5 as expected



//3. Student

// FirstName - string
// LastName - string
// Age - number
// CompletedSubjects - emptyArray as default, not settable
// Academy - null as default, not settable
// CurrentSubject - null as default, not settable
// StartAcademy - accepts Academy object that it sets to the Academy property of the student
// StartSubject - accepts Subject object and adds it to the CurrentSubject property but only if the student has an Academy  => =>
//object in the Academy property and that subject exists in the academy. If not, give error in console and do not set the CurrentSubject property


function Student(firstName, lastName, age,) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age

    this.completedSubjects = [];
    this.academy = null;
    this.currentSubject = null;

    this.startAcademy = function (academyObject) {
        this.academy = academyObject
        studentsAcademy.push(firstName) // studentsAcademy is a property form Academy constructor generated from destruction for => EXERCISE 2
    }

    this.startSubject = function (subjectObject) {
        //check if property academy has a value, if it has proceed adding value to "currentSubject"
        if (this.academy !== null) {
            // at this point on first instance the value for "currentSubject" is null so nothing will be transfered to "completedSubjects"
            //on second/third... instance the currentSubject is pushed to completedSubjects, and =>
            this.completedSubjects.push(this.currentSubject) 

            //Clear the array becouse the currentSubject was transfered to completedSubjects
            this.currentSubject=[]
             
            // Add the new object from the current instance in the previously cleared array
            this.currentSubject = subjectObject

            studentsSubject.push(this.firstName) // studentsSubject is a property form Subject constructor generated from destruction for => EXERCISE 2

            
        }

        else {
            console.error("ACADEMY WAS NOT CHOSEN PLEASE FIRST CHOOSE ACADEMY")
        }
    }

}


let newStudent = new Student("Tester Exercise 2", "ivanov", 27)


console.log(newStudent)

newStudent.startAcademy(newStudent) //if i comment-out this, an error is shown as expected => EXERCISE 2
 
newStudent.startSubject(advancedJs)// dummy call for testing => EXERCISE 2

console.log(studentsAcademy) // new Student is pushed "Tester Exercise 2" => EXERCISE 2
console.log(studentsSubject) // new Student is pushed 

console.log(newStudent.completedSubjects) // for first instance it is "NULL" since there is nothing to be pushed in completedSubjects
console.log(newStudent.currentSubject)// for the first instance the currentSubject is displayed as expected



// Exercise 2

// Make the functions StartAcademy and StartSubject dynamic.

// StartAcademy - When the student calls StartAcademy, the student should also be added to the Academy property Students ( The academy that he is starting )

// StartSubject - When the student calls StartSubject the student should also be added to the Subject property Students ( The subject that he is starting ). 
// If there was another subject in the CurrentSubject property, that subject should be transferred to CompletedSubjects and then add the new Subject




sedc.printStudents() // students are updated in Academy