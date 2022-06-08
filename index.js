const inquirer = require('inquirer');

//a way to ask user which currencies to convert 

const questions = [
    {
        type: 'input',
        name: 'baseCurrency',
        message: 'Base Currency',
    },
    {
        type: 'number',
        name: 'amount',
        message: 'Amount',
        validate(value) {
            const pass = !isNaN(value);
            if (pass) {
                return true;
            } 

            return 'Please enter valid number';
        }
    },      
    {
        type: 'input',
        name: 'targetCurrency',
        message: 'Target Currency',
    },
];

inquirer.prompt(questions).then((answers) => {
    console.log(answers); 
});

//a way to do the conversion 

const conversion = (base, target) => {

}


