import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos : [{id:1, text:"Namaste World"}]
}

export const todoSlice = createSlice({
    name : 'todo',
    initialState,
    reducers : {
        addTodo : (state, action) => {
            const todo = {
                id : nanoid(),
                text: action.payload
            }
            state.todos.push(todo)
        },
        removeTodo: (state, action) =>{
            state.todos = state.todos.filter((todo)=> todo.id !== action.payload)
        },
        // updateTodo: (state,action) =>{
        //     const {id, newText} = action.payload
        //     state.todos = state.todo.map((todo)=> todo.id !== id ?todo : {...todo, text:newText})
        // }
    }
})

export const {addTodo, removeTodo} = todoSlice.actions

export default todoSlice.reducer