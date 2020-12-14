import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
    name: 'todoList',
    initialState: [],
    reducers: {
        createTodo: {
            reducer: (state, action) => {
                state.push(action.payload)
            }
        },
        deleteTodo: {
            reducer: (state, action) => {
                const index = state.map(x => x.id).indexOf(action.payload)
                state.splice(index, 1)
            }
        },
        markAsDone: {
            reducer: (state, action) => {
                state.forEach(todo => {
                    if (todo.id === action.payload) {
                        todo.is_done = true
                    }
                })
            }
        }
    }
})

export default slice