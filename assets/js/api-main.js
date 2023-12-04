// Compiling list of currencies in Currency Exchange section:

// const currentUser = localStorage.getItem('WalletWizUsername') || null;
// var baseCode = DATA[currentUser].preferences.currencyCode
var allCountries = "https://restcountries.com/v3.1/all?fields=name,currencies"
// var allCurrencies = `https://api.currencyapi.com/v3/latest?apikey=cur_live_D2q3pLXOGPUlu8h9OYqy3BldNfsU0IzxtcivwgEb&currencies=&base_currency=${}`

var currencyList = []

var currencyExchangeDropDown = document.getElementById("currency-exchange")

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
})

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
        currencyExchangeDropDown.appendChild(option);
    }

}


var currencySubmitButton = document.getElementById("currency-exchange-button")

currencySubmitButton.addEventListener("click", function() {
    var newCurrency = currencyExchangeDropDown.value;
    
    console.log({newCurrency})
})