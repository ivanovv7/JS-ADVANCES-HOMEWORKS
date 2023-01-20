


/** Exercise 1
Create a function that makes api call to the url: "https://swapi.dev/api/people"
After you retrieve the data print the first character in the HTML.
Example:
Character Name: Luke Skywalker
Character Height: 172
Character BirthYear: 19BBY */

//Step 1 
function apiCall () {
    $.ajax({
        url:"https://swapi.dev/api/people",

        success: function(response){
         console.log("*******EXERCISE 1********")//:)
         console.log(response)// i've retrieved an object
         printRetrievedDataHtml(response.results)
        },

        error: function(error){
          console.log(error)
        }
    })
}


let makeApicall = document.getElementById("makeApicall").addEventListener("click", function(){
    apiCall()
})

//Function for printing 

//Step 2
let printRetrievedDataDiv = document.getElementById("printRetrievedDataDiv")

function printRetrievedDataHtml (arrayOfResponse){
    //Since i am looking for RESULTS from my return and RESULTS is an array
    // i use the following syntax(plus print in ul in HTML)
    printRetrievedDataDiv.innerHTML=""

    printRetrievedDataDiv.innerHTML += `
    <ul class = "printedCharacter">
    <li> ${arrayOfResponse[0].name} </li>
    <li> ${arrayOfResponse[0].height}</li>
    <li>${arrayOfResponse[0].birth_year}</li>
     </ul>
     `


}



/**Exercise 2
Create a function that makes api call to the url "https://swapi.dev/api/planets"
After the data is retrived print the planets on the HTMLf*/

function apiCallPlanets() {
    $.ajax({
        url:"https://swapi.dev/api/planets",

        success: function (response) {
        console.log("*******EXERCISE 2********")// :)
        console.log(response)// i got an object as a response
        printThePlanetsApiCall(response.results)
        },

        error: function(error){
            console.log(error)
        }
    })

}


//Select  BUTTON from html and add Evenstlistener at one line
let makeApicallPlanets = document.getElementById("makeApicallPlanets").addEventListener("click", function(){
    apiCallPlanets()
})

//Select div for printing planets
let printRetrievedDataDivPlanets = document.getElementById("printRetrievedDataDivPlanets")

function printThePlanetsApiCall(arrayOfPlanets){
    printRetrievedDataDivPlanets.innerHTML = ""
    
    //Open ul list
    printRetrievedDataDivPlanets.innerHTML+=`<ul>`

    for(let i = 0; i<arrayOfPlanets.length;i++ ){
        // print result and create li on each itereation
       printRetrievedDataDivPlanets.innerHTML+=`
       <li>${arrayOfPlanets[i].name} </li>`

    }
     //Close ul list
    printRetrievedDataDivPlanets.innerHTML+=`</ul>`
}

