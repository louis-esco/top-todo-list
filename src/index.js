import todoItem from "./classes/todo-item";
import project from "./classes/project";

function todoController() {
    const defaultProject = new project('default');
    const myProjects = [defaultProject];

    function createProject(projectName) {
        const newProject = new project(projectName);
        myProjects.push(newProject);
    }

    function displayProjects() {
        console.log(myProjects);
    }

    function deleteProject(projectName) {
        const projectIndex = myProjects.map(p => p.name).indexOf(projectName);
        myProjects.splice(projectIndex, 1);
    }

    function addTodoItem(project, item) {
        const newItem = new todoItem(item.title, item.description, item.dueDate, item.priority)
        const projectIndex = myProjects.map(p => p.name).indexOf(project);
        myProjects[projectIndex].addItem(newItem);
    }

    function removeTodoItem(project, itemTitle) {
        const projectIndex = myProjects.map(p => p.name).indexOf(project);
        myProjects[projectIndex].removeItem(itemTitle);

    }

    return {
        createProject,
        displayProjects,
        deleteProject,
        addTodoItem,
        removeTodoItem
    }
}

const myitem = {
    title: 'Faire les courses',
    description: 'Plein de choses',
    dueDate: 'demain',
    priority: 'modérée'
}

const todo = todoController();
todo.createProject('newlist');
todo.createProject('newlist1');
todo.createProject('newlist2');
todo.createProject('newlist3');
todo.deleteProject('newlist2');
todo.displayProjects();
todo.addTodoItem('newlist1', myitem);
todo.removeTodoItem('newlist1', 'Faire les courses');
