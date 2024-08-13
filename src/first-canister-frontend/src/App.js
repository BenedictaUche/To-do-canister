
import { html, render } from 'lit-html';
import { first_canister_backend } from 'declarations/first-canister-backend';
import logo from './logo2.svg';

class App {
  todos = [];

  constructor() {
    this.fetchTodos();
  }

  fetchTodos = async () => {
    this.todos = await first_canister_backend.getTodos();
    this.render();
  };

  handleAddTodo = async (e) => {
    e.preventDefault();
    const todoInput = document.getElementById('todo');
    const newTodo = todoInput.value.trim();
    if (newTodo) {
      await first_canister_backend.addTodo(newTodo);
      todoInput.value = '';
      this.fetchTodos();
    }
  };

  handleRemoveTodo = async (index) => {
    await first_canister_backend.removeTodo(index);
    this.fetchTodos();
  };

  render() {
    let todoItems = this.todos.map((todo, index) => html`
      <li>
        ${todo} <button @click=${() => this.handleRemoveTodo(index)}>Remove</button>
      </li>
    `);

    let body = html`
      <main>
        <img src="${logo}" alt="DFINITY logo" />
        <br />
        <br />
        <form id="todo-form">
          <label for="todo">Create a to-do list &nbsp;</label>
          <br />
          <div class="input">
          <input id="todo" type="text" />
          <button type="submit">Add</button>
          </div>
        </form>
        <ul>${todoItems}</ul>
      </main>
    `;

    render(body, document.getElementById('root'));
    document
      .getElementById('todo-form')
      .addEventListener('submit', this.handleAddTodo);
  }
}

export default App;
