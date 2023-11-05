import { 
    createProject, 
    deleteProject, 
    createTask, 
    deleteTask, 
    getProjectList, 
    editTask 
} from './task';

// Used to track currently selected project from drop down list
let projectIndex = 0;

// Main DOM Element all content will be appended to
const tabContent = document.querySelector('.tabContent');

// Displays project selection and add task button
const projectHeader = document.createElement('div');
projectHeader.classList.add('projectHeader');

// Displays tasks, and entry forms
const projectMain = document.createElement('div');
projectMain.classList.add('projectMain');

// -------------Header-------------//

// Generate drop down menu with project list
function generateProjectDropDown(projectList, selectedOption = 0){
   
    const dropDownMenu = document.createElement('select');
    dropDownMenu.classList.add('dropDownMenu');
    dropDownMenu.addEventListener('change', onProjectSelection);

    if (projectList.length > 0) {

        projectList.forEach((project) => {
            const projectOption = document.createElement('option');
            projectOption.innerText = `${project.name}`;
            dropDownMenu.appendChild(projectOption);
        })

    } else {
        const projectOption = document.createElement('option');
        projectOption.innerText = 'Create Project -->';
        dropDownMenu.appendChild(projectOption);
    }

    // Set selcted option for dropdown list
    dropDownMenu[selectedOption].setAttribute('selected', 'selected');

    return dropDownMenu; 
}

// Generate add / delete project buttons
function generateProjectButtons(projectIndex) {
    
    // Create div wrapper for project buttons
    const projectButtons = document.createElement('div');
    projectButtons.classList.add('projectButtons');

    // Create Add Project Button
    const addProjectButton = document.createElement('button');
    addProjectButton.classList.add('addProjectButton');
    addProjectButton.dataset.index = projectIndex;
    addProjectButton.addEventListener('click', addProjectOnClick);
    projectButtons.appendChild(addProjectButton);

    // Create Delete Project Button
    const deleteProjectButton = document.createElement('button');
    deleteProjectButton.classList.add('deleteProjectButton');
    deleteProjectButton.dataset.index = projectIndex;
    deleteProjectButton.addEventListener('click', confirmProjectDeleteOnClick);
    projectButtons.appendChild(deleteProjectButton);

    return projectButtons;
}

// Generate add task button (potentially more later)
function generateAddTaskButton(projectIndex) {

    // Create div wrapper for task buttons
    const taskButtons = document.createElement('div');
    taskButtons.classList.add('taskButtons');

    // Create Add Task Button
    const addTaskButton = document.createElement('button');
    addTaskButton.innerText = 'Add Task';
    addTaskButton.dataset.index = projectIndex;
    addTaskButton.addEventListener('click', addTaskOnClick);
    taskButtons.appendChild(addTaskButton);

    return taskButtons;
}

// Render header contents using generate functions
function renderProjectHeader() {
    const projectList = getProjectList();
    
    // Create div wrapper for project elements
    const projectWrapper = document.createElement('div');
    projectWrapper.classList.add('projectWrapper');

    // Clear header contents and generate new content
    while (projectHeader.firstChild) {
        projectHeader.removeChild(projectHeader.firstChild);
    }

    // Generate and append dropdown and project buttons
    const dropDown = generateProjectDropDown(projectList, projectIndex);
    projectWrapper.appendChild(dropDown);

    const details = generateProjectButtons(projectIndex);
    projectWrapper.appendChild(details);

    projectHeader.appendChild(projectWrapper);


    // Generate and append add task button
    const buttons = generateAddTaskButton(projectIndex);
    projectHeader.appendChild(buttons);

    tabContent.appendChild(projectHeader);
}

// -----------------Main-----------------//

