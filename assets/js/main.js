//DOM Declarations
var amountInput = $('#amount-input');
var descInput = $('#description-input');
var todaysDate = $('#todays-date');
var dashboardMonth = $('#dashboard-month');
var newExpenseBtn = $('#new-expense-submit')

var longDate = dayjs().format('dddd D MMMM YYYY');
todaysDate.text(longDate)




// ============ USER DATA ============= //

// GET USER DATA from localStorage (or "null" if key doesn't exist in localStorage)
const currentUser = localStorage.getItem('WalletWizUsername') || null;

// USER DATA LOG (for testing / checking)
console.log("Current User:", currentUser);
console.log("DATA", DATA[currentUser]);

// Return to welcome.html if username is not set.
if (currentUser === null) {
    console.log("here");
    window.location.href = '../../welcome.html';
} else if (currentUser !== DATA[currentUser].basicInfo.username) {
    window.location.href = '../../welcome.html';
}

// Store USER DATA
const basicInfo = DATA[currentUser].basicInfo;
const budgets = DATA[currentUser].budgets;
const income = DATA[currentUser].income;
const preferences = DATA[currentUser].preferences;
const CURRENCY_SYMBOL = '$'; // This needs updating depending on user preference

// ================================== //


// Update Date
dashboardMonth.text(dayjs().format('MMMM'))
const DAYSINMONTH = dayjs().daysInMonth();
// console.log("DAYS IN MONTH: ", DAYSINMONTH);





// ====== START APP ====== //

startApp();

// ======================= //


// START APP (MAIN) FUNCTION
// Runs of page refresh

function startApp() {

    // Clear Current Amounts if it's 1st of the month, 
    // maybe give report to user before? 
    // TBC //


    // Create Budget Blocks
    const budgetInfoDiv = document.querySelector("#budget-information");

    for (const budget of budgets) {
        // Store data, convert to Numbers
        const budgetDesc = budget.desc;
        let current = 0;
        if (!isNaN(Number(budget.currentAmount))) {
            current = Number(budget.currentAmount).toFixed(2);
        }
        const cap = Number(budget.amount);
        const frequency = Number(budget.freq);

        // Get Converted amount
        const convertedAmount = getRates(cap, frequency, 5);

        //  Create budget-block and append it
        const newBudgetBlock = createBudgetBlock(budgetDesc, current, convertedAmount);
        budgetInfoDiv.append(newBudgetBlock);
    }
    
    
    //  Get total monthly income (needed to create income percentages)
    let totalMonthlyIncome = 0;
    for (incomeSource of income) {
        // Store data, convert to Numbers
        const sourceAmount = Number(incomeSource.amount);
        const sourceFrequency = Number(incomeSource.freq);
        const sourceConvertedAmount = getRates(sourceAmount, sourceFrequency, 5);

        totalMonthlyIncome += Number(sourceConvertedAmount)
    }


    // Create Income Blocks (responsive)
    const incomeGraphs = document.querySelector(".income-graphs");
    
    for (incomeSource of income) {
        // Income Source Desc
        const incomeDesc = incomeSource.desc;

        // Income amount (5-Monthly)
        const sourceAmount = Number(incomeSource.amount);
        const sourceFrequency = Number(incomeSource.freq);
        const sourceConvertedAmount = getRates(sourceAmount, sourceFrequency, 5);
        
        // Create Graph
        const newGraph = createIncomeGraph(incomeDesc, sourceConvertedAmount, totalMonthlyIncome)
        // Append it to income-graphs div
        incomeGraphs.append(newGraph);
    }   
}




//Event listener for 'description' input
descInput.on('keypress', event => {
    if (event.key === 'Enter') {
        // console.log('hi')
        // console.log(descInput.val());
    }
})

//Event listener for 'amount' input
amountInput.on('keypress', event => {
    if (event.key === 'Enter') {
        // console.log('hi')
        // console.log(amountInput.val());
    }
})

newExpenseBtn.on('click', () => {
    // console.log(amountInput.val())
    // console.log(descInput.val())


    // Update Dashboard Section
    // TBC //

})




// ================================== //

// DYNAMICALLY CREATED ELEMENTS

// BUDGETS SECTION

