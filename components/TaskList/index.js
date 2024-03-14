import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskItem from './TaskItem';
import Pagination from '../Pagination';
import { editTask, setCurrentPage } from '../../src/store/tasksSlice';

const TaskList = ({ onDelete }) => {
    const { tasks, filter, searchQuery, currentPage, tasksPerPage } = useSelector(state => state.tasks);
    const dispatch = useDispatch();

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
