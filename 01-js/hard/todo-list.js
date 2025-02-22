/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(){
    this.todo=[];
  }

  add(todo){
    this.todo.push(todo);
  }
  remove(indexOfTodo){
    if(this.todo.length <= indexOfTodo) return null;
    this.todo.splice(indexOfTodo, 1)
  }
  update(index, updatedTodo){
    console.log('in update', index, this.todo.length );
    if(this.todo.length <= index) return null;
    this.todo[index] = updatedTodo;
  }
  getAll(){
    return this.todo;
  }

  get(indexOfTodo){
    if(this.todo.length <= indexOfTodo) return null;
    return this.todo[indexOfTodo];
  }
  clear(){
    this.todo = [];
  }
}

module.exports = Todo;
