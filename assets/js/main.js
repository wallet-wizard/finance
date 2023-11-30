<<<<<<< HEAD
//DOM Declarations
var amountInput = $('#amount-input');
var descInput = $('#description-input');
var todaysDate = $('#todays-date');
var dashboardMonth = $('#dashboard-month');
var newExpenseBtn = $('#new-expense-submit')

var longDate = dayjs().format('dddd D MMMM YYYY');
console.log(longDate)
todaysDate.text(longDate)

dashboardMonth.text(dayjs().format('MMMM'))


//Event listener for 'description' input
descInput.on('keypress', event => {
    if(event.key === 'Enter'){
        console.log('hi')
        console.log(descInput.val());
    }
})

//Event listener for 'amount' input
amountInput.on('keypress', event => {
    if(event.key === 'Enter'){
        console.log('hi')
        console.log(amountInput.val());
    }
})

newExpenseBtn.on('click', () => {
    console.log(amountInput.val())
    console.log(descInput.val())
})

=======
// Function to obtain the country's currency name, code and symbol

var countrySelection = prompt("Please enter your country of residence")

var allCountriesLink = "https://restcountries.com/v3.1/all"

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

// var currencyRateLink = "https://api.currencyapi.com/v3/latest?apikey=" + yourAPIkey + "&currencies=&base_currency=" + localStorage.getItem('currency-code')

// fetch(currencyRateLink).then(function(response){
//     return response.json();
// }).then(function (data){

//     console.log(data)

// })
>>>>>>> 497e0f5635c76e7f34fa132cb3e4369c81f5bb4f
