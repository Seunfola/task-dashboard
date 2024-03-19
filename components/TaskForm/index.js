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
        // Reset form when initialData changes
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
        setSelectedSound(e.target.value);
    };

    const previewSound = () => {
        if (selectedSound) {
            const newAudio = new Audio(selectedSound);
            setAudio(newAudio);
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
                <label className="form-label">Sound</label>
                <select value={selectedSound} onChange={handleSoundChange} required className="form-input">
                    <option value="">Select a Sound</option>
                    <option value="/public/sound/sound1.mp3">Sound 1</option>
                    <option value="/public/sound/sound2.mp3">Sound 2</option>
                    <option value="/public/sound/sound3.mp3">Sound 3</option>
                    <option value="/public/sound/sound4.mp3">Sound 4</option>
                </select>
                <button className='alarm' type="button" onClick={previewSound} disabled={!selectedSound}><FontAwesomeIcon icon={faPlayCircle} /></button>
            </div>
            <button type="submit">Save </button>
        </form>
    );
};

export default TaskForm;
