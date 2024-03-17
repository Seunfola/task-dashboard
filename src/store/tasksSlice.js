import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [], // Initialize tasks array to store loaded tasks
        filter: 'all',
        searchQuery: '',
        currentPage: 1,
        tasksPerPage: 3,
        authError: null,
        loading: false, // Add loading state to track async operation
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Update local storage
        },
        editTask: (state, action) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
                localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Update local storage
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks)); // Update local storage
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
        loginError: (state) => {
            state.authError = 'Login failed';
        },
        signupError: (state) => {
            state.authError = 'Signup failed';
        },
        loadUserTasks: (state) => {
            const storedTasks = JSON.parse(localStorage.getItem('tasks'));
            if (storedTasks) {
                state.tasks = storedTasks;
            }
        },
    },
});

export const {
    addTask, editTask, deleteTask,
    setFilter, setSearchQuery, setCurrentPage,
    loginError, signupError, loadUserTasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
