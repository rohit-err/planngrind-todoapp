import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    const todoString = localStorage.getItem("todos")
    if (todoString) {
      const parsedTodos = JSON.parse(todoString)
      if (Array.isArray(parsedTodos)) {
        setTodos(parsedTodos)
      }
    }
  }, [])

  const saveToLS = () => {
    if (todos.length === 0) {
      localStorage.removeItem("todos")
    } else {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  const handleEdit = (e, id) => {
    let t = todos.find(i => i.id === id)
    setTodo(t.todo)
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos)
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    const newTodo = { id: uuidv4(), todo, isCompleted: false }
    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => item.id === id)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }

  useEffect(() => {
    saveToLS()
  }, [todos])

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 p-5 rounded-lg bg-violet-100 min-h-[80vh] max-w-xl shadow-xl">
        <h1 className='font-bold text-center text-3xl mb-5 text-violet-700'>Plan Your Day, Grind Your Goals</h1>

        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-semibold text-violet-600'>Add a Todo</h2>
          <div className="flex items-center">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className='w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-600'
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className='ml-3 p-3 bg-violet-700 text-white font-semibold rounded-full hover:bg-violet-900 disabled:bg-violet-400'>
              Add
            </button>
          </div>
        </div>

        <div className="flex items-center mb-5">
          <input
            type="checkbox"
            id="show"
            onChange={toggleFinished}
            checked={showFinished}
            className="mr-2"
          />
          <label htmlFor="show" className="text-lg font-medium text-violet-600">Show Finished</label>
        </div>

        <div className='border-b mb-5'></div>

        <h2 className='text-2xl font-semibold text-violet-600'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='text-center text-gray-500 py-5'>No Todos to display</div>}
          {todos.map(item => (
            (showFinished || !item.isCompleted) &&
            <div key={item.id} className="todo flex justify-between items-center my-4 p-4 bg-white shadow-lg rounded-lg">
              <div className="flex items-center gap-4">
                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"
                  checked={item.isCompleted}
                  className="mr-3"
                />
                <span className={item.isCompleted ? "line-through text-gray-500" : "text-gray-700"} style={{ wordBreak: 'break-word' }}>{item.todo}</span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={(e) => handleEdit(e, item.id)}
                  className='bg-violet-700 hover:bg-violet-900 p-2 rounded-full text-white'>
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => handleDelete(e, item.id)}
                  className='bg-red-700 hover:bg-red-900 p-2 rounded-full text-white'>
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App






