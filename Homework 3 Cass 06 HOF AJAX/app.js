console.log("connected")

// Exercise 1
// There is a JSON file with students. Make a call to the file and get the following data from it:

//  1 All students with an average grade higher than 3
//  2 All female student names with an average grade of 5
//  3 All male student full names who live in Skopje and are over 18 years old
//  4 The average grades of all female students over the age of 24
//  5 All male students with a name starting with B and average grade over 2
//    Use higher order functions to find the answers Link: https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json


function ajaxCall() {

    $.ajax({
        url: "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json",

        success: function (response) {
            let parsedResponse = JSON.parse(response) // => STRING (why was it string when i used JQUERY ? )
            console.log(typeof (parsedResponse)) // => OBJECT ?
            
            //Call function for printing/storeing objectives from Exercise 1
            printObjectives(parsedResponse)
        },

        error: function (error) {
            console.log(error)
        }
    })
}

// CALL FUNCTION FOR AJAX
ajaxCall()

// Get Div from HTML to print first objective only
let resultDiv = document.getElementById("resultDiv")



function printObjectives(responseFromCall) {
    // 1 students with an average grade higher than 3
    responseFromCall.forEach((element) => {
        element.averageGrade > 3 ? resultDiv.innerHTML += `${element.id} ${element.firstName} <br>` : "default" // Useing ternary operator for simple true/false operation
    })
    // 2 All female student names with an average grade of 5
    let femaleStudents = responseFromCall.filter((elements) => {

        return elements.averageGrade === 5 && elements.gender == "Female"//filtered all the female stuents with grade = 5
    })
    console.log(femaleStudents)
    // Use forEach to print names in console of filtered  female students
    femaleStudents.forEach((item) => {
        console.log(item.firstName)
    })

    // 3 All male student full names who live in Skopje and are over 18 years old
    let maleStudents = responseFromCall.filter((arrayObject) => {
        return arrayObject.gender == "Male" && arrayObject.city == "Skopje"
    })
    console.log(maleStudents) // it is ok checked in console

    //Use for each to print all male students full names who passed requirements
    maleStudents.forEach((passedMale) => (
        console.log(`${passedMale.firstName} ${passedMale.lastName}`) // it works
    ))

    //  4 The average grades of all female students over the age of 24
    let femaleStudentsOver24Grades = responseFromCall.filter((femaleStudent) => {
        return femaleStudent.age > 24 && femaleStudent.gender == "Female"

    })
    console.log(femaleStudentsOver24Grades) // it works

    let filteredFemaleAvgGrades = femaleStudentsOver24Grades.map((female) => {
        return female.averageGrade
    })
    console.log(filteredFemaleAvgGrades) // now i have stored/returned the avg grades of all female students over age 24


    // 5. All male students with a name starting with B and average grade over 2

    let maleStuentsGradeOverTwo = responseFromCall.filter((elementOfIteration) => {
        return elementOfIteration.gender == "Male" && elementOfIteration.averageGrade > 2

    })
    console.log(maleStuentsGradeOverTwo) //i filtered and stored in variable the 2 conditions => male and grade over 2

    let finalMaleFilterLetterB = maleStuentsGradeOverTwo.filter((maleElements) => {

        return maleElements.firstName[0] == "B"
    })

    console.log(finalMaleFilterLetterB) // Objective finised, 5 students stored with: avg over 2, males, name starts with letter "B"

}     






