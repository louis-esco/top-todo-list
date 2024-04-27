import projectsList from "./display/projects-list/projects-list";
import todoController from "./functions/todo-controller";
import "./styles.css";

const myItem = {
    title: 'Faire les courses',
    description: 'Plein de choses',
    dueDate: 'demain',
    priority: 'modérée',
    project: 'newlist1'
}


const projects = projectsList();
window.projects = projects;

const todo = todoController();
window.todo = todo;


// todo.createProject('newlist');
// todo.createProject('newlist1');
// todo.createProject('newlist2');
// todo.createProject('newlist3');
// const pId = todo.displayProjects();
// todo.deleteProject(pId[2].id);
// todo.addTodoItem(myItem);
// const tdId = todo.displayTodoItems()[0].id;
// todo.markTodoDone(tdId);
// todo.displayTodoItems();
// todo.displayTodoItems('newlist');