// Generate task list from current project task list
function generateTaskList(projectList, projectIndex) {
    
    // Create div wrapper for list of task containers
    const taskListContainer = document.createElement('div');
    taskListContainer.classList.add('taskListContainer');

    console.log(projectList.length)

    if (projectList.length <= 0) {
        return taskListContainer;
    }

    const taskList = projectList[projectIndex].taskList;

    taskList.forEach((task, taskIndex) => {
        const name = task.name;
        const description = task.description;
        const dueDate = task.dueDate;
        const isCompleted = task.isCompleted;

        // Container for each individual task
        const taskContainer = document.createElement('div');
        taskContainer.classList.add('taskContainer');

        // Info container - contains task number, info, etc
        const taskInfoContainer = document.createElement('div');
        taskInfoContainer.classList.add('taskInfoContainer');

        const taskNumber = document.createElement('p');
        taskNumber.classList.add('taskNumber');
        taskNumber.innerText = `#${taskIndex + 1}`;
        taskInfoContainer.appendChild(taskNumber);

        const taskName = document.createElement('p');
        taskName.innerText = name;
        taskName.classList.add('taskName');
        taskInfoContainer.appendChild(taskName);

        // Task buttons
        const taskButtonContaier = document.createElement('div');
        taskButtonContaier.classList.add('taskButtonContainer');

        const editButton = document.createElement('button');
        editButton.dataset.index = taskIndex;
        editButton.classList.add('editTaskButton');
        editButton.addEventListener('click', editTaskOnClick);
        taskButtonContaier.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.dataset.index = taskIndex;
        deleteButton.classList.add('deleteTaskButton');
        deleteButton.addEventListener('click', deleteTaskOnClick);
        taskButtonContaier.appendChild(deleteButton);

        // Task collapse details
        const detailCollapse = document.createElement('div');
        const collapseDiv = document.createElement('div');
        
        detailCollapse.classList.add('detailCollapse');
        detailCollapse.style.gridTemplateRows = '0fr';
        detailCollapse.dataset.index = taskIndex;

        const taskDescription = document.createElement('p');
        taskDescription.innerText = `Description: ${description}`;
        collapseDiv.appendChild(taskDescription);

        const taskDueDate = document.createElement('p');
        taskDueDate.innerText = `Due: ${dueDate}`;
        collapseDiv.appendChild(taskDueDate);

        // Append info and buttons to task container
        taskContainer.appendChild(taskInfoContainer);
        taskContainer.appendChild(taskButtonContaier);

        detailCollapse.appendChild(collapseDiv);
        taskContainer.appendChild(detailCollapse);

        taskListContainer.appendChild(taskContainer);
    })

    return taskListContainer;
}

// Generate task entry form for currently selected project's tasklist
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

// Generate project entry form
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

// Generate confirmation message and buttons before project deletion
function generateProjectDeleteConfirm(projectList, projectIndex) {

    const projectName = projectList[projectIndex].name;

    const projectDeleteConfirm = document.createElement('div');
    projectDeleteConfirm.classList.add('projectDeleteConfirm');

    // Create confirm message
    const confirmMessage = document.createElement('p');
    confirmMessage.innerText = `Are you sure you want to delete 
    ${projectName}`;
    projectDeleteConfirm.appendChild(confirmMessage);
    
    // Create Delete Project Button
    const deleteProjectButton = document.createElement('button');
    deleteProjectButton.innerText = "Delete";
    deleteProjectButton.dataset.index = projectIndex;
    deleteProjectButton.addEventListener('click', deleteProjectOnClick);
    projectDeleteConfirm.appendChild(deleteProjectButton);

    // Create Cancel Button
    const cancelButton = document.createElement('button')
    cancelButton.innerText = 'Cancel';
    cancelButton.addEventListener('click', cancelOnClick);
    projectDeleteConfirm.appendChild(cancelButton);

    return projectDeleteConfirm;
}

// Render projectMain based on task entry
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

    if (task === 'projectConfirmDelete') {
        const projectDeleteConfirm = generateProjectDeleteConfirm(projectList, projectIndex);
        projectMain.appendChild(projectDeleteConfirm);
    }
    
    tabContent.appendChild(projectMain);
}

// Helper Functions

function setActiveProjectIndex(index) {
    projectIndex = index;
}

// Event Listner Functions

// Project dropdown menu selection change
function onProjectSelection(){
    setActiveProjectIndex(document.querySelector('.dropDownMenu').selectedIndex);

    renderProjectHeader();
    renderProjectMain('taskList');
}

// Click add task button
function addTaskOnClick(button) {
    renderProjectMain('taskEntry');
}

// Click add project button
function addProjectOnClick(button) {
    renderProjectMain('projectEntry');
}

// Click submit button on project entry form
function submitProjectOnClick(button) {
    button.preventDefault();

    const name = document.querySelector('#projectName').value;;
    const description = document.querySelector('#projectDescription').value;

    createProject(name, description);
    setActiveProjectIndex(getProjectList().length - 1);
    renderProjectHeader();
    renderProjectMain();
}

// Confirm project delete form
function confirmProjectDeleteOnClick(button) {
    renderProjectMain('projectConfirmDelete');
}

// Click delete project button
function deleteProjectOnClick(button) {
    deleteProject(projectIndex);
    setActiveProjectIndex(0);
    renderProjectHeader();
    renderProjectMain('taskList');
}

function editTaskOnClick(button) {
    const index = button.target.dataset.index;
    const details = document.querySelector(`.detailCollapse[data-index="${index}"`);
    
    if (details.style.gridTemplateRows === "0fr") {
        details.style.gridTemplateRows = "1fr";
    } else {
        details.style.gridTemplateRows = "0fr";
    }    
}

// Click delete button on task list
function deleteTaskOnClick(button) {
    const taskIndex = button.target.dataset.index;
    deleteTask(projectIndex, taskIndex);
    renderProjectHeader();
    renderProjectMain('taskList');
}

// Click submit button on task entry form
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

// Click cancel button on any form
function cancelOnClick(button) {
    button.preventDefault();
    renderProjectMain('taskList');
}

export { renderProjectHeader, renderProjectMain };