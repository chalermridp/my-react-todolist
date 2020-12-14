import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import axios from 'axios';


function InsertBox({ saveTodo }) {
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
          saveTodo(text)
        }}
      >
        Add
      </button>
    </div>
  )
}

function ToDoList({ todoList, deleteTodo }) {
  return (
    <div>
      <hr />
      {
        todoList.map((value) => {
          return (
            <ToDoItem content={value} deleteTodo={deleteTodo} key={value.id} />
          )
        })
      }
    </div>
  )
}

function ToDoItem({ content, deleteTodo }) {
  return (
    <div className="form-group">
      <span>{content.text}</span>
      <button className="btn btn-sm btn-danger" onClick={() => {
        deleteTodo(content.id)
      }}>x</button>
    </div>
  )
}

function App() {
  const [todoList, setTodoList] = useState([])

  useEffect(() => {
    async function fetchData() {
      const todo = await getTodoListFromApi()
      setTodoList(todo)
    }
    fetchData()
  }, [])

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/todo-list/${id}`)
      setTodoList(todoList.filter(i => i.id !== id))
    }
    catch (e) {
      console.log("cannot delete", e)
      alert("cannot delete")
    }
  }

  const saveTodo = async (text) => {
    const newData = { id: Date.now(), text: text, is_done: false }
    try {
      await axios.post('http://localhost:3001/todo-list', newData)
      setTodoList([...todoList, newData])
    }
    catch (e) {
      console.log("cannot save", e)
      alert("cannot save")
    }
  }
  return (
    <Container>
      <InsertBox todoList={todoList} saveTodo={saveTodo} />
      <ToDoList todoList={todoList} deleteTodo={deleteTodo} />
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
