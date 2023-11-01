import { 
    createProject, 
    deleteProject, 
    createTask, 
    deleteTask, 
    getProjectList, 
    editTask 
} from './task';

import { renderProjectHeader, renderProjectMain } from './interface';

createProject('Test Project', 'A project for testing');
createProject('Test Project 2', 'A project for testing 2');

createTask(0, 'shopping', 'food', 'today');
createTask(0, 'other', 'stuff', 'today');
createTask(0, 'Yaes', 'Yaes', 'today');

renderProjectHeader();

renderProjectMain('taskList');

