import React, {useState, useRef, useEffect} from 'react';
// call the useState hook in order to reload all our components when we update
// useref hook allows us to reference elements in our HTML like input
// useeffect hook - side effect func to store data in session
import TodoList from "./TodoList"
import {v4 as uuidv4} from 'uuid'

// import logo from './logo.svg';
// import './App.css';
const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
 const [todos, setTodos] = useState([])
 const todoNameRef = useRef()
  // call the usestate func and pass it our default state.
  // useState returns an array so we can destructure it - pass all of the todos, then a func to set them

  // but still need to load them when page loads - will only be called once when component loads
  useEffect(()=> {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(()=> {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])
  // save our array to local storage anytime it changes

  // new function for toggle checkbox
function toggleTodo(id) {
  const newTodos = [...todos]
  // making a copy of current todos list. in react, never directly modify a state variable, always make a copy first
  const todo = newTodos.find(todo => todo.id === id)
  todo.complete = !todo.complete
  setTodos(newTodos)
}


  // function to create events for adding todos
  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === "") return 
      console.log(name)
      setTodos(prevTodos => {
        return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
      })
      todoNameRef.current.value = null
  }

  function handleClearTodos(){
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
    <TodoList todos={todos} toggleTodo = {toggleTodo} />
    {/* passing props */}
    <input ref={todoNameRef} type = "text" />
    <button onClick = {handleAddTodo}>Add ToDo</button>
    <button onClick={handleClearTodos}>Clear complete</button>
    <div>{todos.filter(todo=> !todo.complete).length} left todo</div>
    </>
    // thisis  jSX - reacts version of html - embed components inside of components
    // we have returned a fragment that is returning 2 things
  )
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React Today!
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
