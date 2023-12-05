var allCountries = "https://restcountries.com/v3.1/all?fields=name,currencies"

// Extracting list of currencies from the rest countries API

fetch(allCountries).then(function(response){
    return response.json()
}).then(res => {
    var countriesWithCurrencies = res.map(country => {
        var currencyCode = Object.keys(country.currencies)

        return {
            name: country.name.common,
            currency: currencyCode.length !== 0 ? {
                name: country.currencies[currencyCode[0]].name,
                symbol: country.currencies[currencyCode[0]].symbol,
                code: currencyCode[0]
            } : null
        }
    })

    var sortedListOfCountries = countriesWithCurrencies.sort((a, b) => a.name > b.name ? 1 : -1)

    addCurrenciesToDropDown(sortedListOfCountries)
    addCountriesToDropDown(sortedListOfCountries)
})

var countryDiv = document.getElementById("country");
function addCountriesToDropDown(list){

    var countriesWithValidCurrencies = list.filter(item => item.currency)
   
    for(var i = 0; i < countriesWithValidCurrencies.length; i++){
        var option = document.createElement("option");
        option.setAttribute("value", countriesWithValidCurrencies[i].currency.code)
        var textContent = document.createTextNode(countriesWithValidCurrencies[i].name);
        option.appendChild(textContent);        
        countryDiv.appendChild(option);
    }
}


var currencyDiv = document.getElementById("currency");

function addCurrenciesToDropDown(list){
    var countriesWithValidCurrencies = list
        .filter(item => item.currency)
        .filter((item, index, arr) => index === arr.findIndex(l => l.currency.name === item.currency.name))
        .sort((a, b) => a.currency.name > b.currency.name ? 1 : -1)

    for(var j = 0; j < countriesWithValidCurrencies.length; j++){
        var option = document.createElement("option");
        option.setAttribute("value", countriesWithValidCurrencies[j].currency.code);
        var textContent = document.createTextNode(countriesWithValidCurrencies[j].currency.name);
        option.appendChild(textContent);        
        currencyDiv.appendChild(option);
    }

}



// Creating a function so that when the user selects their country of residence, the currency is changed their respective country

countryDiv.addEventListener("change", function(event){
    console.log(event.target.value)
    currencyDiv.value = event.target.value
    
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