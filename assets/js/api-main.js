var usersCurrency = JSON.parse(localStorage.getItem('walletWizDataSet')).billy.preferences.currency

console.log(usersCurrency)


// Need to find the user's prefered currency and use the currency code for currency API

var allCountries = "https://restcountries.com/v3.1/all"

fetch(allCountries).then(function(response){

    return response.json();
}).then(function (data){

    for(var d = 0; d < data.length; d++){
        data[d].currencies ? data[d].currencies[Object.keys(data[d].currencies)[0]].name : ''
        if (data[d].currencies[Object.keys(data[d].currencies)[0]].name === usersCurrency) {
            var currencyCode = Object.keys(data[d].currencies)[0]
        }
        }

        return currencyCode
    })
        
    


// Function to obtain the exchange rate, based on the country's code

// var currencyRateLink = "https://api.currencyapi.com/v3/latest?apikey=" + yourAPIkey + "&currencies=&base_currency=" + usersCountry

// fetch(currencyRateLink).then(function(response){
//     return response.json();
// }).then(function (data){

//     console.log(data)

// })
