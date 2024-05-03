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
    const todoFormModal = document.querySelector('.todoFormModal');
    const todoForm = document.querySelector('.todoForm');
    const closeFormModalBtn = document.querySelector('.closeFormModalBtn');
    const submitTodoModalBtn = document.querySelector('.submitTodoModal');
    const defaultProj = document.querySelector('.projItemDefault');
    const todoDetailsModal = document.querySelector('.todoDetailsModal');
    const todoDetailsTitle = document.querySelector('.todoDetailsTitle');
    const todoDetailsDesc = document.querySelector('.todoDetailsDesc');
    const todoDetailsDate = document.querySelector('.todoDetailsDate');
    const todoDetailsPrio = document.querySelector('.todoDetailsPrio');
    const todoDetailsActions = document.querySelector('.todoDetailsActions');
    const closeDetailsModalBtn = document.querySelector('.closeDetailsModalBtn');
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

            projItemLeft.addEventListener('click', () => {
                selectedItem(projItem);
                activeProject = proj.name;
                displayTodos(proj.name);
            })

            projItemRight.addEventListener('click', () => {
                todo.deleteProject(proj.id);
                displayProjects();
                activeProject = 'default';
                selectedItem(defaultProj);
                displayTodos('default');
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
        const todos = todo.getProjectTodos(project);
        myTodos.textContent = "";

        for (let td of todos) {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todoItem');
            const todoItemLeft = document.createElement('div');
            todoItemLeft.classList.add('circle');
            const todoItemCenter = document.createElement('div');
            todoItemCenter.classList.add('todoItemCenter');
            const todoItemRight = document.createElement('button');

            const todoTitle = document.createElement('div');
            todoTitle.textContent = td.title;
            const close = new Image();
            close.src = closeIcon;

            todoItemCenter.appendChild(todoTitle);
            todoItemRight.appendChild(close);
            todoItem.appendChild(todoItemLeft);
            todoItem.appendChild(todoItemCenter);
            todoItem.appendChild(todoItemRight);
            myTodos.appendChild(todoItem);

            todoItemLeft.addEventListener('click', () => {
                todo.markTodoDone(td.id);
                todo.deleteTodoItem(td.id);
                displayTodos(activeProject);
            })

            todoItemCenter.addEventListener('click', () => {
                todoDetailsModal.showModal()
                displayTodoDetails(td.id);
            })

            todoItemRight.addEventListener('click', () => {
                todo.deleteTodoItem(td.id);
                displayTodos(activeProject);
            })
        }
    }

    newTodoBtn.addEventListener('click', () => {
        todoFormModal.showModal();
    })

    closeFormModalBtn.addEventListener('click', () => {
        todoFormModal.close();
        todoForm.reset();
    })

    closeDetailsModalBtn.addEventListener('click', () => {
        todoDetailsModal.close();
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
        newTodoItem.dueDate = todoDate.value;
        newTodoItem.priority = todoPriority.value;
        newTodoItem.project = activeProject;

        todo.createTodoItem(newTodoItem);
    }

    function resetTodoDetails() {
        todoDetailsTitle.textContent = "";
        todoDetailsDesc.textContent = "";
        todoDetailsDate.textContent = "";
        todoDetailsPrio.textContent = "";

        todoDetailsActions.textContent = ""
    }

    function displayTodoDetails(todoId) {
        resetTodoDetails();

        const myTodo = todo.getTodoItem(todoId);

        const todoEdit = document.createElement('button');
        todoEdit.textContent = "Edit todo";
        todoEdit.classList.add('editTodo');
        todoDetailsActions.appendChild(todoEdit);

        todoEdit.addEventListener('click', () => {
            editTodoDetails(myTodo);
        })

        const todoDelete = document.createElement('button');
        todoDelete.textContent = "Delete todo";
        todoDelete.classList.add('deleteTodo');
        todoDetailsActions.appendChild(todoDelete);

        todoDelete.addEventListener('click', () => {
            todo.deleteTodoItem(todoId);
            todoDetailsModal.close();
            displayTodos(activeProject);
        })

        todoDetailsTitle.textContent = myTodo.title;
        todoDetailsDesc.textContent = myTodo.description;
        todoDetailsDate.textContent = myTodo.dueDate;
        todoDetailsPrio.textContent = myTodo.priority;
    }

    function editTodoDetails(item) {
        resetTodoDetails();

        const todoTitleInput = document.createElement('input');
        todoTitleInput.value = item.title;
        const todoDescInput = document.createElement('input');
        todoDescInput.value = item.description;
        const todoDateInput = document.createElement('input');
        todoDateInput.type = "date";
        todoDateInput.value = item.dueDate;
        const todoPrioInput = document.createElement('input');
        todoPrioInput.value = item.priority;

        todoDetailsTitle.appendChild(todoTitleInput);
        todoDetailsDesc.appendChild(todoDescInput);
        todoDetailsDate.appendChild(todoDateInput);
        todoDetailsPrio.appendChild(todoPrioInput);

        const saveChangesBtn = document.createElement('button');
        saveChangesBtn.classList.add('editTodo');
        saveChangesBtn.textContent = "Save changes";
        todoDetailsActions.appendChild(saveChangesBtn);

        saveChangesBtn.addEventListener('click', () => {
            const newTitle = todoTitleInput.value;
            const newDesc = todoDescInput.value;
            const newDate = todoDateInput.value;
            const newPrio = todoPrioInput.value;
            const newTodo = { title: newTitle, description: newDesc, dueDate: newDate, priority: newPrio }

            todo.editTodoItem(item.id, newTodo);
            displayTodoDetails(item.id);
        })
    }

    displayProjects();
    displayTodos('default');
}