import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const getTodoListAsyncThunk = createAsyncThunk(
    'getTodoListAsyncThunk',
    async () => {
        const response = await axios.get('http://localhost:3001/todo-list')
        return response.data;
    }
)

export const createTodoAsyncThunk = createAsyncThunk(
    'createTodoAsyncThunk',
    async (newData) => {
        const response = await axios.post('http://localhost:3001/todo-list', newData)
        return response.data
    }
)

export const deleteTodoAsyncThunk = createAsyncThunk(
    'deleteTodoAsyncThunk',
    async (id) => {
        await axios.delete(`http://localhost:3001/todo-list/${id}`)
        return id
    }
)

export const updateTodoAsyncThunk = createAsyncThunk(
    'updateTodoAsyncThunk',
    async (data) => {
        await axios.patch(`http://localhost:3001/todo-list/${data.id}`, data)
        return data
    }
)

const slice = createSlice({
    name: 'todoList',
    initialState: [],
    reducers: {

    },
    extraReducers: {
        [getTodoListAsyncThunk.fulfilled]: (state, action) => {
            return [...state, ...action.payload]
        },
        [createTodoAsyncThunk.fulfilled]: (state, action) => {
            return [...state, action.payload]
        },
        [deleteTodoAsyncThunk.fulfilled]: (state, action) => {
            const index = state.map(i => i.id).indexOf(action.payload)
            state.splice(index, 1)
        },
        [updateTodoAsyncThunk.fulfilled]: (state, action) => {
            const { id, text, is_done } = action.payload
            const existingTodo = state.find(i => i.id === id)
            if (existingTodo) {
                existingTodo.text = text
                existingTodo.is_done = is_done;
            }
        }
    }
})

export default slice