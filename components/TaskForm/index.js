import React, { useState, useEffect } from 'react';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TaskForm = ({ onSave }) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        dueTime: '',
        sound: '',
    });

    const [selectedSound, setSelectedSound] = useState('');
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        setTask({
            title: '',
            description: '',
            dueDate: '',
            dueTime: '',
            sound: '',
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(task);
        setTask({
            title: '',
            description: '',
            dueDate: '',
            dueTime: '',
            sound: '',
        });

        if (audio) {
            audio.play();
        }
    };

    const handleSoundChange = (e) => {
        const file = e.target.files[0];
        setSelectedSound(file);
    };

    const previewSound = () => {
        if (selectedSound) {
            const reader = new FileReader();
            reader.onload = () => {
                const newAudio = new Audio(reader.result);
                setAudio(newAudio);
                newAudio.play();
                setTimeout(() => {
                    newAudio.pause();
                    newAudio.currentTime = 0;
                }, 15000);
            };
            reader.readAsDataURL(selectedSound);
        }
    };


    useEffect(() => {
        previewSound();
    }, [selectedSound]);

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
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label className="form-label">Time</label>
                <input
                    type="time"
                    name="dueTime"
                    value={task.dueTime}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label htmlFor="soundInput" className="form-label">Alarm</label>
                <input
                    id="soundInput"
                    onChange={handleSoundChange}
                    required
                    className="form-input"
                    type="file"
                    accept="audio/*"
                    controls 
                />
                <div className='taskforms-btn'>
                <button className='alarm' type="button" onClick={previewSound} disabled={!selectedSound}>play <FontAwesomeIcon icon={faPlayCircle} /></button>
                    <button type="submit" className='alarm'>Save </button>
                </div>
            </div>
            
        </form>
    );
};

export default TaskForm;
