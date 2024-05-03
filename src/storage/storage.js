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
        return JSON.parse(localStorage.getItem('myTodos'));
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

    function editItem(array, itemIndex, newItem) {
        const myArray = getTodos();
        myArray[itemIndex].title = newItem.title;
        myArray[itemIndex].description = newItem.description;
        myArray[itemIndex].dueDate = newItem.dueDate;
        myArray[itemIndex].priority = newItem.priority;

        localStorage.setItem(array, JSON.stringify(myArray));
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
        editItem
    }
}

