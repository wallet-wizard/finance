// Function to obtain the country's currency name, code and symbol

var countrySelection = prompt("Please enter your country of residence")

var restCountryAPILink = "https://restcountries.com/v3.1/name/" + countrySelection

fetch(restCountryAPILink).then(function(response){
    return response.json();
}).then(function (data){

    console.log(data[0].currencies)

})



// Function to obtain the exchange rate, based on the country's code