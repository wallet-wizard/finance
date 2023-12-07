# Wallet Wizard - Budget Setter/Tracker App

Welcome to Wallet Wizard, a web application that helps users manage their finances by providing tools to track income, expenses, and budgets. The project incorporates APIs, selectors, algorithms for modifying data, an object to store user data, localStorage, and more.

Wallet Wizard is a collaborative project developed by a team of Front End development course attendees. It serves as a budget setter and tracker application to help users manage their finances effectively. The app provides users with a seamless onboarding experience, allowing them to input essential information, set budgets, and visualize their financial data on the dashboard.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Features](#features)
3. [File Structure](#file-structure)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

## Getting Started

To access and get started with Wallet Wizard, follow one of the following methods:

### A. Visit the Web Page
1. Visit the page at https://wallet-wizard.github.io/finance/.
2. Create a new user.
3. Since this is a "Front End app" that uses an API service, when redirected to the 'Dashboard', you will be asked to provide an API key before proceeding. Please create a free key from https://currencyapi.com/ and paste it in the prompt. You only have to do this once.


### B. Clone the repository

1. Clone the repository.
2. Open the `index.html` file in the `root` folder to access the onboarding page.
3. In the `./assets/js/` folder, create a new JS file named `apikey.js`, and create a variable `yourAPIkey` that stores your currency API key.
4. Open `index.html` in your preferred browser to launch the app, and follow the on-screen instructions.

_Note: This is a portfolio project and it does not follow security protocols for Registration and onboarding. Please make sure you remove such information from localStorage after use._

## Features

### Onboarding
- Existing users are prompted to fill in their username and then are being redirected to their Dashboard.
- New users receive a welcome message and are guided to complete the necessary details before they can access their Dashboard.

### Dashboard
- Visual representation of budgets, incomes, and expenses.
- Ability to add and track expenses linked to specific budgets.
- Overview of monthly income, expenses, and savings.
- Recent transactions section for quick reference.

### Budget Setting
- Users can set budgets with customizable descriptions, amounts, and frequencies.
- Budgets support different frequency options such as hourly, daily, weekly, bi-weekly, monthly, and yearly.
- Expenses can be associated with specific budgets for accurate tracking.

### Currency Exchange
- Users can select a new currency for their financial data.
- Currency exchange rates are dynamically updated.

## File Structure

```
.

├── .gitignore
├── readme.md
├── index.html
├── assets
│   ├── css
│   │   ├── welcome.css
│   │   ├── main.css
│   ├── html
│   │   ├── main.html
│   ├── js
│   │   ├── apikey.js (untracked)
│   │   ├── api-welcome.js
│   │   ├── api-main.js
│   │   ├── welcome.js
│   │   ├── main.js
└── README.md

```




## Motivations

1. **API Integration:** Wallet Wizard integrates APIs to provide users with real-time currency exchange rates and enhance the accuracy of financial data.

2. **User Interface Design:** The project focuses on creating an intuitive and visually appealing user interface. Bootstrap is used for styling, ensuring responsiveness and a clean design.

3. **Data Management:** Wallet Wizard employs algorithms for modifying and updating user data dynamically. This includes adding and removing income sources and budgets.

## What Was Done

1. **User Onboarding:** The application guides new users through the onboarding process, collecting essential information to set up their financial profile. All user info is stored in a well-thought object that is then stringified and stored in localStorage.

```Javascript
const exampleUserData = {
    "test4": {
        "basicInfo": {
            "name": "Dimitris",
            "lastName": "Giannoulis",
            "username": "test4"
        },
        "preferences": {
            "country": "United Kingdom",
            "currency": "GBP"
        },
        "income": [
            {
                "desc": "FA",
                "amount": "2000",
                "freq": "5"
            },
            {
                "desc": "Freelance Web Dev",
                "amount": "200",
                "freq": "3"
            }
        ],
        "budgets": [
            {
                "desc": "Expenses",
                "amount": "1000",
                "freq": "5",
                "over": "no",
                "currentAmount": 230.52
            },
            {
                "desc": "Groceries",
                "amount": "40",
                "freq": "3",
                "over": "no",
                "currentAmount": 43.34
            },
            {
                "desc": "Transport",
                "amount": "160",
                "freq": "5",
                "over": "yes",
                "currentAmount": 172.55
            },
            {
                "desc": "Other",
                "amount": "200",
                "freq": "5",
                "over": "no",
                "currentAmount": 160.22
            },
            {
                "desc": "Savings",
                "amount": "200",
                "freq": "5",
                "over": "no",
                "currentAmount": 30
            }
        ]
    },
    // Add more users as needed
};

```

2. **Dynamic Sections:** Wallet Wizard features dynamic sections for income and budgets, allowing users to add or remove sources and categories as needed.

3. **Currency Exchange:** Users can exchange their currency, and the application provides real-time exchange rates for different currency options.

## Problems Addressed

1. **New User Onboarding:** The project addresses the challenge of guiding new users through the onboarding process, providing a welcoming experience.

2. **Dynamic UI Updates:** Wallet Wizard ensures that the user interface dynamically updates to reflect changes in income, expenses, and budgets.

3. **Currency Exchange Rates:** The application fetches real-time currency exchange rates, ensuring accurate financial calculations.

## Insights Gained

Developing Wallet Wizard provided valuable insights and skills:

- **API Interaction:** Enhancing skills in making API requests and handling responses, particularly for currency exchange rates.

- **User Interface Design:** Deepening knowledge of creating visually appealing and responsive user interfaces using Bootstrap.

- **Data Management Algorithms:** Implementing algorithms for dynamically updating and modifying user data based on user interactions.

- **LocalStorage Usage:** Leveraging localStorage for persistently storing user data and ensuring a seamless user experience across sessions.

## Credits

This project was developed by [Your Name]. The GitHub repository is available at [Wallet Wizard Repository](https://github.com/yourusername/wallet-wizard/).

## License

This project is licensed under the MIT License, providing flexibility for use, modification, and contributions.

## Links

- GitHub Repository: [Wallet Wizard Repository](https://github.com/yourusername/wallet-wizard/)
- Live Demo: [Wallet Wizard Demo](https://yourusername.github.io/wallet-wizard/)





## License
This project is licensed under the MIT License.

## Resources

(All Countries Drop Down List - HTML Code Generator)[https://www.html-code-generator.com/html/drop-down/country-names]

(Array.prototype.findIndex() - MDN)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex]

(Array.prototype.map() - MDN)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map]

(Converting a NodeList to an array with vanilla JavaScript - Go Make Things)[https://gomakethings.com/converting-a-nodelist-to-an-array-with-vanilla-javascript/]

(Converting currency names to currency symbol - stack overflow)[https://stackoverflow.com/questions/19373860/convert-currency-names-to-currency-symbol]

(Currency API)[https://app.currencyapi.com/dashboard]

(Get the Value/Text of Select or Dropdown on Change using JS - bobbyhadz)[https://bobbyhadz.com/blog/javascript-select-onchange-get-value]

(HTML DOM Element addEventListener() - W3Schools)[https://www.w3schools.com/jsref/met_element_addeventlistener.asp]

(HTML DOM Element appendChild() - W3Schools)[https://www.w3schools.com/jsref/met_node_appendchild.asp]

(HTMLElement: innerText property)[https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText]

(HTMLElement: change event)[https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event]

(How to get unique values in an array [duplicate] - stack overflow)[https://stackoverflow.com/questions/11246758/how-to-get-unique-values-in-an-array]

(How to remove all duplicates from an array of objects? - stack overflow)[https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects]

(How to set JavaScript attribute with setAttribute() - SheCodes)[https://www.shecodes.io/athena/1902-how-to-set-javascript-attribute-with-setattribute#:~:text=To%20set%20a%20JavaScript%20attribute%2C%20you%20need%20to%20use%20the,boolean%2C%20or%20any%20other%20type.]

(Intl.NumberFormat - MDN)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat#examples]

(Object.keys() - MDN)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys]

(Rest Countries API)[https://gitlab.com/restcountries/restcountries]

(Set - MDN)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set]

(sort() - W3Schools)[https://www.w3schools.com/jsref/jsref_sort.asp]