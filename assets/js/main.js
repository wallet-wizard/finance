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

newExpenseBtn.on('click', () => {
    console.log(amountInput.val())
    console.log(descInput.val())
})

