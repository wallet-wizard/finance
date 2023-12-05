// Compiling list of currencies in Currency Exchange section:

// const currentUser = localStorage.getItem('WalletWizUsername') || null;

var allCountries = "https://restcountries.com/v3.1/all?fields=name,currencies"

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

// Confirming the currency code for base and new currencies
// Using currency API to find out the current exchange rate
// Use the current exchange rate to amend figures and currency symbol
var baseCode = DATA[currentUser].preferences.currency

var currencyAPILink = "https://api.currencyapi.com/v3/latest?apikey=" + yourAPIkey + "&currencies=&base_currency=" + baseCode

var currencySubmitButton = document.getElementById("currency-exchange-button")

currencySubmitButton.addEventListener("click", function() {
    var newCurrency = currencyExchangeDropDown.value;

    fetch(currencyAPILink).then(function(response){
    return response.json()
}).then(function(data){
    var exchangeRate = data.data[newCurrency].value

    var newCurrencySymbol = Intl.NumberFormat('en-GB', {style:"currency", currency: newCurrency, currencyDisplay: "narrowSymbol"}).format(0)[0]
    var allSymbolElements = document.querySelectorAll('.currency-symbol');
    allSymbolElements.forEach(element => {
        element.innerText = newCurrencySymbol
    })


    var allNumberElements = document.querySelectorAll('.number');
    allNumberElements.forEach(element => {
        var updatedValue = Number(element.dataset.baseAmount) * exchangeRate
        element.innerText = updatedValue.toFixed(2)
    })
    })


    
})


// Updating the currency symbol upon user login

    var newCurrencySymbol = Intl.NumberFormat('en-GB', {style:"currency", currency: baseCode, currencyDisplay: "narrowSymbol"}).format(0)[0]
    var allSymbolElements = document.querySelectorAll('.currency-symbol');
    allSymbolElements.forEach(element => {
        element.innerText = newCurrencySymbol
    })