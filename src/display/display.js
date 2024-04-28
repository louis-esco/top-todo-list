import todoController from "../functions/todo-controller";
import "./display.css"
import projectIcon from "../img/project.svg";
import closeIcon from "../img/close.svg";

export default function displayList() {
    const todo = todoController();
    const myProjects = document.querySelector('.myProjects');
    const myTodos = document.querySelector('.myTodos');
    const newProjectBtn = document.querySelector('.newProjectBtn');
    const newTodoBtn = document.querySelector('.addTodoBtn');
    const todoModal = document.querySelector('.todoFormModal');
    const todoForm = document.querySelector('.todoForm');
    const closeModalBtn = document.querySelector('.closeModalBtn');
    const submitTodoModalBtn = document.querySelector('.submitTodoModal');
    const defaultProj = document.querySelector('.projItemDefault');
    let activeProject = 'default';

    function selectedItem(activeSelection) {
        const projItems = document.querySelectorAll('.projItem');
        for (let item of projItems) {
            item.classList.remove('selected');
        }
        activeSelection.classList.add('selected');
    };

    defaultProj.addEventListener('click', () => {
        selectedItem(defaultProj);
        activeProject = 'default';
        displayTodos(activeProject);
    })

    function displayProjects() {
        const projects = todo.getProjects();
        myProjects.textContent = "";

        for (let proj of projects) {
            const projItem = document.createElement('button');
            projItem.classList.add('projItem');

            const projItemLeft = document.createElement('div');
            projItemLeft.classList.add('projItemLeft');
            const projItemRight = document.createElement('button');
            projItemRight.classList.add('projItemRight');

            const projIcon = new Image();
            projIcon.src = projectIcon;
            const projectName = document.createElement('div');
            projectName.textContent = proj.name;

            const close = new Image();
            close.src = closeIcon;

            projItemLeft.appendChild(projIcon);
            projItemLeft.appendChild(projectName);
            projItemRight.appendChild(close);
            projItem.appendChild(projItemLeft);
            projItem.appendChild(projItemRight);
            myProjects.appendChild(projItem);

            projItem.addEventListener('click', () => {
                selectedItem(projItem);
                activeProject = proj.name;
                displayTodos(proj.name);
            })

            projItemRight.addEventListener('click', () => {
                todo.deleteProject(proj.id);
                displayProjects();
            })
        }
    }

    function createNewProject() {
        const projForm = document.createElement('form');
        const formProjInput = document.createElement('input');
        formProjInput.type = "text";
        const submitBtn = document.createElement('button');
        submitBtn.textContent = 'Create'
        submitBtn.type = "submit";
        const cancelBtn = document.createElement('button');
        cancelBtn.textContent = 'Cancel';

        projForm.appendChild(formProjInput);
        projForm.appendChild(submitBtn);
        projForm.appendChild(cancelBtn);
        myProjects.appendChild(projForm);

        formProjInput.focus();

        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const projName = formProjInput.value;
            todo.createProject(projName);
            displayProjects();
            newProjectBtn.style.display = "flex";
        })

        cancelBtn.addEventListener('click', (e) => {
            e.preventDefault();
            displayProjects();
            newProjectBtn.style.display = "flex";
        })
    }

    newProjectBtn.addEventListener('click', () => {
        newProjectBtn.style.display = "none";
        createNewProject();

    });

    function displayTodos(project) {
        const todos = todo.getTodoItems(project);
        myTodos.textContent = "";

        for (let td of todos) {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todoItem');
            const todoItemLeft = document.createElement('div');
            const todoItemRight = document.createElement('button');

            const todoTitle = document.createElement('div');
            todoTitle.textContent = td.title;
            const close = new Image();
            close.src = closeIcon;

            todoItemLeft.appendChild(todoTitle);
            todoItemRight.appendChild(close);
            todoItem.appendChild(todoItemLeft);
            todoItem.appendChild(todoItemRight);
            myTodos.appendChild(todoItem);

            todoItemRight.addEventListener('click', () => {
                todo.deleteTodoItem(td.id);
                displayTodos(activeProject);
            })
        }
    }

    newTodoBtn.addEventListener('click', () => {
        todoModal.showModal();
    })

    closeModalBtn.addEventListener('click', () => {
        todoModal.close();
        todoForm.reset();
    })

    submitTodoModalBtn.addEventListener('click', () => {
        createNewTodo();
        displayTodos(activeProject);
        todoForm.reset();
    })

    function createNewTodo() {
        const newTodoItem = {};
        const todoTitle = document.querySelector('#todoTitle');
        const todoDescription = document.querySelector('#todoDescription');
        const todoDate = document.querySelector('#todoDate');
        const todoPriority = document.querySelector('#todoPriority');

        newTodoItem.title = todoTitle.value;
        newTodoItem.description = todoDescription.value;
        newTodoItem.date = todoDescription.value;
        newTodoItem.priority = todoPriority.value;
        newTodoItem.project = activeProject;

        todo.createTodoItem(newTodoItem);
    }


    displayProjects();
    displayTodos('default');
}