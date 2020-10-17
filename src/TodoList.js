import React from 'react'
import Todo from "./Todo"

export default function todolist({todos, toggleTodo}) {
  return (
    /* {todos.length} */
    todos.map(todo=> {
      return <Todo key={todo.id} toggleTodo={toggleTodo} todo ={todo}/>
    })
    // need the unique key so react only re-renders updated elements
    
  )
}
