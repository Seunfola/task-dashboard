import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        filter: 'all',
        searchQuery: '',
        currentPage: 1,
        tasksPerPage: 3,
        authError: null,
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        editTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        // Assuming these are placeholder actions for handling authentication errors
        loginError: (state) => {
            state.authError = 'Login failed';
        },
        signupError: (state) => {
            state.authError = 'Signup failed';
        },
    },
});

export const {
    addTask, editTask, deleteTask,
    setFilter, setSearchQuery, setCurrentPage,
    loginError, signupError
} = tasksSlice.actions;

export default tasksSlice.reducer;
