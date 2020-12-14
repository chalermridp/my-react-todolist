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
                const index = state.map(i => i.id).indexOf(action.payload)
                state.splice(index, 1)
            }
        },
        markAsDone: {
            reducer: (state, action) => {
                const index = state.map(i => i.id).indexOf(action.payload)
                if (index !== -1) {
                    state[index].is_done = true
                }
            }
        }
    }
})

export default slice