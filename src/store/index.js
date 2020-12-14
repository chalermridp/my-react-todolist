import { configureStore } from '@reduxjs/toolkit'
import slice from './todoListStore'

export default configureStore({
    reducer: {
        todoList: slice.reducer
    }
})