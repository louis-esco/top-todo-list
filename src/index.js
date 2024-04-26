import project from "./classes/project";
import todoItem from "./classes/todo-item";

function todoController() {
    const myTodos = [];
    const myProjects = [];

    function createProject(projectName) {
        const newProject = new project(projectName);
        myProjects.push(newProject);
    }

    function displayProjects() {
        console.log(myProjects);
        return myProjects;
    }

    function deleteProject(projectId) {
        const pIndex = myProjects.map(p => p.id).indexOf(projectId);
        myProjects.splice(pIndex, 1);
    }

    function addTodoItem(item) {
        const newTodo = new todoItem(item.title, item.description, item.dueDate, item.priority, item.project)
        myTodos.push(newTodo);
    }

    function getTodoIndex(todoId) {
        return myTodos.map(todo => todo.id).indexOf(todoId);
    }

    function displayTodoItems(project) {
        if (project !== undefined) {
            const filteredTodos = myTodos.filter(todo => todo.project === project)
            console.log(filteredTodos);
            return filteredTodos;
        } else {
            console.log(myTodos);
            return myTodos;
        }
    }

    // function getTodoItem(todoId) {
    //     const todoIndex = getTodoIndex(todoId);
    //     console.log(myTodos[todoIndex]);
    //     return myTodos[todoIndex];
    // }

    function markTodoDone(todoId) {
        const todoIndex = getTodoIndex(todoId);
        myTodos[todoIndex].markDone();
    }

    function deleteTodoItem(itemId) {
        const todoIndex = getTodoIndex(itemId);
        myTodos.splice(todoIndex, 1);
    }

    return {
        createProject,
        displayProjects,
        deleteProject,
        addTodoItem,
        displayTodoItems,
        markTodoDone,
        deleteTodoItem,
    }
}

const myItem = {
    title: 'Faire les courses',
    description: 'Plein de choses',
    dueDate: 'demain',
    priority: 'modérée',
    project: 'newlist1'
}

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
