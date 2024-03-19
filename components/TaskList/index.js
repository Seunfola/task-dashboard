import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from './TaskItem';
import Pagination from '../Pagination';
import { editTask, setCurrentPage, deleteTask } from '../../src/store/tasksSlice'; // Import deleteTask action

const TaskList = ({ sound }) => { // Remove onDelete prop as it's not needed here
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
            setUpdatedTasks(updatedTasks);
        };
        updateTaskStatus();
    }, [tasks, sound]);

    const filteredTasks = tasks.filter(task => {
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

    const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));

    return (
        <div>
            {isEditingTask ? ( // Render TaskForm if editing, else render TaskItem
                <TaskForm onSave={handleSaveEdit} initialData={isEditingTask} />
            ) : (
                currentTasks.map(task => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onDelete={handleDelete} 
                        onEdit={() => setIsEditingTask(task)} 
                        sound={task.sound}
                    />
                ))
            )}
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
