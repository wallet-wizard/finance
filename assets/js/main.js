//DOM Declarations
var amountInput = $('#amount-input');
var descInput = $('#description-input');
var todaysDate = $('#todays-date');
var dashboardMonth = $('#dashboard-month');
var newExpenseBtn = $('#new-expense-submit')

var longDate = dayjs().format('dddd D MMMM YYYY');
console.log(longDate)
todaysDate.text(longDate)





// GET USER DATA from localStorage
console.log('=======');
console.log('=======');

const currentUser = localStorage.getItem('WalletWizUsername') || null;

// Store DATA
const basicInfo = DATA[currentUser].basicInfo;
const budgets = DATA[currentUser].budgets;
const income = DATA[currentUser].income;
const preferences = DATA[currentUser].preferences;
const CURRENCY_SYMBOL = '$';



// ===== START APP ======= //

startApp();

// ======================= //



// START APP FUNCTION
function startApp() {

    // 1. Return to welcome.html if username is not set.
    if (currentUser === null) {
        window.location.href = '../../welcome.html';
    }

    console.log("USERNAME:", currentUser);
    console.log("DATA:", DATA[currentUser]);

    // 2.Create Budget Blocks
    const budgetInfoDiv = document.querySelector("#budget-information");

    for (let i = 0; i < 5; i++) {
        const newBudgetBlock = createBudgetBlock("Groceries", 100, Math.round((35 / 7 * 31).toFixed(2)));
        budgetInfoDiv.append(newBudgetBlock);
    }
}



// Update Date
dashboardMonth.text(dayjs().format('MMMM'))


//Event listener for 'description' input
descInput.on('keypress', event => {
    if (event.key === 'Enter') {
        console.log('hi')
        console.log(descInput.val());
    }
})

//Event listener for 'amount' input
amountInput.on('keypress', event => {
    if (event.key === 'Enter') {
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



function createBudgetBlock(desc, currentAmount, cap) {


    // ** Create Budget-Block (outer container) ** //
    const budgetBlockRow = document.createElement('div');
    budgetBlockRow.classList.add(
        "row",
        "justify-content-between",
        "justify-content-md-evenly",
        "align-items-center",
        "mb-4", "mt-4",
        "budget-block")


    // ** Create Description (1st column) ** //
    const budgetDesc = document.createElement('h5');
    budgetDesc.classList.add("col-md-2", "desc");
    budgetDesc.innerText = desc;


    // ** Create Graph (2nd column) ** //
    const graphContainer = document.createElement('div');
    graphContainer.classList.add("col-md-4", "row", "ps-3", "p-md-0", "align-items-center", "graph-container");

    // Outer Graph Div
    const graphOuterDiv = document.createElement('div');
    graphOuterDiv.classList.add("col-9", "m-0", "p-0", "outer-graph");

    // Inner Graph Div
    const graphInnerDiv = document.createElement('div');
    graphInnerDiv.classList.add("m-0", "p-0", "inner-graph");

    // Create percentage <span>
    const percentageValue = getPercentage(currentAmount, cap);
    const percentage = createNewEl("span", ["col-3", "percentage"], `${percentageValue}%`);

    // Append Inner Graph to Outer
    graphOuterDiv.append(graphInnerDiv);

    // Append Graph and Percentage to Graph container
    graphContainer.append(graphOuterDiv, percentage);


    // ** Create details container (3rd Column) - holds current / cap amount && button** //
    const detailsContainer = createNewEl("div", ["col", "col-md-6", "row", "justify-content-between", "details-container"]);

    // Create Amount Container (that will include  $current/$cap)
    const amountContainer = createNewEl("p", ["col-6", "m-0", "d-flex", "align-items-center", "amount-container"]);
    // Current Amount Span
    const currentAmountSpan = createNewEl("span", ["number", "current-amount-num"], currentAmount);
    // Cap Amount Span
    const capAmountSpan = createNewEl("span", ["number", "cap-amount-num"], cap);
    //  Divider && Symbol Spans
    const dividerSpan = createNewEl("span", "divider", " / ");
    const symbolSpan1 = createNewEl("span", "currency-symbol", CURRENCY_SYMBOL);
    const symbolSpan2 = createNewEl("span", "currency-symbol", CURRENCY_SYMBOL);

    // Append spans to amount Container
    amountContainer.append(symbolSpan1, currentAmountSpan, dividerSpan, symbolSpan2, capAmountSpan);


    // Create button Container
    const modifyBtnContainer = createNewEl("div", ["col-6", "d-flex", "justify-content-end"]);
    const modifyBtn = createNewEl("button", ["btn", "btn-secondary", "add-remove-btn"], "+");
    modifyBtnContainer.append(modifyBtn);


    // Append amount Container to details Container
    detailsContainer.append(amountContainer, modifyBtnContainer);

    // Append all children to budgetBlockRow (parent)
    budgetBlockRow.append(budgetDesc, graphContainer, detailsContainer);

    return budgetBlockRow;
}





// ** HELPER FUNCTIONS ** //


// 1. Creates new Element of specified classes and text
function createNewEl(el, classes, text = "") {
    // Current newEl
    const newEl = document.createElement(el);

    // If classes is an array, add each type to classList using spread operator
    if (Array.isArray(classes)) {
        newEl.classList.add(...classes);
    } else {
        // If classes is a single string, add it to classList
        newEl.classList.add(classes);
    }

    // Update inner text
    newEl.innerText = text;

    return newEl;
}


// 2. Gets percentage of 2 values
function getPercentage(a, b) {
    if (b === 0) {
        // To avoid division by zero, return an error or handle accordingly
        return "Error: Division by zero";
    }

    let percentage = (a / b) * 100;
    percentage = Math.round(percentage);

    return percentage;
}