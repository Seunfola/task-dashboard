import React, { useState } from 'react';

const TaskItem = ({ task, onDelete, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });

    const handleEditChange = (e) => {
        setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    };

    const saveEdit = () => {
        onSave(editedTask);
        setIsEditing(false);
    };

    return (
        <div className="task-item">
            {isEditing ? (
                <div className="task-edit-form">
                    <label className="form-label">Title</label>
                    <input
                        className="edit-title"
                        type="text"
                        name="title"
                        value={editedTask.title}
                        onChange={handleEditChange}
                    />
                    <label className="form-label">Description</label>
                    <textarea
                        className="edit-description"
                        name="description"
                        value={editedTask.description}
                        onChange={handleEditChange}
                    />
                    <label className="form-label">Date</label>
                    <input
                        className="edit-dueDate"
                        type="date"
                        name="dueDate"
                        value={editedTask.dueDate}
                        onChange={handleEditChange}
                    />
                    <button className="save-btn" onClick={saveEdit}>Save</button>
                    <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div className="task-display">
                    <h3 className="task-title">{task.title}</h3>
                    <p className="task-description">{task.description}</p>
                    <p className="task-dueDate">Due: {task.dueDate}</p>
                    <div className='btn-group'>
                            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                            <button className="delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
