export function Header(props) {
    const { todos } = props;
    const openTasks = todos.filter((value) => {
        return !value.complete;
    }).length;
    return (
        <header>
            <h1 className="text-gradient">You have { openTasks } open {openTasks != 1 ? "tasks" : "task"}.</h1>
        </header>
    )
}