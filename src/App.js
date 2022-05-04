import React from 'react';
//import logo from './logo.svg';
import './App.css';

function App() {
  const[todos, setTodos] = React.useState([]) 
  const [todo, setTodo] = React.useState("")

  React.useEffect(() => { //Only run the effect on the initial render
    const temp = localStorage.getItem("todos") //getting localstorage
    const loadedTodos = JSON.parse(temp) //transforming json string into a js object

    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  React.useEffect(() => {
    const tmp = JSON.stringify(todos)
    localStorage.setItem("todos", tmp)
    
  }, [todos])

  function handleSubmit(e){
    //otherwise the page will reload
    e.preventDefault()

    const newTodo = {
      id: new Date().getTime(),
      text: todo, 
      completed: false,
    }

    setTodos([...todos].concat(newTodo))
    setTodo("")
  }

  function deleteTodo(id){
    const updateTodos = [...todos].filter((todo) => todo.id !== id ) //copy the table here

    setTodos(updateTodos)
  }

  function toggleComplete(id){
    const updateTodos = [...todos].map((todo) => {
      if(todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo
    })

    setTodos(updateTodos)

  }

  return (
    <div className="wrapper">
      <h1 align="center">My Todo App</h1>
      <form className="todo-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Fill in the task" onChange={(e) => setTodo(e.target.value)} value={todo}/>
        <button type="submit"><i className="fas fa-plus"></i></button>
      </form>
      {todos.map((todo) => <div className="todo-list" key={todo.id}>
        <div>{todo.text}</div>
        <button class="icon" onClick={() => deleteTodo(todo.id)}><i className="fas fa-trash"></i></button>
        <div className="form-check form-switch">
          <input
            className="form-check-input" 
            type="checkbox" 
            onChange={() => toggleComplete(todo.id)} 
            checked={ todo.completed}/>
        </div>
      </div>)}
    </div>
  );
}

export default App;
