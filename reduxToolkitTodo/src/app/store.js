// step 1 : Configure store
import {configureStore} from '@reduxjs/toolkit'
// step 3 : import reducers
import todoReducer from '../features/todo/todoSlice'


// step 2 : export variable
export const store = configureStore({
    //step 5 : enter key value in the object
    reducer : todoReducer
});