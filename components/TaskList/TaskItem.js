import React, { useState, useEffect } from 'react';

const TaskItem = ({ task, onDelete,sound, onSave }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });
    const [countdown, setCountdown] = useState(null);

    useEffect(() => {
        const calculateCountdown = () => {
            if (task.status === 'pending') {
                const dueDate = new Date(task.dueDate);
                const currentTime = new Date();
                const timeDifference = dueDate - currentTime;
                
                if (timeDifference > 0) {
                    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                    setCountdown(`${days} days, ${hours} hours, ${minutes} minutes`);
                } else {
                    setCountdown('Past due');
                }
            } else {
                setCountdown(null);
            }
        };
        
        calculateCountdown();
    }, [task]);

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
                        className="edit-date"
                        type="date"
                        name="dueDate"
                        value={editedTask.dueDate}
                        onChange={handleEditChange}
                        min={new Date().toISOString().split('T')[0]}
                    />
                    <label className="form-label">TIme</label>
                    <input
                        className="edit-time"
                        type="time"
                        name="dueTime"
                        value={editedTask.dueTime}
                        onChange={handleEditChange}
                    />
                    <button className="save-btn" onClick={saveEdit}>Save</button>
                    <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div className="task-display">
                    <h3 className="task-title">title: {task.title}</h3>
                    <p className="task-description">Desc: {task.description}</p>
                    <p className="task-date">Due: {task.dueDate}</p>
                    <p className="task-time">Time: {task.dueTime}</p>
                     <p className="task-time">Alarm: {task.sound}</p>
                    {countdown && <p className="task-countdown">Countdown: {countdown}</p>}
                    {sound && <audio src={sound} controls />}
                    <div className="btn-group">
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
