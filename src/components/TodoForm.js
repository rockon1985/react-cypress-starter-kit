import React from 'react'

export default props =>
  <form onSubmit={props.handleSubmit}>
    <input
      autoFocus
      type='text'
      value={props.currentTodo}
      onChange={props.handleTodoChange}
      className="new-todo"
      placeholder="What needs to be done?"/>
  </form>
