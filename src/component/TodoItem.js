
const TodoItem = ({ content, updateTodo, deleteTodo }) => {
    return (
        <div className="form-group">
            <span data-is-done={content.is_done}>{content.text}</span>
        &nbsp;
            <button className="btn btn-sm btn-success" onClick={() => {
                updateTodo({ id: content.id, text: content.text, is_done: true })
            }} disabled={content.is_done}>mark as done</button>
        &nbsp;
            <button className="btn btn-sm btn-danger" onClick={() => {
                deleteTodo(content.id)
            }}>x</button>
        </div>
    )
}

export default TodoItem