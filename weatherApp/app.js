console.log("***connected***")

let input = document.getElementById("input")
let btnSearch = document.getElementById("btnSearch")
let testdiv = document.getElementById("testDIV")
let weatherStatsSection = document.getElementById("weatherStatsSection")
let cityNameHtml = document.getElementById("cityName")
let currentFeelsLikeHtml = document.getElementById("currentFeelsLike")
let IconAndIconTextHtml = document.getElementById("IconAndIconText")
let statsTable = document.getElementById("statsTable")
let warmestTimeHtml = document.getElementById("warmestTimeHtml")
let coldestTimeHtml = document.getElementById("coldestTimeHtml")
let hourlyTable = document.getElementById("hourlyTable")
let hourlySection = document.getElementById("hourlySection")
let homeBtn = document.getElementById("homeBtn")
let hourlyBtn = document.getElementById("hourlyBtn")


//AJAX CALL FOR WEATHER STATS
function weatherAPI() {
    let weatherUrl = ` https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&units=metric&APPID=2095b65c75e8d13fe9e3b0e095b36936`
    $.ajax({
        url: weatherUrl,
        success: function (response) {
            console.log(response)

            let wrapperObject = getWeatherStats(response) //store the response from the function to get the newly created object
            printHtmlWeatherStats(wrapperObject)// use the returned object as a parametar for print function

            getAndPrintHourlyStats(response)// get and print at the same time HOURLY DATA
        },

        error: function (error) {
            console.log("unavailable, request limit, no page like that, access denied")
        }
    })

}

//EVENT LISTENERS FOR 3 BUTTONS

btnSearch.addEventListener("click", function () {
    weatherAPI()
    //Hourly display is set to "none" bcs on second search we need to go back on first view
    hourlySection.style.display = ("none")
    weatherStatsSection.style.display = ("block")
})

homeBtn.addEventListener("click", function () {
    //CSS manipulation for HOME BUTTON => hide hourly view and show wehaterstats view
    hourlySection.style.display = ("none")
    weatherStatsSection.style.display = ("block")
})

hourlyBtn.addEventListener("click", function () {
    //VICE VERSA => TO EVENT LISTENER FOR HOME BUTTON
    hourlySection.style.display = ("block")
    weatherStatsSection.style.display = ("none")
})


//FUNCTION FOR GETTING STATS FOR VIEW 1 (DISPLAY WEATHER STATS) WHICH RETURNS OBJECT WITH ALL NEEDED STATS
function getWeatherStats(apiResponse) {
    let objectWeatherStats = {} // The object-wrapper for  all stats for view => WEATHER STATICTICS

    objectWeatherStats.cityName = apiResponse.city.name
    objectWeatherStats.curentAndFeelsLikeTemp = [apiResponse.list[0].main.temp, apiResponse.list[0].main.feels_like]// add current and feelsLike in ARRAY!!

    let highestTemp = apiResponse.list[0].main.temp_max  // store the first temp from first array as comparing number for loop, tried with number "0" but what=>
    // if it is colder like -10 all the time i will get 0 the one i set. Like this is dynamic and correct :))))))

    let warmestTime = apiResponse.list[0].dt_txt
    //console.log(warmestTime)

    for (let i = 0; i < apiResponse.list.length; i++) { //loop to get all high-temps from api call and devide by number of periods to get avg
        if (highestTemp <= apiResponse.list[i].main.temp_max) {
            highestTemp = apiResponse.list[i].main.temp_max
            warmestTime = apiResponse.list[i].dt_txt // use the same loop to find warmest time/period 
        }
    }

    //console.log(warmestTime)
    //console.log(` The highest temp for the next days is: ${highestTemp}`) // it works :))
    objectWeatherStats.warmestTimes = warmestTime
    objectWeatherStats.tempMax = highestTemp // store max-temp in object as new property type NUMBER!!
    //console.log(objectWeatherStats) //Super clean, :D they are stored

    //******Same logic (copy-paste :) ) as for the MaxTemp i will not comment for cleaner code******

    let lowestTemp = apiResponse.list[0].main.temp_min//same here, dynamic starting point for comparing loop!

    let coldestTime = apiResponse.list[0].dt_txt

    for (let i = 0; i < apiResponse.list.length; i++) {
        if (lowestTemp >= apiResponse.list[i].main.temp_min) {
            lowestTemp = apiResponse.list[i].main.temp_min
            coldestTime = apiResponse.list[i].dt_txt
        }
    }
    //console.log(` The lowest temp for the next days is: ${lowestTemp}`) // it works !

    objectWeatherStats.coldestTimes = coldestTime
    objectWeatherStats.tempMin = lowestTemp // it works fine

    //* *** Find average Temp*** */

    let averageTemp = 0

    for (let i = 0; i < apiResponse.list.length; i++) {
        averageTemp += apiResponse.list[i].main.temp
    }
    averageTemp = averageTemp / apiResponse.list.length //devide sum of all temp with number of readings to get avg

    objectWeatherStats.tempAvg = averageTemp // added to object

    // *** HUMIDITY *** => same logic as temperature

    let humidityMax = apiResponse.list[0].main.humidity

    for (let i = 0; i < apiResponse.list.length; i++) {
        if (humidityMax <= apiResponse.list[i].main.humidity) {
            humidityMax = apiResponse.list[i].main.humidity
        }
    }
    objectWeatherStats.humidityMaxi = humidityMax // add to object

    let humidityMin = apiResponse.list[0].main.humidity

    for (let i = 0; i < apiResponse.list.length; i++) {
        if (humidityMin >= apiResponse.list[i].main.humidity) {
            humidityMin = apiResponse.list[i].main.humidity
        }
    }
    objectWeatherStats.humidityMini = humidityMin // add to object

    let averageHum = 0

    for (let i = 0; i < apiResponse.list.length; i++) {
        averageHum += apiResponse.list[i].main.humidity
    }
    averageHum = averageHum / apiResponse.list.length
   // console.log(averageHum) calculation => ok

    objectWeatherStats.averageHumi = averageHum
    //console.log(objectWeatherStats) => it is stored, ok


    //testdiv.innerHTML = `<img src="http://openweathermap.org/img/w/${apiResponse.list[0].weather[0].icon}.png" alt="">` the icon is printed in the HTML

    let icon = `<img class="weatherViewIconJs" src="http://openweathermap.org/img/w/${apiResponse.list[0].weather[0].icon}.png" alt="">` //current weather icon thats why array [0], and assign class
    objectWeatherStats.icon = icon // store the link in WRAPPEROBJECT to use it later for print in HTML

    let iconText = apiResponse.list[0].weather[0].main
    //console.log(iconText) it works

    objectWeatherStats.iconTexti = iconText
    //console.log(objectWeatherStats) => stored, ok

    return objectWeatherStats // return the wrapped object with all needed stats and => use it in ajax-success for printing in html

}

