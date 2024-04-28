import project from "./project";
import todoItem from "./todo-item";

export default function todoController() {
    const myTodos = [];
    const myProjects = [];

    function createProject(projectName) {
        const newProject = new project(projectName);
        myProjects.push(newProject);
    }

    function getProjects() {
        console.log(myProjects);
        return myProjects;
    }

    function deleteProject(projectId) {
        const pIndex = myProjects.map(p => p.id).indexOf(projectId);
        myProjects.splice(pIndex, 1);
    }

    function createTodoItem(item) {
        const newTodo = new todoItem(item.title, item.description, item.dueDate, item.priority, item.project)
        myTodos.push(newTodo);
    }

    function getTodoIndex(todoId) {
        return myTodos.map(todo => todo.id).indexOf(todoId);
    }

    function getTodoItems(project) {
        if (project !== 'default') {
            const filteredTodos = myTodos.filter(todo => todo.project === project)
            console.log(filteredTodos);
            return filteredTodos;
        } else {
            console.log(myTodos);
            return myTodos;
        }
    }

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
        getProjects,
        deleteProject,
        createTodoItem,
        getTodoItems,
        markTodoDone,
        deleteTodoItem,
    }
}