import { 
    createProject, 
    deleteProject, 
    createTask, 
    deleteTask, 
    getProjectList, 
    editTask 
} from './task';

let projectIndex = 0;

// Main DOM Element
const tabContent = document.querySelector('.tabContent');

// Displays project selection and details
const projectHeader = document.createElement('div');
projectHeader.classList.add('projectHeader');

// Displays tasks, tasks edits, and project edits
const projectMain = document.createElement('div');
projectMain.classList.add('projectMain');

// Header
function generateProjectDropDown(projectList, selected = 0){
   
    // Generate drop down menu with project list
    const dropDownMenu = document.createElement('select');
    dropDownMenu.classList.add('dropDownMenu');
    dropDownMenu.addEventListener('change', onProjectSelection);

    projectList.forEach((project) => {
        const projectOption = document.createElement('option');
        projectOption.innerText = project.name;
        dropDownMenu.appendChild(projectOption);
    })

    // Set selcted option
    dropDownMenu[selected].setAttribute('selected', 'selected');

    return dropDownMenu; 
}

function generateProjectDetails(projectList, selected = 0) {
    const selectedProject = projectList[selected];

    const projectDetails = document.createElement('div');
    projectDetails.classList.add('projectDetails');

    const projectDescription = document.createElement('p')
    projectDescription.innerText = selectedProject.description;

    const projectTaskCount = document.createElement('p');
    projectTaskCount.innerText = 'Tasks: ' + selectedProject.taskList.length;

    projectDetails.appendChild(projectDescription);
    projectDetails.appendChild(projectTaskCount);

    return projectDetails;
}

function generateProjectButtons(projectIndex) {

    const projectButtons = document.createElement('div');
    projectButtons.classList.add('projectButtons');

    // Create Add Task Button
    const addTaskButton = document.createElement('button');
    addTaskButton.innerText = 'Add Task';
    addTaskButton.dataset.index = projectIndex;
    addTaskButton.addEventListener('click', addTaskOnClick);
    projectButtons.appendChild(addTaskButton);

    // Create Add Project Button
    const addProjectButton = document.createElement('button');
    addProjectButton.innerText = 'Add Project'
    addProjectButton.dataset.index = projectIndex;
    addProjectButton.addEventListener('click', addProjectOnClick);
    projectButtons.appendChild(addProjectButton);

    // Create Delete Project Button
    const deleteProjectButton = document.createElement('button');
    deleteProjectButton.innerText = 'Delete Project';
    deleteProjectButton.dataset.index = projectIndex;
    deleteProjectButton.addEventListener('click', deleteProjectOnClick);
    projectButtons.appendChild(deleteProjectButton);

    return projectButtons;
}

function renderProjectHeader() {
    const projectList = getProjectList();
    
    const dropDownWrapper = document.createElement('div');
    dropDownWrapper.classList.add('dropDownWrapper');

    // Clear header contents and generate new content
    while (projectHeader.firstChild) {
        projectHeader.removeChild(projectHeader.firstChild);
    }

    const dropDown = generateProjectDropDown(projectList, projectIndex);
    dropDownWrapper.appendChild(dropDown);

    const details = generateProjectDetails(projectList, projectIndex);
    dropDownWrapper.appendChild(details);

    projectHeader.appendChild(dropDownWrapper);

    const buttons = generateProjectButtons(projectIndex);
    projectHeader.appendChild(buttons);

    tabContent.appendChild(projectHeader);
}

// Main

function generateTaskList(projectList, projectIndex) {
    const taskList = projectList[projectIndex].taskList;

    const taskListContainer = document.createElement('div');
    taskListContainer.classList.add('taskListContainer');

    taskList.forEach((task, taskIndex) => {
        const name = task.name;
        const description = task.description;
        const dueDate = task.dueDate;
        const isCompleted = task.isCompleted;

        const taskContainer = document.createElement('div');
        taskContainer.classList.add('taskContainer');

        const taskInfoContainer = document.createElement('div');
        taskInfoContainer.classList.add('taskInfoContainer');

        const taskButtonContaier = document.createElement('div');
        taskButtonContaier.classList.add('taskButtonContainer');

        const taskName = document.createElement('p');
        taskName.innerText = name;
        taskInfoContainer.appendChild(taskName);

        const taskDescription = document.createElement('p');
        taskDescription.innerText = description;
        taskInfoContainer.appendChild(taskDescription);

        const taskDueDate = document.createElement('p');
        taskDueDate.innerText = dueDate;
        taskInfoContainer.appendChild(taskDueDate);

        const taskIsCompleted = document.createElement('p');
        taskIsCompleted.innerText = isCompleted;
        taskInfoContainer.appendChild(taskIsCompleted);

        const editButton = document.createElement('button');
        editButton.dataset.index = taskIndex;
        editButton.innerText = 'edit';
        editButton.addEventListener('click', editTaskOnClick);
        taskButtonContaier.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.dataset.index = taskIndex;
        deleteButton.innerText = 'delete';
        deleteButton.addEventListener('click', deleteTaskOnClick);
        taskButtonContaier.appendChild(deleteButton);

        taskContainer.appendChild(taskInfoContainer);
        taskContainer.appendChild(taskButtonContaier);

        taskListContainer.appendChild(taskContainer);
    })

    return taskListContainer;
}

