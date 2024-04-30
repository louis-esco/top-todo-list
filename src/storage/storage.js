export default function storageManager() {

    function populateStorage(projects, todos) {
        localStorage.clear();
        localStorage.setItem('myProjects', JSON.stringify(projects));
        localStorage.setItem('myTodos', JSON.stringify(todos));
    }

    function getArray(array) {
        return JSON.parse(localStorage.getItem(array));
    }

    function addItem(array, item) {
        const myArray = getArray(array);
        myArray.push(item);
        localStorage.setItem(array, JSON.stringify(myArray));
    }

    function editItem(array, itemIndex, newItem) {
        const myArray = getArray(array);
        myArray[itemIndex].title = newItem.title;
        myArray[itemIndex].description = newItem.description;
        myArray[itemIndex].dueDate = newItem.dueDate;
        myArray[itemIndex].priority = newItem.priority;

        localStorage.setItem(array, JSON.stringify(myArray));
    }

    function deleteItem(array, index) {
        const myArray = getArray(array);
        myArray.splice(index, 1);
        localStorage.setItem(array, JSON.stringify(myArray));
    }

    return {
        populateStorage,
        addItem,
        getArray,
        deleteItem,
        editItem
    }
}

