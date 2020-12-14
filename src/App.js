import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import slice from './store/todoListStore'
import { useSelector } from 'react-redux'

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

function ToDoList({ todoList, markAsDone, deleteTodo }) {
  return (
    <div>
      <hr />
      {
        todoList.map((value) => {
          return (
            <ToDoItem content={value} markAsDone={markAsDone} deleteTodo={deleteTodo} key={value.id} />
          )
        })
      }
    </div>
  )
}

function ToDoItem({ content, markAsDone, deleteTodo }) {
  return (
    <div className="form-group">
      <span data-is-done={content.is_done}>{content.text}</span>
      &nbsp;
      <button className="btn btn-sm btn-success" onClick={() => {
        markAsDone(content.id)
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
    async function fetchData() {
      const todoListFromApi = await getTodoListFromApi()
      todoListFromApi.forEach(todo => dispatch(slice.actions.createTodo(todo)))
    }
    fetchData()
  }, [])

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todo-list/${id}`)
      dispatch(slice.actions.deleteTodo(id))
    }
    catch (e) {
      console.log("cannot delete", e)
      alert("cannot delete")
    }
  }

  const markAsDone = async (id) => {
    try {
      await axios.patch(`http://localhost:3001/todo-list/${id}`, { is_done: true })
      dispatch(slice.actions.markAsDone(id))
    }
    catch (e) {
      console.log("cannot delete", e)
      alert("cannot delete")
    }
  }

  const createTodo = async (text) => {
    const newData = { id: Date.now(), text: text, is_done: false }
    try {
      await axios.post('http://localhost:3001/todo-list', newData)
      dispatch(slice.actions.createTodo(newData))
    }
    catch (e) {
      console.log("cannot save", e)
      alert("cannot save")
    }
  }
  return (
    <Container>
      <InsertBox todoList={todoList} createTodo={createTodo} />
      <ToDoList todoList={todoList} markAsDone={markAsDone} deleteTodo={deleteTodo} />
    </Container>
  );
}

async function getTodoListFromApi() {
  try {
    const response = await axios.get('http://localhost:3001/todo-list')
    return response.data;
  }
  catch (e) {
    console.log("cannot get", e)
    alert("cannot get")
    return [];
  }
};

export default App;
