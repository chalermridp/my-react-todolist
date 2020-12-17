import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { getTodoListAsyncThunk, createTodoAsyncThunk, deleteTodoAsyncThunk, updateTodoAsyncThunk } from './store/todoListStore'
import { useDispatch, useSelector } from 'react-redux'
import InsertBox from './component/InsertBox'
import TodoList from './component/TodoList'

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
      <InsertBox createTodo={createTodo} />
      <TodoList todoList={todoList} updateTodo={updateTodo} deleteTodo={deleteTodo} />
    </Container>
  );
}

export default App;
