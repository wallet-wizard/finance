
// SELECTORS

const formDiv = document.querySelector("#onboarding-form");
const usernameEl = document.querySelector("#username");
const firstNameEl = document.querySelector("#first-name");
const lastNameEl = document.querySelector("#last-name");
const countryEl = document.querySelector("#country");
const currencyEl = document.querySelector("#currency");

const incomeDiv = document.querySelector(".income-blocks");
const budgetDiv = document.querySelector(".budget-blocks");
const addIncomeBtn = document.querySelector("#add-income");
const addBudgetBtn = document.querySelector("#add-budget");

const removeIncomeBtn = document.querySelector("#remove-income");
const removeBudgetBtn = document.querySelector("#remove-budget");


const FREQUENCY = ["Monthly", "Weekly", "Yearly"];




// EVENT LISTENERS

addIncomeBtn.addEventListener('click', () => {
    addNewBlock(incomeDiv, 'income', 'My Company LTD.', '$');
});

addBudgetBtn.addEventListener('click', () => {
    addNewBlock(budgetDiv, 'budget', 'Groceries', '$');
});

removeIncomeBtn.addEventListener('click', () => {
    removeLastChild(incomeDiv);
});

removeBudgetBtn.addEventListener('click', () => {
    removeLastChild(budgetDiv);
});



// FUNCTIONS

function addNewBlock(div, type, placeholder, symbol) {

    // Create Outer Div
    const outerBlock = document.createElement("div");
    outerBlock.classList.add(`${type}-block`, "row", "mb-2", "mt-2");

    // Create Columns
    const col1 = document.createElement("div");
    col1.classList.add("col-12", "col-sm-6", "p-1");
    const col2 = document.createElement("div");
    col2.classList.add("col-7", "col-sm-3", "p-1");
    const col3 = document.createElement("div");
    col3.classList.add("col-5", "col-sm-3", "p-1");

    // Create inputs
    const amountInput = document.createElement("input");
    amountInput.classList.add("form-control");
    amountInput.setAttribute("type", "text");
    amountInput.setAttribute("placeholder", `${symbol} Amount`);

    const descInput = document.createElement("input");
    descInput.classList.add("form-control");
    descInput.setAttribute("type", "text");
    descInput.setAttribute("placeholder", placeholder);

    const freqSelection = document.createElement("select");
    freqSelection.classList.add("form-control");

    for (const i in FREQUENCY) {
        const optionEl = document.createElement('option');
        optionEl.setAttribute("value", (i + 1));
        optionEl.innerText = FREQUENCY[i];

        freqSelection.append(optionEl)
    }

    // Append the block
    col1.append(descInput);
    col2.append(amountInput);
    col3.append(freqSelection);

    outerBlock.append(col1, col2, col3);

    div.append(outerBlock);
}

function removeLastChild(element) {
    console.log("here!")
    let children = element.childElementCount;
    console.log(children)

    if (children > 1) {
        let lastChild = element.lastElementChild;
        element.removeChild(lastChild);
    } 
}