import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faClock } from '@fortawesome/free-solid-svg-icons';

const TaskItem = ({ task, sound, onDelete, onSave, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({ ...task });
    const [countdown, setCountdown] = useState(null);
    const [taskStatus, setTaskStatus] = useState(null);
    const [selectedSound, setSelectedSound] = useState(null);
    const [selectedSoundTitle, setSelectedSoundTitle] = useState('');

    useEffect(() => {
        const calculateCountdown = () => {
            const dueDate = new Date(task.dueDate);
            const currentTime = new Date();
            const timeDifference = dueDate - currentTime;

            if (timeDifference > 0) {
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                setCountdown(`${days} days, ${hours} hours, ${minutes} minutes`);
                setTaskStatus('Pending');
            } else {
                setCountdown('Past due');
                setTaskStatus('Completed');
            }
        };

        calculateCountdown();
    }, [task]);


    const handleEditChange = (e) => {
        setEditedTask({ ...editedTask, [e.target.name]: e.target.value });
    };

    const handleSoundChange = (e) => {
        const selectedFile = e.target.files[0];
        setSelectedSound(selectedFile);
        setSelectedSoundTitle(selectedFile.name);
    };

    const saveEdit = () => {
        onSave(editedTask);
        setIsEditing(false);
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
    
                    <div className="edit-sound">
                        <FontAwesomeIcon icon={faVolumeUp}
                         />
                        <input
                            className="edit-sound-input"
                            type="file"
                            accept="audio/mpeg, audio/mp3, audio/ogg, audio/wav, audio/aac, audio/x-aiff, audio/x-flac, audio/x-midi, audio/x-m4a, audio/x-ms-wma, audio/x-wav"
                            onChange={handleSoundChange}
                        />
                        {selectedSoundTitle && <audio controls src={URL.createObjectURL(selectedSound)} />}
                    </div>
                    <button className="save-btn" onClick={saveEdit}>Save</button>
                    <button className="cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div className="task-display">
                    <h3 className="task-title">{task.title}</h3>
                    <div className='task-list-enevelope'>
                        <p className="task-description">Note: {task.description}</p>
                        <p className="task-date">Due Date: {task.dueDate}</p>
                        <p className="task-time">Time: {task.dueTime}</p>
                        
                        <p className="task-sound">
                                sound <FontAwesomeIcon icon={faVolumeUp} />: {selectedSoundTitle}
                            
                            </p>
                            <p className="task-status">Status: {taskStatus}</p>
                            <p className="task-time">
                                <FontAwesomeIcon icon={faClock} /> {countdown}
                            </p>
                    </div>
                    <div className="btn-group">
                        <button className="delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskItem;

