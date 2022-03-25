import logo from './logo.svg';
import './App.css';
import {setState, useState, useEffect} from 'react';

function App() {
  const [todoList, setTodoList] = useState(
    [
      {id: Math.floor(Math.random()*10000), value: "Add your first Todo!", completed: false},
      {id: Math.floor(Math.random()*10000), value: "Tap a todo to toggle status", completed: true}
    ]
    )
  const [newItem, setNewItem] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  let outstandingTasks = todoList.filter((item) => item.completed == false)
  let completedTasks = todoList.filter((item) => item.completed)
  const [outstandingCount, setOutstandingCount] = useState(todoList.filter((item) => item.completed))

  const addItem = () => {
    if(!newItem) {
      return alert("Can\'t save an empty item!")
    }
    setTodoList((prevList) => [...prevList, {id: Math.floor(Math.random() * 1000),value: newItem, completed: false}])

    setNewItem("")
  }

  const deleteItem = (id) => {
    setTodoList((prevList) => prevList.filter((item) => item.id != id))
  }

  const toggleItem = (id) => {
    setTodoList((prevList) => {
      return prevList.map((item) => {
       return item.id == id ? {...item, completed: !item.completed} : item
      })
    })
  }

  const css_wrapper = darkMode ? "wrapper dark-mode" : "wrapper"

  return (
    <div className={css_wrapper}>
      <div className="App">
        <button className='dark-mode-toggle' onClick={() => setDarkMode((prev) => !prev)}>{darkMode ? "Light Mode" : "Dark Mode"}</button>
        {todoList.length == 0 && <h1><span>To Dos</span><span>0 / 0</span></h1>}
        {todoList.length >= 1 && <h1><span>To Dos</span> <span>{completedTasks.length} / {todoList.length}</span></h1>}
          <div className="todo-input">
            <input
              autoComplete="off"
              placeholder="new todo"
              type="text"
              name="todo"
              onChange={(e) => setNewItem(e.target.value)}
              value={newItem} 
            />
            <button onClick={addItem}>+</button>
          </div>
          
        <ul>
          {todoList.map((todo) => {
            let css = todo.completed ? "completed-todo" : "uncompleted-todo"
            return (
              <li className={css} key={todo.id}>
                <span onClick={() => toggleItem(todo.id)}>{todo.value}</span>
                <button className="delete-button" onClick={() => deleteItem(todo.id)}>-</button>
              </li>
            )
        })}
        </ul>
      </div>
    </div>
  );
}

export default App;
