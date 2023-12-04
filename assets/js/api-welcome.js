// Function to obtain the country's currency name, code and symbol

// var countrySelection = prompt("Please enter your country of residence")

var allCountries = "https://restcountries.com/v3.1/all"

var allCountriesNamesLink = "https://restcountries.com/v3.1/all?fields=name"

var allCurrenciesLink = "https://restcountries.com/v3.1/all?fields=currencies"

// var restCountryAPILink = "https://restcountries.com/v3.1/name/" + country


// var currencyInfo = fetch(restCountryAPILink).then(function(response){
//     return response.json();
// }).then(function (data){

//     var currencyCode = Object.keys(data[0].currencies)[0];
//     localStorage.setItem('currency-code', currencyCode)

//     var currencyName = data[0].currencies[currencyCode].name;
//     localStorage.setItem('currency-name', currencyName)

//     var currencySymbol = data[0].currencies[currencyCode].symbol;
//     localStorage.setItem('currency-symbol', currencySymbol)



//     var currencyObject = {currencyCode, currencyName, currencySymbol}
//     console.log(currencyObject)
//     return currencyObject

// })


// Function to obtain user's API Key for the currency API

// function getAPIKey(){
//     // var yourAPIkey = null;

//     if(localStorage.getItem('api-key' === null)){
//         yourAPIkey = prompt("Please enter your API key from currencyapi.com");
//         localStorage.setItem('api-key', yourAPIkey)
//     } else {
//         yourAPIkey = localStorage.getItem('api-key')
//     }

//     return yourAPIkey
// }




// Function to obtain the exchange rate, based on the country's code

// var currencyRateLink = "https://api.currencyapi.com/v3/latest?apikey=" + yourAPIkey + "&currencies=&base_currency=" + localStorage.getItem('currency-code')

// fetch(currencyRateLink).then(function(response){
//     return response.json();
// }).then(function (data){

//     console.log(data)

// })


// Creating a drop-down menu of all countries for the user to select from

// Extracting list of countries from the rest countries API

var countryList = []
var currencyList = []

var generateCountryList = fetch(allCountries).then(function(response){

        return response.json();
    }).then(function (data){

        for (var a = 0; a < data.length; a++){
            countryList.push(data[a].name.common)
            // currencyList.push(data[a].currencies[(data[a].currencies)[0]].name)
        }
        countryList.sort()

        addCountriesToDropDown(countryList)

        return countryList
    
    })

var countryDiv = document.getElementById("country");
function addCountriesToDropDown(list){
   
    for(var i = 0; i < list.length; i++){
        var option = document.createElement("option");
        option.setAttribute("value", list[i])
        var textContent = document.createTextNode(list[i]);
        option.appendChild(textContent);        
        countryDiv.appendChild(option);
    }
}


// Extracting list of currencies from the rest countries API

fetch(allCountries).then(function(response){

    return response.json();
}).then(function (data){

    for (var b = 0; b < data.length; b++){
        var currencyName = data[b].currencies ? data[b].currencies[Object.keys(data[b].currencies)[0]].name : ''
        // var currencySymbol = data[b].currencies ? data[b].currencies[Object.keys(data[b].currencies)[0]].symbol : ''
        if (data[b].currencies) {
            currencyList.push(currencyName)
        }
        currencyList.sort()
    }
    
    var uniqueCurrencyList = [... new Set(currencyList)]

    addCurrenciesToDropDown(uniqueCurrencyList, currencyDiv)

    return uniqueCurrencyList

})

var currencyDiv = document.getElementById("currency");

function addCurrenciesToDropDown(list, pageSection){

for(var j = 0; j < list.length; j++){
    var option = document.createElement("option");
    option.setAttribute("value", list[j]);
    // var currencyCode = Object.keys(data[0].currencies)[0];
    var textContent = document.createTextNode(list[j]);
    option.appendChild(textContent);        
    pageSection.appendChild(option);
}

}



// Creating a function so that when the user selects their country of residence, the currency is changed their respective country

countryDiv.addEventListener("change", function(data){
    fetch(allCountries).then(function(response){

        return response.json();
    }).then(function (data){
        for(var c = 0; c < data.length; c++){
            data[c].currencies ? data[c].currencies[Object.keys(data[c].currencies)[0]].name : ''
            if (data[c].name.common === countryDiv.value) {
                currencyDiv.value = data[c].currencies[Object.keys(data[c].currencies)[0]].name
                // console.log(currencyDiv.value)
            }
            }
        })
        
        
})
    




// // Function to obtain the exchange rate, based on the country's code

// // var currencyRateLink = "https://api.currencyapi.com/v3/latest?apikey=" + yourAPIkey + "&currencies=&base_currency=" + localStorage.getItem('currency-code')

// // fetch(currencyRateLink).then(function(response){
// //     return response.json();
// // }).then(function (data){

// //     console.log(data)

// // })


// // var currencyInfo = fetch(currencyRateLink).then(function(response){
// //     return response.json();
// // }).then(function (data){ 

// // })