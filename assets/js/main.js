//DOM Declarations
var amountInput = $('#amount-input');
var descInput = $('#description-input');
var todaysDate = $('#todays-date');
var dashboardMonth = $('#dashboard-month');
var newExpenseBtn = $('#new-expense-submit');
var userName = $('.user-name');
var switchUserButton = $('#switch-button');

var longDate = dayjs().format('dddd D MMMM YYYY');
todaysDate.text(longDate);


// GLOBAL CONSTS
const budgetModal = document.querySelector("#budget-modal");
const bootstrapModal = new bootstrap.Modal(budgetModal);
const budgetModalBtn = document.querySelector("#submit-modal-btn");


// ============ USER DATA ============= //

// GET USER DATA from localStorage (or "null" if key doesn't exist in localStorage)
const CURRENT_USER = localStorage.getItem('WalletWizUsername') || null;

// USER DATA LOG (for testing / checking)
console.log("Current User:", CURRENT_USER);
console.log("DATA", DATA[CURRENT_USER]);

// Return to welcome.html if username is not set.
if (CURRENT_USER === null) {
    window.location.href = '../../welcome.html';
} else if (CURRENT_USER !== DATA[CURRENT_USER].basicInfo.username) {
    window.location.href = '../../welcome.html';
}

// Store USER DATA
const basicInfo = DATA[CURRENT_USER].basicInfo;
const budgets = DATA[CURRENT_USER].budgets;
const income = DATA[CURRENT_USER].income;
const preferences = DATA[CURRENT_USER].preferences;
const CURRENCY_SYMBOL = "";

// ================================== //

  
// Update Date
dashboardMonth.text(dayjs().format('MMMM'))
const DAYSINMONTH = dayjs().daysInMonth();




// ====== START APP ====== //

startApp();

// ======================= //




// START APP (MAIN) FUNCTION
// Runs of page refresh

function startApp() {

    // Clear Current Amounts if it's 1st of the month, 
    // maybe give report to user before? 
    // TBC //

    // Update Total Income / Spent
    const incomeTotals = calculateTotal();
    console.log(incomeTotals);
    updateIncomeDetails("income", "TOTAL", "Income", CURRENCY_SYMBOL, incomeTotals.totalIncome);
    updateIncomeDetails("more", "TOTAL", "Spent", CURRENCY_SYMBOL, incomeTotals.totalSpent);


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




// ================================== //

// EVENT LISTENERS //

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



// BUDGET-MODAL

// ** Code adopted from bootstrap 5 - Modals

budgetModal.addEventListener('show.bs.modal', event => {

    // Button that triggered the modal
    const button = event.relatedTarget

    // Extract info from data-bs-id attributes
    const budgetID = button.getAttribute('data-bs-id');

    // Change default budget type selection
    const budgetDefaultSelection = document.querySelector("#budget-modal-default-option");
    budgetDefaultSelection.value = budgetID;
    budgetDefaultSelection.innerText = budgetID;

    currentBudget = {};
    for (type of budgets) {
        if (type.desc === budgetID) {
            currentBudget = type;
        }
    }

    const budgetTypeEl = document.querySelector(".budget-type");
    budgetTypeEl.innerText = budgetID;

    
});


budgetModalBtn.addEventListener('click', (event) => {

    const desc = document.querySelector("#budget-modal-expense-desc").value;
    const amount = document.querySelector("#budget-modal-expense-amount").value;
    const type = document.querySelector("#budget-modal-expense-type").value;

    addExpense(desc, amount, type);

    // Hide Modal
    bootstrapModal.hide();
});

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
    
    // Add base-amount attribute to .number(s) - used in api-main.js to exchange to other currencies
    currentAmountSpan.setAttribute("data-base-amount", currentAmount);
    capAmountSpan.setAttribute("data-base-amount", cap);
    

    // Create button Container
    const modifyBtnContainer = createNewEl("div", ["col-6", "d-flex", "justify-content-end"]);
    const modifyBtn = createNewEl("button", ["btn", "btn-secondary", "add-remove-btn"], "+");
    modifyBtn.setAttribute("type", "button");
    modifyBtn.setAttribute("data-bs-toggle", "modal");
    modifyBtn.setAttribute("data-bs-target", "#budget-modal");
    modifyBtn.setAttribute("data-bs-id", desc);

    modifyBtnContainer.append(modifyBtn);


    // Append amount Container to details Container
    detailsContainer.append(amountContainer, modifyBtnContainer);

    // Append all children to budgetBlockRow (parent)
    budgetBlockRow.append(budgetDesc, graphContainer, detailsContainer);

    return budgetBlockRow;
}