function createBudgetBlock(desc, currentAmount, cap) {

    // ** Create Budget-Block (outer container) ** //
    const budgetBlockRow = createNewEl("div", ["row", "justify-content-between", "justify-content-md-evenly", "align-items-center", "mb-4", "mt-4", "budget-block"]);


    // ** Create Description (1st column) ** //
    const budgetDesc = createNewEl("h5", ["col-md-2", "ms-md-2", "me-md-1", "desc"], desc);


    // ** Create Graph (2nd column) ** //
    const graphContainer = createNewEl("div", ["col-md-3", "row", "ps-3", "m-md-3", "p-md-0", "align-items-center", "graph-container"])

    // Create percentage <span>
    const percentageValue = getPercentage(currentAmount, cap);
    const percentage = createNewEl("span", ["col-3", "percentage"], `${percentageValue}%`);

    // Outer Graph Div
    const graphOuterDiv = document.createElement('div');
    graphOuterDiv.classList.add("col-9", "m-0", "p-0", "outer-graph");

    // Inner Graph Div
    const graphInnerDiv = document.createElement('div');
    graphInnerDiv.classList.add("m-0", "p-0", "inner-graph");

    // Update inner graph and colours based on percentage
    if (percentageValue > 100) {
        graphInnerDiv.setAttribute("style", `width: 100%; background-color: red`)
    } else if (percentageValue > 85) {
        graphInnerDiv.setAttribute("style", `width: ${percentageValue}%; background-color: orange`);
    } else if (percentageValue > 50) {
        graphInnerDiv.setAttribute("style", `width: ${percentageValue}%; background-color: yellow`);
    }
    else {
        graphInnerDiv.setAttribute("style", `width: ${percentageValue}%`)
    }

    // Append Inner Graph to Outer
    graphOuterDiv.append(graphInnerDiv);

    // Append Graph and Percentage to Graph container
    graphContainer.append(graphOuterDiv, percentage);


    // ** Create details container (3rd Column) - holds current / cap amount && button** //
    const detailsContainer = createNewEl("div", ["col", "col", "ms-md-2", "row", "justify-content-between", "details-container"]);

    // Create Amount Container (that will include  $current/$cap)
    const amountContainer = createNewEl("p", ["col-6", "m-0", "d-flex", "align-items-center", "amount-container"]);
    // Current Amount Span
    const currentAmountSpan = createNewEl("span", ["number", "current-amount-num"], currentAmount);
    // Cap Amount Span
    const capAmountSpan = createNewEl("span", ["number", "cap-amount-num"], cap);
    //  Divider && Symbol Spans
    const dividerSpan = createNewEl("span", ["divider", "with-space"], "/");
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


// INCOME GRAPHS

function createIncomeGraph(desc, amount, total) {

    const amountStr = `${CURRENCY_SYMBOL}${amount}` 

    // // Outer Block
    const incomeGraphBlock = createNewEl("div", ["d-flex", "flex-column", "mb-2", "income-graph-container"]);

    // Income Source | percentage
    const descContainer = createNewEl("p", ["graph-text", "mb-1"]);
    const descSpan = createNewEl("span", ["desc", "mb-1"], desc);

    if (amount !== 0) {
        const dividerSpan = createNewEl("span", ["divider", "mb-1", "ms-2", "me-2"], "|");
        const symbolSpan = createNewEl("span", ["amount", "mb-1"], amountStr);
        descContainer.append(descSpan, dividerSpan, symbolSpan);
    } else {
        return;
    }

    // console.log("Amount:", amount);
    const perc = getPercentage(amount, total);
    // console.log("PERCENTAGE:", perc);

    // Graph
    const outerGraph = createNewEl("div", "income-outer-graph");
    const innerGraph = createNewEl("div", "income-inner-graph");
    innerGraph.setAttribute("style", `width: ${perc}%`)
    outerGraph.append(innerGraph);

    // Append everything to parent
    incomeGraphBlock.append(descContainer, outerGraph);

    return incomeGraphBlock;
}



// ================================== //

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


// 3. Convert to monthly budget
function getRates(amount, currentFreq, newFreq=5, workHours=8) {
    const dayHours = 24;
    const week = 7;
    const daysOfCurrentYear = getCurrentYearDays();
    let dailyAmount = 0;


    // GET DAILY RATE
    switch (currentFreq) {
        case 1:
            dailyAmount = amount * workHours;
            break;
        case 2:
            dailyAmount = amount;
            break;
        case 3:
            dailyAmount = amount / week;
            break;
        case 4:
            dailyAmount = amount / (week * 2);
            break;
        case 5:
            dailyAmount = amount / DAYSINMONTH;
            break;
        case 6:
            dailyAmount = amount / daysOfCurrentYear;
            break;
        default:
            // Handle default case or remove this line if not needed
            break;
    }

    // Convert
    let hourly = dailyAmount / workHours;
    let daily = dailyAmount;
    let weekly = dailyAmount * week;
    let biWeekly = dailyAmount * (week * 2);
    let monthly = dailyAmount * DAYSINMONTH;
    let yearly = dailyAmount * daysOfCurrentYear;

    const rates = {
        hourly: hourly.toFixed(2),
        daily: daily.toFixed(2),
        weekly: weekly.toFixed(2),
        biWeekly: biWeekly.toFixed(2),
        monthly: monthly.toFixed(2),
        yearly: yearly.toFixed(2)
    }

    switch (newFreq) {
        case 1:
            return rates.hourly;
        case 2:
            return rates.daily;
        case 3:
            return rates.weekly;
        case 4:
            return rates.biWeekly;
        case 5:
            return rates.monthly;
        case 6:
            return rates.yearly;
        default:
            // Handle default case or remove this line if not needed
            return rates;
    }
}

// 4. Get days of the current year
function getCurrentYearDays() {
    const currentDate = dayjs();

    let daysCount = 0;

    for (let i = 0; i < 12; i++) {
        daysCount += currentDate.month(i).daysInMonth();
    }

    return daysCount;
}