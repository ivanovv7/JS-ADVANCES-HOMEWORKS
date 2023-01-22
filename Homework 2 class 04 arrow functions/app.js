console.log("connected")

console.log("*****EXERCISE 1*****")

// ********EXERCISE 1********


// Make 3 anonymous functions (function expressions)

// Function that takes a number through a parameter and returns how many digits that number has
// Function that takes a number through a parameter and returns if its even or odd
// Function that takes a number through a parameter and returns if its positive or negative

// BONUS: Create a function that takes a number through a parameter and calls all three functions for
//  the number that was passed. It should show the results in the console. Ex: Code: getNumberStats(-25); Console: 2 Digits, Odd, Negative


//1***
let digitCounter = function (number) {
  let helperContainer = [];

  let counter = number.toString(); //stringify parametar 

  let arayCounter = counter.split(""); //split into array every digit/ sign -> for negative numbers problem

  //Iterate and clear the "-" operator so that it is not counted as a digit in negative number case
  for (let i = 0; i < arayCounter.length; i++) {
    if (arayCounter[i] !== "-") {
      helperContainer += arayCounter[i];
    }
  }
  //console.log(helperContainer);
  return ` ${helperContainer.length} digits`;
};

console.log(digitCounter(-1256333)) // returned 7, it is working. Problem fixed.

//2***
let evenOrOdd = function (numberToCheck) {

  if (numberToCheck % 2 === 0) {
    return "Even"
  }

  else {
    return "Odd"
  }
}
console.log(evenOrOdd(5))//Console: Odd ok
console.log(evenOrOdd(26))//Console: Even ok

//3***

let positiveOrNegative = function (numberPosNeg) {

  if (numberPosNeg < 0) {
    return "Negative"
  }
  else if (numberPosNeg > 0) {
    return "Positive"
  }
  else {
    return "You have entered 0 :)"
  }
}

console.log(positiveOrNegative(8989))//okay
console.log(positiveOrNegative(-2566))//okay
console.log(positiveOrNegative(0)) // okay

//BONUS***

let numberSummary = function (number) {
  if (number === 0) {
    alert("Please enter positive or negative number :)")
    console.error("Invalid number" + " " + 0)
    return
  }

  return `
         ${digitCounter(number)}, ${evenOrOdd(number)}, ${positiveOrNegative(number)}`;
};

console.log(numberSummary(-8966))//Counts only 4 digits,  the "-" operator/character is excuded ok.
console.log(numberSummary(-2563))//Same
console.log(numberSummary(8966175445))// It is working
// console.log(numberSummary(0)) it is working if 0 is assigned as parametar execution stops





console.log("********EXERCISE 2*********")

// ***********EXERCISE 2***********

// Create a function that takes a string and returns the number (count) of vowels contained within it. (Use anonymous functions/Arrow functions for the implementation)

// Ex: Code: countVowels("Pineapple"); Console: 4 vowels

// BONUS: Provide the input from the HTML, and print the result on the HTML.


//Get elements from HTML********
let inputVowel = document.getElementById("inputVowel");
let placeForVowelsPrint = document.getElementById("placeForVowelsPrint");
let button = document.getElementsByTagName("button")[0];

//Functions***********

//Function that return the counter of vowels
let countVowels = (word) => {
  let vowels = `aeiou`;
  let helper = "";
  let counter = 0;
  //    console.log(inputVowel.value)-WORKS
  //    console.log(typeof(inputVowel.value))-STRING
  helper = word.toLowerCase();
  console.log(helper);//converted to lower case

  // validate input if empty
  if (helper == "") {
    alert("Please provide a word first :)");
  }

  //iterate thru input from user and compare to vowels,
  for (let i = 0; i < helper.length; i++) {
    if (vowels[0] === helper[i]) {
      counter++;
    } else if (vowels[1] === helper[i]) {
      counter++;
    } else if (vowels[2] === helper[i]) {
      counter++;
    } else if (vowels[3] === helper[i]) {
      counter++;
    } else if (vowels[4] === helper[i]) {
      counter++;
    }
  }
  console.log(counter);

  return counter
};

//Function for printing in HTML using the RETURN from "countVowels" function
let printVowelsInHtml = (elementToprintin) => {
  elementToprintin.innerHTML = "";
  elementToprintin.innerHTML = ` In your word there are ${countVowels(inputVowel.value)} vowels`;
  elementToprintin.style.color = "red";
};


//Event listener and calling both functions
button.addEventListener("click", () => {
  countVowels(inputVowel.value)
  printVowelsInHtml(placeForVowelsPrint)

})

