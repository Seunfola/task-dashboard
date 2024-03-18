import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from './TaskItem';
import Pagination from '../Pagination';
import { editTask, setCurrentPage } from '../../src/store/tasksSlice';

const TaskList = ({ onDelete, sound }) => {
    const { tasks, filter, searchQuery, currentPage, tasksPerPage } = useSelector(state => state.tasks);
    const dispatch = useDispatch();
    const [updatedTasks, setUpdatedTasks] = useState([]); // Import and use useState

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
    };

    const paginate = (pageNumber) => dispatch(setCurrentPage(pageNumber));

    return (
        <div>
            {currentTasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onSave={handleSaveEdit}
                    onDelete={onDelete}
                    sound={task.sound}
                />
            ))}
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
