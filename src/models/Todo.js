import { v4 as uuidv4 } from 'uuid';

class Todo {
    constructor(title, completed = false) {
        this.id = uuidv4();
        this.title = title;
        this.completed = completed;
    }
}

export default Todo;