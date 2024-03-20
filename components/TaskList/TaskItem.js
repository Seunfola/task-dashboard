import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { updateDoc, doc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase'; // Import firestore instance

const TaskItem = ({ task, sound }) => {
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

    const saveEdit = async () => {
        try {
            const taskRef = doc(firestore, 'tasks', task.id);
            await updateDoc(taskRef, editedTask);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <div className='task-envelope'>
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
                    <input
                        className="edit-time"
                        type="time"
                        name="dueTime"
                        value={editedTask.dueTime}
                        onChange={handleEditChange}
                    />
                    <label className="form-label">Sound</label>
                    <div className="edit-sound">
                        <FontAwesomeIcon icon={faVolumeUp} />
                    </div>
                    <button className="save-btn" onClick={saveEdit}>Save</button>
                    <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div className="task-display">
                    <h3 className="task-title">{task.title}</h3>
                    <div className='task-list-enevelope'>
                        <p className="task-description">Desc: {task.description}</p>
                        <p className="task-date">Due: {task.dueDate}</p>
                        <p className="task-time">Time: {task.dueTime}</p>
                        {task.status === 'pending' && <span className="pending-tag">Pending</span>}
                        {task.status === 'completed' && <span className="completed-tag">Completed</span>}
                        <p className="task-time">
                            <FontAwesomeIcon icon={faVolumeUp} />
                            {sound && <audio src={sound} controls />}
                            {countdown && <span className="task-countdown">Countdown: {countdown}</span>}
                        </p>
                    </div>
                    <div className="btn-group">
                        <button className="delete-btn" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="edit-btn" onClick={() => onDelete(task.id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;
