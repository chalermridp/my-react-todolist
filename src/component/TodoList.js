import TodoItem from './TodoItem'

const TodoList = ({ todoList, updateTodo, deleteTodo }) => {
    return (
        <div>
            <hr />
            {
                todoList.map((value, index) => {
                    return (
                        <TodoItem content={value} updateTodo={updateTodo} deleteTodo={deleteTodo} key={index} />
                    )
                })
            }
        </div>
    )
}

export default TodoList