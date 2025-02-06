import { TodoCard } from "./TodoCard";

export function TodoList(props) {
    const { todoInput, setTodoInput, handleEditTodo, selectedTab, handleDeleteButton, handleCompleteTodo, todos } = props

    const filteredTodos = selectedTab === 'All' ? todos : selectedTab === 'Open' ? todos.filter(value => !value.complete) : todos.filter(value => value.complete);
    return (
        <>
            {
                filteredTodos.map((todo, todoIndex) => {
                    let myIndex;
                    // myIndex = todos.findIndex(val => val.input === todo.input)
                    for (let i = 0; i < todos.length; i ++) {
                        if (todos[i] === todo) {
                            myIndex = i;
                            break;
                        } 
                    }
                    return (
                        <TodoCard key={todoIndex} todoIndex={myIndex} todoInput={todoInput} handleEditTodo={handleEditTodo} handleCompleteTodo={handleCompleteTodo} handleDeleteButton={handleDeleteButton} todo={todo} />
                    )
                    })
            }
        </>
    )
}