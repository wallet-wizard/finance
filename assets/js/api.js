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


// Creating a drop-down menu of all countries for the user to select from

// EXTRACT LIST FROM API

var countryList = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua & Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &; Tobago","Tunisia","Turkey","Turkmenistan","Turks &; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

function countryDropDownMenu(){
    var countryDiv = document.getElementById("country");

    for(var i = 0; i < countryList.length; i++){
        var option = document.createElement("option");
        option.setAttribute("value", countryList[i])
        var textContent = document.createTextNode(countryList[i]);
        option.appendChild(textContent);
        // ADD ATTRIBUTE FOR EACH COUNTRY
        
        countryDiv.appendChild(option);
    }

}

countryDropDownMenu()


// Function to obtain the exchange rate, based on the country's code

var currencyRateLink = "https://api.currencyapi.com/v3/latest?apikey=" + yourAPIkey + "&currencies=&base_currency=" + localStorage.getItem('currency-code')

fetch(currencyRateLink).then(function(response){
    return response.json();
}).then(function (data){

    console.log(data)

})


// var currencyInfo = fetch(currencyRateLink).then(function(response){
//     return response.json();
// }).then(function (data){ 

// })
