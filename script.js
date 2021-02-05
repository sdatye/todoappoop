/**/

//Class to hold text, completed and id 
class Todo {

    constructor(id, text, completed) {
        console.log("Todo::constructor");
        this.id = id;
        this.text = text;
        this.completed = completed;
    }

}

//instead of creating separate functions
//put all related functions in a single class - Encapsulation
class TodoComponent {

    //Field

    constructor() {

        console.log("TodoComponent::constructor");
        this.todoIdCounter = 1;
        this.todoArray = [];

        const todoAddButtonElement = document.querySelector("#todoAddButton");
        todoAddButtonElement.addEventListener("click", () => {
            console.log("aaya");
            this.addTodo();
        });
    }
    //rendered on web page

    renderTodo(todoObject) {
        console.log("TodoComponent::renderTodo");
        console.log(todoObject);

        const todoUlElement = document.querySelector("#todoUl");

        const template = `
        <li id="todo-${todoObject.id}">
            <input id="chk-${todoObject.id}" type="checkbox" ${todoObject.completed ? "checked" : ""} />
            <label>${todoObject.text}</label>
            <button id="delete-${todoObject.id}">X</button>
        </li>
        `;

        todoUlElement.insertAdjacentHTML("beforeend", template);
        const todoDeleteButtonElement = document.querySelector(`#delete-${todoObject.id}`);

        
        todoDeleteButtonElement.addEventListener("click", () => {
            console.log("aaya");
            this.deleteTodo('todo-' + todoObject.id, todoObject.text);
        });

        const todoCheckBoxElement = document.querySelector(`#chk-${todoObject.id}`);

        todoCheckBoxElement.addEventListener("click", () => { 
            this.checkTodo(todoObject.text, todoCheckBoxElement.checked);
        });

    }

    checkTodo(text, checked) {

        this.todoArray = JSON.parse(sessionStorage.getItem("todoArray") || '[]');
        
        let todoItem = this.todoArray.find(item => item.text === text);
        if (todoItem !== null || todoItem != undefined) {
            todoItem.completed = checked;
            sessionStorage.setItem("todoArray", JSON.stringify(this.todoArray));
        }
    }



    //user enter todo and clicks add
   
    addTodo() {

        console.log("TodoComponent::addTodo")
        //get the input element
        const todoInputElement = document.querySelector("#todoInput");

        ///get the text
        const todoText = todoInputElement.value;

        ///create the todoobject
        const todoObject = new Todo(this.todoIdCounter, todoText, false);
        this.todoIdCounter++;

        ///add to array
        this.todoArray.push(todoObject);

        sessionStorage.setItem("todoArray", JSON.stringify(this.todoArray));
        console.log({ todoObject });

        console.log({ todoArray: this.todoArray }); //this is the same as console.log (this.todoArray);

        this.renderTodo(todoObject);
    }


    deleteTodo(id, text) {
        this.todoArray = JSON.parse(sessionStorage.getItem("todoArray") || '[]');
        const todoUL = document.querySelector("#todoUl");
        const listitem = todoUL.querySelector("#" + id);
        todoUL.removeChild(listitem);
        let pos = this.todoArray.findIndex(item => item.text === text);
        if (pos !== null || pos != undefined) {
            this.todoArray.splice(pos, 1);
            sessionStorage.setItem("todoArray", JSON.stringify(this.todoArray));
        }
    }

    // reload show all to do

    reloadTodo() {
        console.log("TodoComponent::reload");
        this.todoArray = JSON.parse(sessionStorage.getItem("todoArray") || '[]');
        this.todoArray.forEach(todoObject => {
            this.renderTodo(todoObject);

        });
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const todoComponent = new TodoComponent();
    console.log({ todoComponent });
    todoComponent.reloadTodo();
});
// document on load