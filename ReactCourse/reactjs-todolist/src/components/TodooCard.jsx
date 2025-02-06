import React from 'react'

export default function TodooCard(props) {
    const {children, todoIndex, handleDeleteTodos, handleEditTodos} = props
    return (
        <li className="todoItem" >
            {children}
            <div className='actionsContainer'>
                <i className="fa-solid fa-pen-to-square" style={{ cursor: "pointer" }} onClick={() => {
                    handleEditTodos(todoIndex);
                }}></i>
                <i className="fa-solid fa-trash" style={{ cursor: "pointer" }} onClick={() => {
                    handleDeleteTodos(todoIndex)
                }}></i>
            </div>
        </li>
    )
}
