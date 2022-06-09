const inquirer = require('inquirer');
const axios = require('axios');

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
        apikey: 'aFaADVdrgqEEMwlcRukJ8DGQLwTAEa9G'
    }
    axios.get(`https://api.apilayer.com/fixer/convert?to=${target}&from=${base}&amount=${amount}`, {headers}).then(({data}) => {            
        //Amount Base is equal to Result Target at a rate of Rate 
        console.log(`${amount} ${base} = ${data.result} ${target} at a rate of ${data.info.rate}`);
    })
    .catch((error) => {
        //find error message
        //present to user
        //ask user to go again
        //inquirer docs a good place to start
        //create a goAgain function after .then
        console.log(error);
    })
}

const askQuestions = () => {inquirer.prompt(questions).then((answers) => {
        //console.log(answers); 
        conversion(answers.baseCurrency, answers.targetCurrency, answers.amount);
    });
}

askQuestions();
