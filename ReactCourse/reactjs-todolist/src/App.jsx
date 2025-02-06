import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import { useState, useEffect } from 'react';

function App() {
  
  const [todos, setTodos] = useState([
    'Go to the gym',
    'Eat more fruits and vege',
    'Pick up the kids from school',
  ])
  const [todoValue, setTodoValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos: newList }))
  }

  function handleAddTodos(newTodo) {
    if (editingIndex !== null) {
      let updatedTodos = [...todos];
      updatedTodos[editingIndex] = newTodo;
      persistData(updatedTodos);
      setTodos(updatedTodos);
      setEditingIndex(null);
    } else if (!newTodo.trim()) return
    else {
      setTodos([...todos, newTodo])
      persistData(todos);
    }
  }



  function handleDeleteTodos(todoIndex) {
    setTodos(todos.filter((_, index) => index !== todoIndex));
    persistData(todos);
  }

  function handleEditTodos(index) {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodos(index)
  }

  useEffect(() => {
    if (!localStorage) {
      return
    }

    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }

    console.log(localTodos)
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)

  }, [])
  
  return (
    <>
      <TodoInput handleAddTodos={handleAddTodos} todoValue={todoValue} setTodoValue={setTodoValue} editingIndex={editingIndex} />
      <TodoList todos={todos} handleDeleteTodos={handleDeleteTodos} handleEditTodos={handleEditTodos} />
    </>
  )
}

export default App
