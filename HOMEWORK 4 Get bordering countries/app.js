console.log("connected")

/* *** *** ***  EXERCISE DESCRIPTION AND REQUIREMENT *** *** ***  */ 

// Get bordering countries function

// all the countries API for a country by code.
// Create a function that gets all the neighbours from a country and returns them in console
// When the call to the countires API for a country is made imidietly show the bordering countries in the console
// Example:

// Call -> MKD

// In console:

// Conutry:

// macedonia object

// Neighbours:

// albania object

// greece object

// bulgaria object

// serbia object



// GET ELEMETS FROM HTML

let button = document.getElementsByTagName("button")[0]

let input = document.getElementById("input")




// API CALL FUNCTION
let getCountries = (url) => {

    fetch(url)
        .then((response) => {
            let readResponse = response.json()

            return readResponse
        })

        .then((getReturn) => {
            console.log("Chosen country =>",getReturn[0])
            
            let bordersOfcountry = getReturn[0].borders //ARRAY of codes from neighbour countries will be used in second fetch

            //console.log(bordersOfcountry) 
            //for each border country make api call and console.log it
            bordersOfcountry.forEach((border) => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                    .then((response) => {
                        let readedResponse = response.json()
                        return readedResponse
                    })
                    .then((dataFromCall) => {
                        console.log("Border =>",dataFromCall[0],)
                    })
                    .catch((er) => {
                        console.log("Error has occured for bordering contries ", er)
                    })
            })

        })
        
        // catch for main/first call
        .catch((er) => {
            console.log("Error has occured", er)
        })

}



// Event listener
button.addEventListener("click", function () {
    getCountries(`https://restcountries.com/v3.1/alpha/${input.value}`)

})
