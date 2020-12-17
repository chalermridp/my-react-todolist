import { useState } from 'react'

const InsertBox = ({ createTodo }) => {
    const [text, setText] = useState("")
    return (
        <div className="input-group">
            <input
                type="text"
                className="form-control"
                onChange={(e) => {
                    setText(e.target.value)
                }}
            >
            </input>
            <button
                className="btn btn-primary"
                onClick={() => {
                    createTodo(text)
                }}
            >
                Add
        </button>
        </div>
    )
}

export default InsertBox