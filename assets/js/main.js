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

