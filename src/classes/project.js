export default class project {
    constructor(name) {
        this.name = name;
        this.items = [];
    }

    addItem(item) {
        this.items.push(item);
    }

    removeItem(item) {
        const itemIndex = this.items.map(i => i.title).indexOf(item);
        this.items.splice(itemIndex, 1);
    }
}