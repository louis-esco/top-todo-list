import todoItem from "../functions/todo-item";

export default function storageManager() {

    function populateStorage(projects, todos) {
        localStorage.clear();
        localStorage.setItem('myProjects', JSON.stringify(projects));
        localStorage.setItem('myTodos', JSON.stringify(todos));
    }

    function getProjects() {
        return JSON.parse(localStorage.getItem('myProjects'));
    }

    function getTodos() {
        let todosList = JSON.parse(localStorage.getItem('myTodos'));
        todosList = todosList.map((td) => Object.assign(new todoItem(), td))
        return todosList;
    }

    function addProject(project) {
        const projectsList = getProjects();
        projectsList.push(project);
        localStorage.setItem('myProjects', JSON.stringify(projectsList));
    }

    function addTodo(todo) {
        const todosList = getTodos();
        todosList.push(todo);
        localStorage.setItem('myTodos', JSON.stringify(todosList));
    }

    function editTodo(itemIndex, newItem) {
        const todosList = getTodos();
        todosList[itemIndex].setTitle(newItem.title);
        todosList[itemIndex].setDesc(newItem.description);
        todosList[itemIndex].setDueDate(newItem.dueDate);
        todosList[itemIndex].setPriority(newItem.priority);

        localStorage.setItem('myTodos', JSON.stringify(todosList));
    }

    function deleteProject(index) {
        const projectsList = getProjects();
        projectsList.splice(index, 1);
        localStorage.setItem('myProjects', JSON.stringify(projectsList));
    }

    function deleteTodo(index) {
        const todosList = getTodos();
        todosList.splice(index, 1);
        localStorage.setItem('myTodos', JSON.stringify(todosList));
    }

    return {
        populateStorage,
        addTodo,
        addProject,
        getProjects,
        getTodos,
        deleteProject,
        deleteTodo,
        editTodo
    }
}

