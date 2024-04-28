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
        myStorage.addItem('myProjects', newProject);
    }

    function getProjects() {
        return myStorage.getArray('myProjects');
    }

    function deleteProject(projectId) {
        const pIndex = myStorage.getArray('myProjects').map(p => p.id).indexOf(projectId);
        const todos = myStorage.getArray('myTodos');

        const tdIndexes = todos.reduce((acc, curr, index) => {
            if (curr.project === myStorage.getArray('myProjects')[pIndex].name) {
                acc.push(index);
            }
            return acc;
        }, []);

        for (let td of tdIndexes) {
            myStorage.deleteItem('myTodos', td);
        }

        myStorage.deleteItem('myProjects', pIndex);
    }

    function createTodoItem(item) {
        const newTodo = new todoItem(item.title, item.description, item.dueDate, item.priority, item.project);
        myStorage.addItem('myTodos', newTodo);
    }

    function getTodoIndex(todoId) {
        return myStorage.getArray('myTodos').map(todo => todo.id).indexOf(todoId);
    }

    function getTodoItems(project) {
        if (project !== 'default') {
            const filteredTodos = myStorage.getArray('myTodos').filter(todo => todo.project === project)
            return filteredTodos;
        } else {
            return myStorage.getArray('myTodos');
        }
    }

    function deleteTodoItem(itemId) {
        const todoIndex = getTodoIndex(itemId);
        myStorage.deleteItem('myTodos', todoIndex);
    }

    return {
        createProject,
        getProjects,
        deleteProject,
        createTodoItem,
        getTodoItems,
        deleteTodoItem,
    }
}