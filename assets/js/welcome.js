
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
const USERNAMES = ['dimi92', 'john123', 'eleniG', 'ahmed55'];

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



formDiv.addEventListener('submit', (event) => {

    //  Prevents default action of submit
    event.preventDefault();

    // Get localStorage stored data
    

    // Check username and see if it exists - go to main page if it does
    const username = document.querySelector("#username").value.trim();
    console.log(username);
    console.log(username.length);

    if (USERNAMES.includes(username)) {
        console.log("Usernme exists. I will go to main.html");
    } else {
        console.log("Username doesn't exist in database.")
    }

    // Evaluate that username has allowed chars - show error messages if not
    //TBC//

    // Store all info from form
    const firstName = document.querySelector("#first-name").value.trim();
    const lastName = document.querySelector("#last-name").value.trim();
    const country = document.querySelector("#country").value.trim();
    const currency = document.querySelector("#currency").value.trim();

    console.log(`First name: ${firstName}, Last name: ${lastName}, Country: ${country}, Currency: ${currency}`);

    const incomeData = getSectionData(incomeDiv);
    const budgetData = getSectionData(budgetDiv);

    console.log(`Income Data: `, incomeData);
    console.log(`Budget Data: `, budgetData);
    
    
    // Check if info is valid / sufficient - alert user if not
    // TCB //

    // Create object of specified schema
    

    // Update localStorage with a new user (without removing the previous users)

});




// let john123 = {
//     basicInfo: {
//         name: "John",
//         surname: "Smith",
//         regDate: dayjs().format("YYYYMMDD")
//     },
//     preferences: {
//         country: "UK",
//         currency: "GBP"
//     },
//     income: [
//         {
//             desc: "MyComp LTD",
//             amount: 2000,
//             freq: "monthly"
//         },
//         {
//             desc: "Freelance Developer",
//             amount: 300,
//             freq: "weekly"
//         }
//     ],
//     budgets: {
//         mainExp: {
//             cap: 1200,
//             current: 300.00,
//             over: "no"
//         },
//         groceries: {
//             cap: 450,
//             current: 87.00,
//             over: "no"
//         },
//         transport: {
//             cap: 160,
//             current: 167.36,
//             over: "yes"
//         }
//     },
//     fixedExpenses: [
//         {
//             desc: "Travelcard",
//             amount: 157.59,
//             date: "DD",
//             freq: "monthly"
//         },
//         {
//             desc: "Council Tax",
//             amount: 101.00,
//             date: "DD",
//             freq: "monthly"
//         },
//         {
//             desc: "Car Insurance",
//             amount: 200.00,
//             date: "MMDD",
//             freq: "yearly"
//         },
//     ],
//     expenseTracker: [
//         {
//             desc: "..."
//             budgetType: "...",
//             amount: 20.00,
//         },
//     ]
// }



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
    const descInput = document.createElement("input");
    descInput.classList.add("form-control");
    descInput.setAttribute("type", "text");
    descInput.setAttribute("placeholder", placeholder);
    descInput.setAttribute("data-type", `desc`);
    
    const amountInput = document.createElement("input");
    amountInput.classList.add("form-control");
    amountInput.setAttribute("type", "text");
    amountInput.setAttribute("placeholder", `${symbol} Amount`);
    amountInput.setAttribute("data-type", `amount`);
    
    const freqSelection = document.createElement("select");
    freqSelection.classList.add("form-control");
    freqSelection.setAttribute("data-type", `freq`);

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


function getSectionData(parentDiv) {
    // Array that will be returned
    let arr = [];

    let entriesCount = parentDiv.childElementCount;

    // For each child of parent Div
    for (let i = 0; i < entriesCount; i++) {

        // Get Child element $ count
        const child = parentDiv.children[i];
        const count = child.childElementCount;

        let obj = {};

        // For each child's children
        for (let j = 0; j < count; j++) {
            const type = child.children[j].children[0].dataset.type;
            const value = child.children[j].children[0].value;
            console.log(type, value);

            obj[type] = value;
        }
        arr.push(obj);
    }

    return arr;
}