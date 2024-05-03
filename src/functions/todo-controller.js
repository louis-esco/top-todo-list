import project from "./project";
import todoItem from "./todo-item";
import storageManager from "../storage/storage";

export default function todoController() {
    const myTodos = [];
    const myProjects = [];
    const myStorage = storageManager();

    if (localStorage.myTodos === undefined || localStorage.myProjects === undefined) {
        myStorage.populateStorage(myProjects, myTodos);
    }

    function createProject(projectName) {
        const newProject = new project(projectName);
        myStorage.addProject(newProject);
    }

    function getProjects() {
        return myStorage.getProjects();
    }

    function deleteProject(projectId) {
        const pIndex = myStorage.getProjects().map(p => p.id).indexOf(projectId);
        deleteProjectTodos(pIndex);
        myStorage.deleteProject(pIndex);
    }

    function deleteProjectTodos(pIndex) {
        const todos = myStorage.getTodos();

        const tdIndexes = todos.reduce((acc, curr, index) => {
            if (curr.project === myStorage.getProjects()[pIndex].name) {
                acc.push(index);
            }
            return acc;
        }, []);

        for (let td of tdIndexes) {
            myStorage.deleteTodo(td);
        }
    }

    function createTodoItem(item) {
        const newTodo = new todoItem(item.title, item.description, item.dueDate, item.priority, item.project);
        myStorage.addTodo(newTodo);
    }

    function getTodoIndex(todoId) {
        return myStorage.getTodos().map(todo => todo.id).indexOf(todoId);
    }

    function getTodoItems(project) {
        if (project !== 'default') {
            const filteredTodos = myStorage.getTodos().filter(todo => todo.project === project)
            return filteredTodos;
        } else {
            return myStorage.getTodos();
        }
    }

    function getTodoItem(todoId) {
        const tdIndex = getTodoIndex(todoId);
        return myStorage.getTodos()[tdIndex];
    }

    function editTodoItem(todoId, newItem) {
        const tdIndex = getTodoIndex(todoId);
        myStorage.editItem('myTodos', tdIndex, newItem);
    }

    function deleteTodoItem(itemId) {
        const todoIndex = getTodoIndex(itemId);
        myStorage.deleteTodo(todoIndex);
    }

    return {
        createProject,
        getProjects,
        deleteProject,
        createTodoItem,
        getTodoItems,
        getTodoItem,
        editTodoItem,
        deleteTodoItem,
    }
}