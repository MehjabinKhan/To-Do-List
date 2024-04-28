#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

let toDos: string [] = [];
let condition = true;

console.log(chalk.magenta.bold("\n \t WElCOME TO MY TO-DO LIST APPLICATION !\n"));

let main = async () => {
    while(condition){
        let option = await inquirer.prompt([
            {
               name: "choice",
               type: "list",
               message: "Select an option you want to do:",
               choices: ["Add Task","Delete Task","Update Task","View To-Do List","Exit"],
            }
        ]);
        if(option.choice === "Add Task"){
            await addTask()
        }
        else if(option.choice === "Delete Task"){
            await deleteTask()
        }
         else if(option.choice === "Update Task"){
            await updateTask()
         }
        else if(option.choice === "View To-Do List"){
            await viewTask()
        }
        else if(option.choice === "Exit"){
            condition = false;
        }
        
    }
}
// function to add new task to the list
let addTask = async() => {
    let newTask = await inquirer.prompt([
        {
            name: "task",
            type: "input",
            message: "Enter your new Task:"
        }
    ]);
    toDos.push(newTask.task);
    console.log(`\n Tasks added successfully in To-do List ${newTask.task}`);
}

// function to view all todo list task
let viewTask = () => {
    console.log("\n Your Todo-List: \n");
    toDos.forEach((task,index) => {
        console.log(`${index + 1 }: ${task}`)
    });
}
// function to delete a task from list
let deleteTask = async() =>{
    await viewTask()
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index number of the task you want to delete:",
        }
    ])
    let deletedTask = toDos.splice(taskIndex.index - 1, 1);
    console.log(`\n ${deletedTask} this task has been deleted successfully from TODo-List\n`);
}
// function to update a task
let updateTask = async() => {
    await viewTask()
    let updateTaskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: "Enter the index number to update:",
        },
        {
            name: "new_task",
            type: "input",
            message: "Now enter new task:",
        },
    ]);
    toDos[updateTaskIndex.index - 1] = updateTaskIndex.new_task
    console.log(`\n Task at index Number ${updateTaskIndex.index - 1} updated successfully [For update List check Option: "View To-Do List"]`);
}

main();