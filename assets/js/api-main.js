// Compiling list of currencies in Currency Exchange section:

var allCountries = "https://restcountries.com/v3.1/all"

var countryList = []
var currencyList = []

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

    addCurrenciesToDropDown(uniqueCurrencyList, currencyExchangeDropDown)

    return uniqueCurrencyList

})

var currencyExchangeDropDown = document.getElementById("currency-exchange")

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




var usersCurrency = JSON.parse(localStorage.getItem('walletWizDataSet')).billy.preferences.currency


// Need to find the user's prefered currency and use the currency code for currency API

fetch(allCountries).then(function(response){

    return response.json();
}).then(function (data){

    for(var d = 0; d < data.length; d++){
        data[d].currencies ? data[d].currencies[Object.keys(data[d].currencies)[0]].name : '';
        if (data[d].currencies[Object.keys(data[d].currencies)[0]].name === usersCurrency) {
            var currencyCode = Object.keys(data[d].currencies)[0];
            // setBaseCurrency(currencyCode)
        }
        }
        

        return currencyCode
    })
        
    


// Function to obtain the exchange rate, based on the country's code


// function setBaseCurrency(baseCurrencyCode, newCurrencyCode){
//     var currencyRateLink = "https://api.currencyapi.com/v3/latest?apikey=" + yourAPIkey + "&currencies=&base_currency=" + baseCurrencyCode

//     fetch(currencyRateLink).then(function(response){
//         return response.json();
//     }).then(function (data){
    
//         console.log(data)
    
//     })
    
// }

