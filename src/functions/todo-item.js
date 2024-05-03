import { v4 as uuidv4 } from 'uuid';

export default class todoItem {
    constructor(title, description, dueDate, priority, project = "default") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project
        this.done = false;
        this.id = uuidv4();
    }

    setTitle(title) {
        this.title = title;
    }

    setDesc(desc) {
        this.description = desc;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    markDone() {
        this.done = true;
    }

}