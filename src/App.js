import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { getTodoListAsyncThunk, createTodoAsyncThunk, deleteTodoAsyncThunk, updateTodoAsyncThunk } from './store/todoListStore'
import { useDispatch, useSelector } from 'react-redux'

function InsertBox({ createTodo }) {
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

function ToDoList({ todoList, updateTodo, deleteTodo }) {
  return (
    <div>
      <hr />
      {
        todoList.map((value, i) => {
          return (
            <ToDoItem content={value} updateTodo={updateTodo} deleteTodo={deleteTodo} key={i} />
          )
        })
      }
    </div>
  )
}

function ToDoItem({ content, updateTodo, deleteTodo }) {
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

function App() {
  const dispatch = useDispatch()
  let todoList = useSelector(state => state.todoList)

  useEffect(() => {
    dispatch(getTodoListAsyncThunk())
  }, [])

  const deleteTodo = async (id) => {
    try {
      await dispatch(deleteTodoAsyncThunk(id))
    }
    catch (e) {
      console.log("cannot delete", e)
      alert("cannot delete")
    }
  }

  const updateTodo = async (data) => {
    try {
      await dispatch(updateTodoAsyncThunk(data))
    }
    catch (e) {
      console.log("cannot update", e)
      alert("cannot update")
    }
  }

  const createTodo = async (text) => {
    try {
      const newData = { id: Date.now(), text: text, is_done: false }
      await dispatch(createTodoAsyncThunk(newData))
    }
    catch (e) {
      console.log("cannot create", e)
      alert("cannot create")
    }
  }

  return (
    <Container>
      <InsertBox todoList={todoList} createTodo={createTodo} />
      <ToDoList todoList={todoList} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </Container>
  );
}

export default App;