// INCOME GRAPHS

function createIncomeGraph(desc, amount, total) {

    const symbolStr = `${CURRENCY_SYMBOL}` 
    const amountStr = `${amount}` 

    // // Outer Block
    const incomeGraphBlock = createNewEl("div", ["d-flex", "flex-column", "mb-2", "income-graph-container"]);

    // Income Source | percentage
    const descContainer = createNewEl("p", ["graph-text", "mb-1"]);
    const descSpan = createNewEl("span", ["desc", "mb-1"], desc);

    if (amount !== 0) {
        const dividerSpan = createNewEl("span", ["divider", "mb-1", "ms-2", "me-2"], "|");
        const symbolSpan = createNewEl("span", ["amount", "mb-1", "currency-symbol"], symbolStr);
        const amountSpan = createNewEl("span", ["amount", "mb-1", "number"], amountStr);
        amountSpan.setAttribute('data-base-amount', amountStr);
        descContainer.append(descSpan, dividerSpan, symbolSpan, amountSpan);
    } else {
        return;
    }

    // Get percentage
    const perc = getPercentage(amount, total);

    // Graph
    const outerGraph = createNewEl("div", "income-outer-graph");
    const innerGraph = createNewEl("div", "income-inner-graph");
    innerGraph.setAttribute("style", `width: ${perc}%`)
    outerGraph.append(innerGraph);

    // Append everything to parent
    incomeGraphBlock.append(descContainer, outerGraph);

    return incomeGraphBlock;
}



// INCOME DETAILS (right column)

function calculateTotal() {

    // Get Monthly Total Amount 
    console.log("INCOME:", income);
    let totalAmount = 0;
    for(work of income) {
        const workAmount = Number(work.amount);
        const freq = Number(work.freq);
        const workAmountMonthly = getRates(workAmount, freq, newFreq=5, workHours=8);

        totalAmount += Number(workAmountMonthly); 
    }
    
    // Get Spent amount
    let totalSpent = 0;
    if (DATA[CURRENT_USER].hasOwnProperty('expenses')) {
        const expenses = DATA[CURRENT_USER].expenses;
        
        for (expense of expenses) {
            const amount = Number(expense.amount);
            totalSpent += amount;
        }
    }
    
    //  Update decimals
    totalAmount = totalAmount.toFixed(2);
    totalSpent = totalSpent.toFixed(2);

    // console.log("TOTAL AMOUNT:", totalAmount);
    // console.log("TOTAL SPENT:", totalSpent);

    return {totalSpent: totalSpent, totalIncome: totalAmount};
}


