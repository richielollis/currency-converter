const inquirer = require('inquirer');
const axios = require('axios');
require('dotenv').config();

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

//a way to do the conversion 

const conversion = (base, target, amount) => {
    const headers = {
        apikey: process.env.API_KEY 
    }
    axios.get(`https://api.apilayer.com/fixer/convert?to=${target}&from=${base}&amount=${amount}`, {headers}).then(({data}) => {            
        //Amount Base is equal to Result Target at a rate of Rate 
        //console.log(data)
        if (data.success) {
            console.log(`${amount} ${base} = ${data.result} ${target} at a rate of ${data.info.rate}`);
        }   else {
            throw data.error;
        }
        goAgain();
        
    })
    .catch((error) => {
        //find error message
        //present to user
        console.log(error.info);
        //ask user to go again
        goAgain();
        //inquirer docs a good place to start
        //create a goAgain function after .then
    })
}

const goAgain = () => {
    inquirer.prompt([
        {
            type: 'checkbox',
            message: 'Would you like to go again?',
            name: 'goAgain',
            choices: [  
                {
                    name: 'Yes',
                },
                {
                    name: 'No'
                }
            ]
        }
    ])
    .then((answer) => {
        if (answer.goAgain === 'Yes') {
            askQuestions();
        } else {
            console.log('Thank you for using my app!')
        }
    })
}

const askQuestions = () => {inquirer.prompt(questions).then((answers) => {
        //console.log(answers); 
        conversion(answers.baseCurrency, answers.targetCurrency, answers.amount);
    });
}

askQuestions();
