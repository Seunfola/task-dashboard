import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSave, initialData }) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: ''
    });

    useEffect(() => {
        if (initialData) {
            setTask({ ...initialData });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(task);
        // Clear the form
        setTask({ title: '', description: '', dueDate: '' });
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label">Title</label>
                <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    placeholder="Description"
                    required
                    className="form-textarea"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Date</label>
                <input
                    type="date"
                    name="dueDate"
                    value={task.dueDate}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
            </div>
            <button type="submit">Save Task</button>
        </form>
    );
};

export default TaskForm;
