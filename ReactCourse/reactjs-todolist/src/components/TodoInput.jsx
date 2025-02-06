import { useState } from "react"

export default function TodoInput(props){
    const {handleAddTodos, todoValue, setTodoValue, editingIndex} = props
    return (
        <header>
            <input value={todoValue} onChange={(e) => {
                setTodoValue(e.target.value)
            }} placeholder="Enter todo..." />
            <button onClick={() => {
                handleAddTodos(todoValue)
                setTodoValue("")
            }}>{editingIndex !== null ? 'Edit': 'Add'}</button>
        </header>
    )
}