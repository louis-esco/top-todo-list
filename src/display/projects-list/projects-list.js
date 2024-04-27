import todoController from "../../functions/todo-controller";
import "./projects-list.css"
import projectIcon from "../../img/project.svg";
import closeIcon from "../../img/close.svg";

export default function projectsList() {
    const todo = todoController();
    const myProjects = document.querySelector('.myProjects');
    const newProjectBtn = document.querySelector('.newProjectBtn');

    function displayProjects() {
        const projects = todo.getProjects();
        myProjects.textContent = "";

        for (let proj of projects) {
            const projItem = document.createElement('div');
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

    return {
        displayProjects,
        createNewProject
    }
}