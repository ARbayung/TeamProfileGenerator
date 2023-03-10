const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
const Employee = require("./lib/Employee");


// TODO: Write Code to gather information about the development team members, and render the HTML file.
const team = [];
const questions = [
    {
        type:'input',
        name:'name',
        message:'Enter the name'
    },
    {
        type:'input',
        name:'id',
        message:'Enter the ID'
    },
    {
        type:'input',
        name:'email',
        message:'Enter the Email'
    },
    {
        type:'list',
        name:'role',
        choices: ['Manager', 'Engineer', 'Intern'],
        message:'what is your role?'
    },
]

function getDetails(){
    inquirer.prompt(questions)
    .then(answer => {
        

        if(answer.role === 'Manager'){
            addManager(answer);
        } else if(answer.role === 'Engineer'){
            addEngineer(answer);
        } else if(answer.role === 'Intern'){
            addIntern(answer);
        } 
    })
}

function addManager(answer){
    const target = new Manager(answer.name, answer.id, answer.email);

    inquirer.prompt([
        {
            type:'input',
            name:'officeID',
            message:'what is the office number?'
        }
    ])
    .then(answer => {
        target.officeNumber = answer.officeID ;
        team.push(target);
        console.log("details added")
        console.log(team);
    })
    .then(init);
}

function addEngineer(answer){
    const target = new Engineer(answer.name, answer.id, answer.email);

    inquirer.prompt([
        {
            type:'input',
            name:'gitHub',
            message:'what is the name of the gitHub account?'
        }
    ])
    .then(answer => {
        target.github = answer.gitHub;
        team.push(target);
        console.log("details added")
        console.log(team);
    })
    .then(init);
}

function addIntern(answer){
    const target = new Intern(answer.name, answer.id, answer.email);

    inquirer.prompt([
        {
            type:'input',
            name:'scool',
            message:'what school did you go to?'
        }
    ])
    .then(answer => {
        target.school = answer.school;
        team.push(target);
        console.log("details added")
        console.log(team);
    })
    .then(init);
}

function init(){

    inquirer.prompt([
        {
            type:'list',
            name:'choice',
            message:'would you like to add a member?',
            choices:['yes','no']
        }
    ]).then(answer => {
        if(answer.choice === 'yes'){
            getDetails();
        }else{
            console.log("thankyou");
            createPage();
        }
    })
    
}

function createPage(){
    if(!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR)
    }

    fs.writeFileSync(outputPath, render(team),'utf-8');
}

init();

