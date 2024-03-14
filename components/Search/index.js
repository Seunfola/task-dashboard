import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../src/store/tasksSlice';

const Search = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        setInput(e.target.value);
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <div className="filter-container">
            <label className="filter-label" htmlFor="search-task">Search Tasks</label>
            <input
                type="text"
                className="filter-select"
                placeholder="Search tasks"
                value={input}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default Search;
