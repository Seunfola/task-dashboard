import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase'; // Import firebaseReducer from react-redux-firebase
import { firestoreReducer } from 'redux-firestore'; // Import firestoreReducer from redux-firestore
import taskReducer from './tasksSlice';
import { app } from './firebase'; 

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    tasks: taskReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: { app }, // Pass the initialized Firebase app to thunks
            },
        }),
});

export default store;
