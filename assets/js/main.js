// Function to obtain the country's currency name, code and symbol

var countrySelection = prompt("Please enter your country of residence")

var restCountryAPILink = "https://restcountries.com/v3.1/name/" + countrySelection


var currencyInfo = fetch(restCountryAPILink).then(function(response){
    return response.json();
}).then(function (data){

    var currencyCode = Object.keys(data[0].currencies)[0];
    localStorage.setItem('currency-code', currencyCode)

    var currencyName = data[0].currencies[currencyCode].name;
    localStorage.setItem('currency-name', currencyName)

    var currencySymbol = data[0].currencies[currencyCode].symbol;
    localStorage.setItem('currency-symbol', currencySymbol)



    var currencyObject = {currencyCode, currencyName, currencySymbol}
    console.log(currencyObject)
    return currencyObject

})


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



var currencyRateLink = "https://api.currencyapi.com/v3/latest?apikey=" + yourAPIkey + "&currencies=&base_currency=" + localStorage.getItem('currency-code')

fetch(currencyRateLink).then(function(response){
    return response.json();
}).then(function (data){

    console.log(data)

})