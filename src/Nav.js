import './Nav.css';

export default function Nav(props) {
  let outstandingTasks = props.todos.filter((item) => item.completed == false)
  let completedTasks = props.todos.filter((item) => item.completed)
  return(
    <nav className={props.dark ? "dark" : ""}>
      <span>{completedTasks.length} / {props.todos.length}</span>
      <button className='dark-mode-toggle' onClick={props.toggle}>{props.dark ? "Light Mode" : "Dark Mode"}</button>
    </nav>
  )
}