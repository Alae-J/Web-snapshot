import { useState, useEffect } from "react";
import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"

function App() {

  // const todos = [
  //   { input: 'Hello! Add your first todo!', complete: true },
  //   { input: 'Get the groceries!', complete: false },
  //   { input: 'Learn how to web design', complete: false },
  //   { input: 'Say hi to gran gran', complete: true },
  // ];

  const [selectedTab, setSelectedTab] = useState('Open');

  const [todoInput, setTodoInput] = useState('')

  const [todos, setTodos] = useState([{ input: 'Hello! Add your first todo!', complete: true }]);

  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, {input: newTodo, complete: false}]
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleCompleteTodo(index) {
    const newCompletedTodo = todos[index];
    const modifiedTodos = [...todos];
    newCompletedTodo.complete = true;
    modifiedTodos[index] = newCompletedTodo;
    setTodos(modifiedTodos);
    handleSaveData(modifiedTodos);
  }

  function handleEditTodo(index, newTodoValue) {
    const editedTodoList = [...todos];
    editedTodoList[index].input = newTodoValue;
    setTodos(editedTodoList);
    setTodoInput('');
    handleSaveData(editedTodoList);
  }

  function handleDeleteButton(index) {
    const newTodos = todos.filter((value) => {
      return todos[index] != value
    });
    setTodos(newTodos);
    handleSaveData(newTodos);
  }

  function handleSaveData(latestTodos) {
    localStorage.setItem('todo-app', JSON.stringify({todos : latestTodos}));
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) return;
    let db = JSON.parse(localStorage.getItem('todo-app'));
    setTodos(db.todos);
  }, [])

  return (
    <>
      <Header todos={todos} />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos} />
      <TodoList todoInput={todoInput} handleEditTodo={handleEditTodo} selectedTab={selectedTab} handleDeleteButton={handleDeleteButton} handleCompleteTodo={handleCompleteTodo} todos={todos} />
      <TodoInput todoInput={todoInput} setTodoInput={setTodoInput} handleAddTodo={handleAddTodo} />
    </>
  )
}

export default App
