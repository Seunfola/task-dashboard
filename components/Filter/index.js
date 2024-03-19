import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../../src/store/tasksSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

const Filter = () => {
    const dispatch = useDispatch();
    const [selectedFilter, setSelectedFilter] = useState('all');

    const handleFilterChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedFilter(selectedValue);
        dispatch(setFilter(selectedValue));
    };

    return (
        <div className="filter-container">
            <label className="filter-label" htmlFor="task-filter">
                <FontAwesomeIcon icon={faFilter} className="filter-icon" />
            </label>
            <select
                className="filter-select"
                id="task-filter"
                value={selectedFilter}
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
