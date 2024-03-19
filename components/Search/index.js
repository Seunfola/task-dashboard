import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '../../src/store/tasksSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
    const [input, setInput] = useState('');
    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setInput(inputValue);
        dispatch(setSearchQuery(inputValue));
    };

    return (
        <div className="filter-container">
            <label className="filter-label" htmlFor="search-task">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </label>
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
