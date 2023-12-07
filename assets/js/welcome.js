/*
TESTS: 
go to Application > localStorage and Update 
the 'walletWizDataSet' key with the following value.
Then, use test1 / test2 / test3 / test4 in username.

*/


// SELECTORS

const formDiv = document.querySelector("#onboarding-form");
const usernameEl = document.querySelector("#username");
const firstNameEl = document.querySelector("#first-name");
const lastNameEl = document.querySelector("#last-name");
const countryEl = document.querySelector("#country");
const currencyEl = document.querySelector("#currency");
const newUserBlock = document.querySelector(".new-user-block");

const incomeDiv = document.querySelector(".income-blocks");
const budgetDiv = document.querySelector(".budget-blocks");
const addIncomeBtn = document.querySelector("#add-income");
const addBudgetBtn = document.querySelector("#add-budget");

const removeIncomeBtn = document.querySelector("#remove-income");
const removeBudgetBtn = document.querySelector("#remove-budget");


const FREQUENCY = ["Hourly", "Daily", "Weekly", "Bi-Weekly", "Monthly", "Yearly"];
const DATA = JSON.parse(localStorage.getItem('walletWizDataSet')) || {};


// console.log("DATA from LS:", DATA);


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


const storedUsername = localStorage.getItem('WalletWizUsername') || null;
// Display name in field if username exist
if (storedUsername !== null) {
    usernameEl.value = storedUsername;
}


// *** FORM SUBMISSION *** //

formDiv.addEventListener('submit', (event) => {

    //  Prevents default action of submit
    event.preventDefault();

    // Check username and see if it exists - go to main page if it does
    const username = document.querySelector("#username").value.trim();
    console.log(username);
    console.log(username.length);

    // Checks if username exists
    if (DATA.hasOwnProperty(username)) {
        console.log(`${username} exists in the object.`);
        console.log("Usernme exists. I will go to main.html");

        // Update username and redirect to main.html
        localStorage.setItem('WalletWizUsername', username);
        window.location.href = './assets/html/main.html';
        return username; // Stop further execution
    } else {
        const staging = localStorage.getItem('WWuserStaging') || "";

        if (staging === username) {
            console.log(`${username} does not exist in the object.`);
            console.log("Proceed.")
        } else {
            localStorage.setItem('WWuserStaging', username);
            toggleNewUserVisibility();
            return;
            
        }
    }

    // Evaluate that username has allowed chars - show error messages if not
    //TBC//

    // Store all info from form
    const firstName = document.querySelector("#first-name").value.trim();
    const lastName = document.querySelector("#last-name").value.trim();
    const country = document.querySelector("#country").value.trim();
    const currency = document.querySelector("#currency").value.trim();

    const incomeData = getSectionData(incomeDiv);
    const budgetData = getSectionData(budgetDiv, true);

    console.log('')
    console.log(`=============`)
    console.log(`USER DATA`)
    console.log(`---------`)
    console.log(`First name: ${firstName}`);
    console.log(`Last name: ${lastName}`);
    console.log(`Country: ${country}`);
    console.log(`Currency: ${currency}`);
    console.log(`Income Data: `, incomeData);
    console.log(`Budget Data: `, budgetData);
    console.log(`=============`)
    console.log('')

    // Check if info is valid / sufficient - alert user if not
    // TCB //

    // GET SYMBOL //
    // TBC //

    // Create object of specified schema
    let userData = {
        basicInfo: {
            name: firstName,
            lastName: lastName,
            username: username
            // age: null,
            // sex: null,
            // regDate: null
        },
        preferences: {
            country: country,
            currency: currency
        },
        income: incomeData,
        budgets: budgetData,
    }

    // Update localStorage with a new user (without removing the previous users)
    let currentData = DATA;
    currentData[username] = userData;

    const userDataStringified = JSON.stringify(currentData);
    localStorage.setItem('walletWizDataSet', userDataStringified);

    // Update USERNAME
    localStorage.setItem('WalletWizUsername', username);

    // Go to main.html
    window.location.href = './assets/html/main.html';
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
        const index = parseInt(i);
        const valueText = index + 1;
        const optionEl = document.createElement('option');
        optionEl.setAttribute("value", valueText);

        // Selects "Monthly"
        if (valueText == 5) {
            optionEl.setAttribute("selected", "selected");
        }

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
    let children = element.childElementCount;
    console.log(children)

    if (children > 1) {
        let lastChild = element.lastElementChild;
        element.removeChild(lastChild);
    }
}


function getSectionData(parentDiv, includeOver = false) {
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

            obj[type] = value;
        }

        if (includeOver) {
            obj['over'] = 'no';
            obj['currentAmount'] = 0;
        }
        
        arr.push(obj);
    }

    return arr;
}

function toggleNewUserVisibility() {
    const value = newUserBlock.dataset.display

    if (value === "show") {
        newUserBlock.classList.add('hidden');
        newUserBlock.dataset.display = "hidden"
    }
    
    if (value === "hidden") {
        newUserBlock.classList.remove('hidden');
        newUserBlock.dataset.display = "show"
    }
}