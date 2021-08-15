const inquirer =  require("inquirer");
const fs = require("fs");

const Manager =  require("./lib/Manager")

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
        const newMgr = new Manager(answers.mgrName, answers.mgrId, answers.mgrEmail, answers.mgrOffice)
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
        if(choice == "Engineer"){

        }else if(choice == "Intern"){

        }else {
            generateHTML(arrOfEmp)
        }
    })
}

function generateHTML(array) {
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
            `
        }else if(arrOfEmp[i].getRole() == "Engineer"){
            htmlString += `
            <h1> Engineer name`
        }
    }

    htmlString +=`</body>
    </html>`

    fs.writeFile("./dist/index.html", htmlString, (err) => {
        if(err) throw err;
    })
}

start()