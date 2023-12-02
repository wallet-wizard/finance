//DOM Declarations
var amountInput = $('#amount-input');
var descInput = $('#description-input');
var todaysDate = $('#todays-date');
var dashboardMonth = $('#dashboard-month');
var newExpenseBtn = $('#new-expense-submit')

var longDate = dayjs().format('dddd D MMMM YYYY');
console.log(longDate)
todaysDate.text(longDate)





// GET DATA From localStorage + welcome.html
console.log('=======');
console.log('=======');

const currentUser = localStorage.getItem('WalletWizUsername') || null;

// Return to welcome.html if username is not set.
if (currentUser === null) {
    window.location.href = '../../welcome.html';
}

console.log("USERNAME:", currentUser);
console.log("DATA:", DATA[currentUser]);

// Store DATA
const basicInfo = DATA[currentUser].basicInfo;
const budgets = DATA[currentUser].budgets;
const income = DATA[currentUser].income;
const preferences = DATA[currentUser].preferences;




// Update Date
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



// BUDGETS SECTION

console.log(budgets);
const budgetInfoDiv = document.querySelector("#budget-information");
