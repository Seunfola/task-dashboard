import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import taskReducer from './tasksSlice';



const rootReducer = combineReducers({
    tasks: taskReducer,

});


const store = configureStore({
    reducer: rootReducer,
})
export default store