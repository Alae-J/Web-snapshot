export function TodoInput(props) {
    const { todoInput, setTodoInput, handleAddTodo } = props
    return (
        <div className="input-container">
            <input value={todoInput} type="text" placeholder="Add or Edit Todo..." onChange={(e) => {
                setTodoInput(e.target.value)
                console.log(todoInput)
            }}/>
            <button value={todoInput} onClick={() => {
                if (!todoInput) return
                handleAddTodo(todoInput)
                setTodoInput('')
            }}>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}