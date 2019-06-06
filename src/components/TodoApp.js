import React, {Component} from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import Footer from './Footer'
import {saveTodo, loadTodo, destroyTodo, updateTodo} from '../lib/service';

export default class TodoApp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      currentTodo: ''
    }
    this.handleTodoChange = this.handleTodoChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  componentDidMount() {
    loadTodo()
      .then(({data}) => this.setState({todos: data}))
      .catch(() => this.setState({error: true}))
  }

  handleTodoChange (event) {
    this.setState({ currentTodo: event.target.value })
  }

  handleToggle (id) {
    const target = this.state.todos.find(i => i.id === id)
    const updatedTodo = {
      ...target,
      isComplete: !target.isComplete
    }
    updateTodo(updatedTodo)
      .then(({data}) => {
        const targetIndex = this.state.todos.findIndex(i => i.id === data.id)
        const newTodos = this.state.todos
        newTodos[targetIndex] = data
        this.setState({ todo: newTodos })
      })

  }

  handleSubmit (event) {
    event.preventDefault()
    const newTodo = { name: this.state.currentTodo, isComplete: false }
    saveTodo(newTodo)
      .then(({data}) => this.setState({
        todos: this.state.todos.concat(data),
        currentTodo: ''
      }))
      .catch(err => this.setState({ error: true }))
  }

  handleDelete (id) {
    destroyTodo(id)
      .then(() => this.setState({
        todos: this.state.todos.filter(i => i.id !== id)
      }))
  }

  render () {
    const remainingItems = this.state.todos.filter(i => !i.isComplete).length;
    return (
      <Router>
        <div>
          <header className="header">
            <h1>todos</h1>
            {this.state.error ? <span className='error'>Something's wrong!</span> : null}
            <TodoForm currentTodo={this.state.currentTodo}
              handleTodoChange={this.handleTodoChange}
              handleSubmit={this.handleSubmit}
            />
          </header>
          <section className="main">
            <TodoList todos={this.state.todos}
              handleDelete={this.handleDelete}
              handleToggle={this.handleToggle}
            />
          </section>
          <Footer remainingItems={remainingItems}/>
        </div>
      </Router>
    )
  }
}
