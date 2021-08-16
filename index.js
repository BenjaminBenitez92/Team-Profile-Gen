const inquirer =  require("inquirer");
const fs = require("fs");

const Manager =  require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const arrOfEmp = [];

function start() {
    inquirer.prompt([
        {
            name: "mgrName",
            message: "What is your Manager's name?"
        },
        {
            name: "mgrId",
            message: "ID?"
        },
        {
            name: "mgrEmail",
            message: "Email?"
        },
        {
            name: "mgrOffice",
            message: "OfficeNum?"
        }
    ]).then(answers => {
        const newMgr = new Manager(answers.mgrName, answers.mgrId, answers.mgrEmail, answers.mgrOffice, answers.getRole)
        console.log(newMgr.getRole(), newMgr.getName())
        arrOfEmp.push(newMgr)
        menu()
    })
}

function menu() {
    inquirer.prompt([
        {
            type: "list",
            choices: ["Engineer", "Intern", "Done"],
            name: "choice",
            message: "Would you like to add more employees?"
        }
    ]).then(({choice}) => {
        if(choice == "Engineer"){ inquirer.prompt([
            {
                name: 'engineerName',
                message: "name?"
            },
            {
                name: 'egrEmail',
                message: "engineer's email?"

            },
            {
                name: 'engineerId',
                message: 'ID?'
            },
            {
                name: 'github',
                message: 'what is your github user name?'

            }
        ]).then(answers => {
            const newEngr = new Engineer (answers.engineerName, answers.egrEmail, answers.engineerId, answers.github)
            console.log(newEngr.getRole(), newEngr.getName())
            arrOfEmp.push(newEngr)
            menu()
        })

        }else if(choice == "Intern"){ inquirer.prompt([
            {
                name: 'internName',
                message: "name?"
            },
            {
                name: 'internEmail',
                message: "email?"
            },
            {
                name: 'internId',
                message: 'ID?'

            },
            {
                name: 'School',
                message: 'School the  intern is  currently enroll?'
            },
        ]) .then(answers => {
            const newIntern = new Intern (answers.internName, answers.internEmail, answers.internId, answers.School)
            console.log(newIntern.getRole(), newIntern.getName())
            arrOfEmp.push(newIntern)
            menu()
        })

        }else {
            generateHTML(arrOfEmp)
        }
    })
}

function generateHTML(arrOfEmp) {
    let htmlString = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>   
    `
    for(i=0; i<arrOfEmp.length; i++){
        if(arrOfEmp[i].getRole() == "Manager"){
            htmlString += `
            <h1> Manager name: ${arrOfEmp[i].getName()} </h1>
            <p> role: ${arrOfEmp[i].getRole()}
            <p> id: ${arrOfEmp[i].getId()} </p>
            <p> email: ${arrOfEmp[i].getEmail()} </p>
            <p> office number: ${arrOfEmp[i].getOfficeNumber()}
            </p>
            `
        }else if(arrOfEmp[i].getRole() == "Engineer"){
            htmlString += `
            <h1> Engineer name: ${arrOfEmp[i].getName()} </h1>
            <p> id: ${arrOfEmp[i].getId()} </p>
            <p> email: ${arrOfEmp[i].getEmail()} </p>
            <p> github ${arrOfEmp[i].getGithub()}  </p>
            `
        }else if(arrOfEmp[i].getRole() == "Intern"){
            htmlString += `
            <h1> Intern name: ${arrOfEmp[i].getName()} </h1>
            <p> id: ${arrOfEmp[i].getId()} </p>
            <p> email: ${arrOfEmp[i].getEmail()} </p>
            <p> school: ${arrOfEmp[i].getSchool()}  </p>`
        }
    }

    htmlString +=`</body>
    </html>`

    fs.writeFile("./dist/index.html", htmlString, (err) => {
        if(err) throw err;
    })
}

start()