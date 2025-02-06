import React from 'react'
import TodooCard from './TodooCard'

export default function TodoList(props) {
    const {todos, handleDeleteTodos, handleEditTodos} = props
    return (
        <ul className='main'>
            {todos.map((todo, todoIndex) => {
                return (
                    <TodooCard key={todoIndex} todoIndex = {todoIndex} handleDeleteTodos={handleDeleteTodos} handleEditTodos={handleEditTodos}>
                        <p>{todo}</p>
                    </TodooCard>
                )
            })}
        </ul>
    )
}
