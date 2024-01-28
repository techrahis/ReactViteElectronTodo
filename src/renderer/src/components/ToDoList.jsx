import React, { useState, useEffect } from 'react'
import { FaTrash, FaCheck, FaEdit } from 'react-icons/fa'

function ToDoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      return JSON.parse(savedTodos)
    } else {
      return []
    }
  })
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = (e) => {
    e.preventDefault()
    setTodos([...todos, { text: input, completed: false }])
    setInput('')
  }

  const handleDeleteTodo = (todoToDelete) => {
    setTodos(todos.filter((todo) => todo.text !== todoToDelete.text))
  }

  const handleCompleteTodo = (todoToComplete) => {
    setTodos(
      todos.map((todo) =>
        todo.text === todoToComplete.text ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const [editingTodo, setEditingTodo] = useState(null)

  const handleEditTodo = (todoToEdit) => {
    setEditingTodo(todoToEdit)
    setInput(todoToEdit.text)
  }

  const handleUpdateTodo = (e) => {
    e.preventDefault()
    if (editingTodo) {
      setTodos(
        todos.map((todo) => (todo.text === editingTodo.text ? { ...todo, text: input } : todo))
      )
      setInput('')
      setEditingTodo(null)
    } else {
      handleAddTodo(e)
    }
  }

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  )

  const sortedTodos = filteredTodos.sort((a, b) => a.completed - b.completed)

  return (
    <div className="pt-5 pb-20 px-[25%] flex flex-col">
      <h1 className="text-3xl font-bold text-gray-50 text-center my-10">To Do List</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border-2 border-gray-300 rounded-md p-2 mb-5 justify-center"
        placeholder="Search tasks"
      />
      <form onSubmit={handleUpdateTodo} className="mb-5 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2 mr-2 w-full"
          placeholder="Add a task"
        />
        <button type="submit" className="bg-sky-500 font-bold text-white rounded-md px-4 py-2 w-36">
          {editingTodo ? 'Update' : 'Add'}
        </button>
      </form>
      <ul>
        {sortedTodos.map((todo, index) => (
          <li key={index} className={`flex justify-between mb-4 border rounded-md p-4`}>
            <span
              className={`mr-2 font-semibold text-lg text-gray-200 ${todo.completed ? 'strike-through' : ''}`}
            >
              {todo.text}
            </span>
            <div>
              <button
                onClick={() => handleCompleteTodo(todo)}
                className="bg-green-500 text-white rounded-md px-2 py-1 mr-2"
              >
                <FaCheck />
              </button>
              <button
                onClick={() => handleEditTodo(todo)}
                className="bg-yellow-500 text-white rounded-md px-2 py-1 mr-2"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteTodo(todo)}
                className="bg-red-500 text-white rounded-md px-2 py-1"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ToDoList
