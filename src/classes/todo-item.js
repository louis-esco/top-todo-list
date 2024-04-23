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

    markDone() {
        this.done = true;
    }
}