function updateIncomeDetails(section, incomeType, text, currencySymbol, amount) {
    const incomeDetailsContainer = document.querySelector("#income-details-section");
    const headerEl = incomeDetailsContainer.querySelector(`.header`);
    const sectionEl = incomeDetailsContainer.querySelector(`.${section}-details`);
    const textEl = sectionEl.querySelector(".details-text");
    const symbolEl = sectionEl.querySelector(".currency-symbol");
    const amountEl = sectionEl.querySelector(".amount");
    amountEl.setAttribute("data-base-amount", amount);

    headerEl.innerText = `${incomeType}`;
    textEl.innerText = `${text}:`
    symbolEl.innerText = currencySymbol;
    amountEl.innerText = amount;
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


// 5. Add expense to USER DATA
function addExpense(desc, amount, budgetType) {

    let localStorageData = DATA;

    let newExpense = {
        desc: desc,
        amount: amount,
        type: budgetType,
        logDate: dayjs().format('YYYYMMDD-HHmmss')
    }

    if (localStorageData[CURRENT_USER].hasOwnProperty("expenses")) {
        localStorageData[CURRENT_USER]["expenses"].push(newExpense);
    } else {
        localStorageData[CURRENT_USER]["expenses"] = [];
        localStorageData[CURRENT_USER]["expenses"].push(newExpense);
    }

    let newBudgets = budgets;

    for (const i in budgets) {
        if (budgets[i].desc === budgetType) {

            let previousAmount = Number(budgets[i].currentAmount);
            let newAmount = previousAmount + Number(amount);
            newBudgets[i].currentAmount = newAmount;

            if (newAmount > budgets[i].amount) {
                newBudgets[i].over = "yes";
            }

            localStorageData[CURRENT_USER].budgets = newBudgets;

            // Update BudgetBlock
            updateBudgetBlockHTMLInfo(budgetType, newAmount);

            const totalSpent = calculateTotal();
            console.log("DDD", totalSpent)
            updateSpentHTMLInfo(totalSpent.totalSpent);
            
        }
    }

    // Update localStorage
    const stringifiedData = JSON.stringify(localStorageData);
    localStorage.setItem("walletWizDataSet", stringifiedData);

    location.reload();
}


// Updates Any HTML (not localStorage) information in Budget Blocks
function updateBudgetBlockHTMLInfo(
    type, 
    newCurrent=null, 
    newCap=null, 
    newType=null, 
    newSymbol=null, 
    newDivider=null) {

    const budgetBlocks = document.querySelectorAll(".budget-block");

    // Search for block, and if you find it do the following
    budgetBlocks.forEach(budgetBlock => {

        // Store h5 element that holds current Element
        const h5Element = budgetBlock.querySelector("h5");
        
        if (h5Element && h5Element.innerText.trim() === type) {

            // Select elements
            const currentAmountEl = budgetBlock.querySelector(".current-amount-num");
            const capEl = budgetBlock.querySelector(".cap-amount-num");
            const symbolEl = budgetBlock.querySelector(".currency-symbol");
            const dividerEl = budgetBlock.querySelector(".divider");
            const descEl = budgetBlock.querySelector(".desc");
            const innerGraphEl = budgetBlock.querySelector(".inner-graph");
            const percentageEl = budgetBlock.querySelector(".percentage");


            // Handle both cases (if user specified or didn't specify something)
            if (newCap !== null) {
                capEl.innerText = Number(newCap).toFixed(2);
            } else {
                newCap = Number(capEl.innerText);
            }

            if (newCurrent !== null) {
                currentAmountEl.innerText = Number(newCurrent).toFixed(2);
            } else {
                newCurrent = Number(currentAmountEl.innerText);
            }

            if (newSymbol !== null) {
                symbolEl.innerText = newSymbol;
            }
            if (newType !== null) {
                descEl.innerText = newType;
            }
            if (newDivider !== null) {
                dividerEl.innerText = newDivider;
            }


            //  Update HTML
            const percentage = getPercentage(newCurrent, newCap);
            if (percentage < 100) {
                percentageEl.innerText = `${percentage}%`;
                innerGraphEl.setAttribute("style", `width: ${percentage}%`);
            }
        }
    });
}

function updateSpentHTMLInfo(totalSpent) {
    const spentAmountEl = document.querySelector(".spent");
    spentAmountEl.setAttribute("data-base-amount", totalSpent);
    spentAmountEl.innerText = totalSpent;
}

userName.text(basicInfo.name);

switchUserButton.on('click' , () => {
    console.log('hi mum');

    window.location.href = "../../index.html"
})


