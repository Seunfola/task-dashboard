import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../src/store/tasksSlice';

const Filter = () => {
    const dispatch = useDispatch();

    const handleFilterChange = (e) => {
        dispatch(setFilter(e.target.value));
    };

    return (
        <div className="filter-container">
            <label className="filter-label" htmlFor="task-filter">
                Filter Tasks
            </label>
            <select
                className="filter-select"
                id="task-filter"
                onChange={handleFilterChange}
            >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
            </select>
        </div>
    );
};

export default Filter;