//FUNCTION FOR PRINTING DISPLAY WEATHER STATS, RECIEVING THE GENERATED WRAPPED-OBJECT AS AN ARGUMENT
function printHtmlWeatherStats(object) {
    cityNameHtml.innerHTML = `City Name : ${object.cityName}`
    currentFeelsLikeHtml.innerHTML = `Current temp: ${object.curentAndFeelsLikeTemp[0]} Feels like:${object.curentAndFeelsLikeTemp[1]} ` // i storred them in array in wrapped object
    IconAndIconTextHtml.innerHTML = `${object.iconTexti}:${object.icon} `
    statsTable.innerHTML = `<tr> 
    <td>Max temp: ${Math.round(object.tempMax)}</td>
    <td>Max humidity: ${Math.round(object.humidityMaxi)}%</td></tr>
    <tr><td>Avg temp: ${Math.round(object.tempAvg)}</td>
    <td>Avg humidity: ${Math.round(object.humidityMaxi)}%</td></tr>
    <tr><td>Low temp: ${Math.round(object.tempMin)}</td>
    <td>Avg humidity: ${Math.round(object.averageHumi)}%</td>
    </tr>
    `
    warmestTimeHtml.innerHTML = ` Warmest time of te period: ${object.warmestTimes}`
    coldestTimeHtml.innerHTML = `Coldest time of the period: ${object.coldestTimes}`


}

//FUNCTION FOR GET,CREATE AND PRINT HOURLY DATA => RECIEVES THE WHOLE RESPONSE AS ARGUMENT !
function getAndPrintHourlyStats(object) {
    //Create table header cells in te first row for STATIC values of the HOURLY VIEW TABLE !
    hourlyTable.innerHTML += `<tr>
   <th>Icon</th>
   <th>Description</th>
   <th>Date</th>
   <th>Temperature</th>
   <th>Humidity</th>
   <th>Wind Speed</th> </tr>`

    //Iteratte thru response to create all the tr and td for the hourly view table of 40 results
    for (let i = 0; i < object.list.length; i++) {
        hourlyTable.innerHTML += `<tr>
      <td> <img class="hourlyViewIcons" src="http://openweathermap.org/img/w/${object.list[i].weather[0].icon}.png" alt="">  </td> 
      <td> ${object.list[i].weather[0].description}</td>
      <td>${object.list[i].dt_txt}</td>
      <td>${object.list[i].main.temp} °C</td>
      <td>${object.list[i].main.humidity} %</td>
      <td>${object.list[i].wind.speed}km/h</td>
      </tr>`
    }
}
