import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from './TaskItem';
import Pagination from '../Pagination';
import { editTask, setCurrentPage, deleteTask } from '../../src/store/tasksSlice';
import TaskForm from "./../TaskForm/index";

const TaskList = ({ sound }) => {
    const { tasks, filter, searchQuery, currentPage, tasksPerPage } = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const [updatedTasks, setUpdatedTasks] = useState([]); 
    const [isEditingTask, setIsEditingTask] = useState(null);

    useEffect(() => {
        // Update task status and play sound when due date is passed
        const updateTaskStatus = () => {
            const currentDate = new Date();
            const updatedTasks = tasks.map(task => {
                const dueDate = new Date(task.dueDate);
                if (dueDate <= currentDate) {
                    if (task.status !== 'completed') {
                        const alarmSound = new Audio(sound); // Use the selected sound
                        alarmSound.play();
                    }
                    return { ...task, status: 'completed' };
                } else {
                    return { ...task, status: 'pending' };
                }
            });
            dispatch(editTask(updatedTasks)); // Update tasks in Redux store
            setUpdatedTasks(updatedTasks); // Update local state
        };
        updateTaskStatus();
    }, [tasks, sound, dispatch]);

    const filteredTasks = updatedTasks.filter(task => { // Use updatedTasks instead of tasks
        const matchesFilter = filter === 'all' || task.status === filter;
        const matchesSearch = !searchQuery || task.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

    const handleSaveEdit = (editedTask) => {
        dispatch(editTask(editedTask));
        setIsEditingTask(null); 
    };

    const handleDelete = (taskId) => {
        dispatch(deleteTask(taskId)); // Dispatch deleteTask action with taskId
    };

    const toggleStatus = () => {
        const newFilter = filter === 'completed' ? 'pending' : 'completed';
        dispatch(setFilter(newFilter));
    };

    const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));

    return (
        <div>
            
            {currentTasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onDelete={handleDelete} 
                    onSave={handleSaveEdit}
                    onEdit={() => setIsEditingTask(task)} 
                    sound={task.sound}
                />
            ))}
                <button onClick={toggleStatus}>
                Toggle {filter === 'completed' ? 'Pending' : 'Completed'}
            </button>
            <Pagination
                totalTasks={filteredTasks.length}
                tasksPerPage={tasksPerPage}
                currentPage={currentPage}
                paginate={paginate}
            />
        </div>
    );
};

export default TaskList;
