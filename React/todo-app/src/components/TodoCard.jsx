export function TodoCard(props) {
    const { todoIndex, todoInput, handleEditTodo, handleCompleteTodo, handleDeleteButton, todo } = props
    return (
        <div className="card todo-item">
            <p>{todo.input}</p>
            <div className="todo-buttons">
                <button disabled={todo.complete} onClick={() => {
                    handleCompleteTodo(todoIndex)
                }}>
                    <h6>Done</h6>
                </button>
                <button onClick={() => {
                    handleEditTodo(todoIndex, todoInput);
                }}>
                    <h6>Edit</h6>
                </button>
                <button onClick={() => {
                    handleDeleteButton(todoIndex)
                }}>
                    <h6>Delete</h6>
                </button>
            </div>
        </div>
    )
}