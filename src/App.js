import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import Nav from './Nav.js'

function App() {
  const [todoList, setTodoList] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : []
  })

  localStorage.setItem('todos', JSON.stringify(todoList))
  const [newItem, setNewItem] = useState("")
  const [dark, setDark] = useState(
    localStorage.getItem('dark-mode') === 'true'
  );

  const handleInput = (e) => {
    setNewItem(e.target.value)
    if (e.target.value && e.key === 'Enter') {
      addItem(newItem)
    }
  }

  const addItem = () => {
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

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
    localStorage.setItem('dark-mode', dark);
  }, [dark]);

  const css_wrapper = dark ? "wrapper dark-mode" : "wrapper"

  return (
    <main>
      <div className={css_wrapper}>
        <Nav 
          dark={dark} 
          toggle={() => setDark((prev) => !prev)}
          todos={todoList}
        />
        <div className="App">
            <div className="todo-input">
              <input
                autoComplete="off"
                placeholder="new todo"
                type="text"
                name="todo"
                onChange={(e) => handleInput(e)}
                onKeyUp={(e) => handleInput(e)}
                value={newItem}
              />
              <button disabled={!newItem} className={newItem ? 'fill' : '' } onClick={addItem}>+</button>
            </div>
            
          <ul>
            {todoList.map((todo) => {
              let css = todo.completed ? "completed-todo" : "incomplete-todo"
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
    </main>
  );
}

export default App;