function generateTaskEntryForm(projectIndex){
    const taskEntryForm = document.createElement('form');
    taskEntryForm.classList.add('taskEntryForm');

    // Task Name
    const nameLabel = document.createElement('label');
    nameLabel.htmlFor = 'name';
    nameLabel.innerText = "Task Name";
    taskEntryForm.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'name';
    nameInput.name = 'name';
    taskEntryForm.appendChild(nameInput);

    // Task Description
    const descriptionLabel = document.createElement('label');
    descriptionLabel.htmlFor = 'description';
    descriptionLabel.innerText = 'Task Description';
    taskEntryForm.appendChild(descriptionLabel);

    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.id = 'description';
    descriptionInput.name = 'description';
    taskEntryForm.appendChild(descriptionInput);

    // Task Due Date
    const dueDateLabel = document.createElement('label');
    dueDateLabel.htmlFor = 'dueDate';
    dueDateLabel.innerText = 'Task Due Date';
    taskEntryForm.appendChild(dueDateLabel);

    const dueDateInput = document.createElement('input');
    dueDateInput.type = 'text';
    dueDateInput.id = 'dueDate';
    dueDateInput.name = 'dueDate';
    taskEntryForm.appendChild(dueDateInput);

    // Submit and Cancel Buttons
    const submitButton = document.createElement('button');
    submitButton.dataset.index = projectIndex;
    submitButton.innerText = 'Submit';
    submitButton.addEventListener('click', submitTaskOnClick)
    taskEntryForm.appendChild(submitButton);

    const cancelButton = document.createElement('button')
    cancelButton.dataset.index = projectIndex;
    cancelButton.innerText = 'Cancel';
    cancelButton.addEventListener('click', cancelOnClick);
    taskEntryForm.appendChild(cancelButton);

    return taskEntryForm;
}

function generateProjectEntryForm(){
    const projectEntryForm = document.createElement('form');
    projectEntryForm.classList.add('projectEntryForm');

    // Project Name
    const nameLabel = document.createElement('label');
    nameLabel.htmlFor = 'projectName';
    nameLabel.innerText = "Project Name";
    projectEntryForm.appendChild(nameLabel);

    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'projectName';
    nameInput.name = 'projectName';
    projectEntryForm.appendChild(nameInput);

    // Project Description
    const descriptionLabel = document.createElement('label');
    descriptionLabel.htmlFor = 'projectDescription';
    descriptionLabel.innerText = 'Project Description';
    projectEntryForm.appendChild(descriptionLabel);

    const descriptionInput = document.createElement('input');
    descriptionInput.type = 'text';
    descriptionInput.id = 'projectDescription';
    descriptionInput.name = 'projectDescription';
    projectEntryForm.appendChild(descriptionInput);

    // Submit and Cancel Buttons
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Submit';
    submitButton.addEventListener('click', submitProjectOnClick)
    projectEntryForm.appendChild(submitButton);

    const cancelButton = document.createElement('button')
    cancelButton.innerText = 'Cancel';
    cancelButton.addEventListener('click', cancelOnClick);
    projectEntryForm.appendChild(cancelButton);

    return projectEntryForm;
}

function renderProjectMain(task) {
    const projectList = getProjectList();
   
    // Clear main contents and generate new content
    while (projectMain.firstChild) {
        projectMain.removeChild(projectMain.firstChild);
    }

    if (task === 'taskList') {
        const tasks = generateTaskList(projectList, projectIndex);
        projectMain.appendChild(tasks);
    }

    if (task === 'taskEntry') {
        const taskForm = generateTaskEntryForm(projectIndex);
        projectMain.appendChild(taskForm);
    }

    if (task === 'projectEntry') {
        const projectForm = generateProjectEntryForm();
        projectMain.appendChild(projectForm);
    }
    
    tabContent.appendChild(projectMain);
}

// Helper Functions

function setActiveProjectIndex(index) {
    projectIndex = index;
}

// Event Listner Functions

function onProjectSelection(){
    setActiveProjectIndex(document.querySelector('.dropDownMenu').selectedIndex);

    renderProjectHeader();
    renderProjectMain('taskList');
}

function addTaskOnClick(button) {
    console.log('add task');
    renderProjectMain('taskEntry');
}

function addProjectOnClick(button) {
    console.log('add project');
    renderProjectMain('projectEntry');
}

function submitProjectOnClick(button) {
    button.preventDefault();

    const name = document.querySelector('#projectName').value;;
    const description = document.querySelector('#projectDescription').value;

    createProject(name, description);
    setActiveProjectIndex(getProjectList().length - 1);
    renderProjectHeader();
    renderProjectMain();
}

function deleteProjectOnClick(button) {
    console.log('delete project');
    deleteProject(projectIndex);
    setActiveProjectIndex(0);
    renderProjectHeader();
    renderProjectMain('taskList');
}

function editTaskOnClick(button) {
    console.log('edit task');
}

function deleteTaskOnClick(button) {
    console.log('delete task');
    const taskIndex = button.target.dataset.index;
    console.log(taskIndex);
    console.log(projectIndex);
    deleteTask(projectIndex, taskIndex);
    renderProjectHeader();
    renderProjectMain('taskList');
}

function submitTaskOnClick(button) {
    button.preventDefault();

    const projectIndex = document.querySelector('.dropDownMenu').selectedIndex;
    const name = document.querySelector('#name').value;
    const description = document.querySelector('#description').value;
    const dueDate = document.querySelector('#dueDate').value;

    createTask(projectIndex, name, description, dueDate);
    renderProjectHeader();
    renderProjectMain('taskList');
}

function cancelOnClick(button) {
    button.preventDefault();
    renderProjectMain('taskList');
}

export { renderProjectHeader, renderProjectMain };