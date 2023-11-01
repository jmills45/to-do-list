const projectList = [];

class project {
    constructor(name, description){
        this.name = name;
        this.description = description;
        this.taskList = [];
    }

    addTask(taskName, taskDescription, taskDueDate) {
        const newTask = new task(taskName, taskDescription, taskDueDate);
        this.taskList.push(newTask);
    }

    removeTask(taskIndex) {
        this.taskList.splice(taskIndex, 1);
    }

    amendTask(taskIndex, taskName, taskDescription, taskDueDate, taskIsCompleted) {
        const taskToEdit = this.taskList[taskIndex];

        taskToEdit.name = taskName;
        taskToEdit.description = taskDescription;
        taskToEdit.taskDueDate = taskDueDate;
        taskToEdit.isCompleted = taskIsCompleted;
    }
}

class task {
    constructor(name, description, dueDate) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.isCompleted = false;
    }
}

// Project Functions
function createProject(projectName, projectDescription) {
    const newProject = new project(projectName, projectDescription);
    projectList.push(newProject);
}

function deleteProject(projectIndex){
    projectList.splice(projectIndex, 1);
}

// Task Functions
function createTask(projectIndex, name, description, dueDate) {
    projectList[projectIndex].addTask(name, description, dueDate);
}

function deleteTask(projectIndex, taskIndex) {
    projectList[projectIndex].removeTask(taskIndex);
}

function editTask(projectIndex, taskIndex, name, description, dueDate, isCompleted) {
    projectList[projectIndex].amendTask(taskIndex, name, description, dueDate, isCompleted);
}

// Info Functions
function getProjectList() {
    return projectList;
}

export { 
    createProject, 
    deleteProject, 
    createTask, 
    deleteTask, 
    editTask, 
    getProjectList 
};