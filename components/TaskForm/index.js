import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

const TaskForm = ({ onSave, initialData }) => {
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        dueTime: '',
        sound:'',
    });

    const [selectedSound, setSelectedSound] = useState(''); 
    const [audio, setAudio] = useState(null);

    useEffect(() => {
        if (initialData) {
            setTask({ ...initialData });
        }
    }, [initialData]);


    const handleSoundChange = (e) => {
        setSelectedSound(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'dueDate') {
            const currentDate = new Date().toISOString().split('T')[0]; 
            if (value < currentDate) {
                
                setTask({ ...task, [name]: currentDate });
            } else {
                setTask({ ...task, [name]: value });
            }
        } else {
            setTask({ ...task, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(task);
        setTask({ title: '', description: '', dueDate: '', dueTime: '', sound:'' });

        if (audio) {
            audio.play();
        }
    };

    const previewSound = () => {
        if (selectedSound) {
            const soundUrl = `/public/sound/${selectedSound}`;
            const newAudio = new Audio(soundUrl);
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
                <label className="form-label"><FontAwesomeIcon icon={faVolumeUp} /></label>
                <select value={selectedSound} onChange={handleSoundChange}>
                    <option value="sound">Select a Sound</option>
                    <option value="/public/sound/sound1.mp3">Sound 1</option>
                    <option value="/public/sound/sound2.mp3">Sound 1</option>
                    <option value="/public/sound/sound2.mp3">Sound 2</option>
                    
                </select>
                <button onClick={previewSound}><FontAwesomeIcon icon={faVolumeUp} /></button>
            </div>
            <button type="submit">Save Task</button>
        </form>
    );
};

export default TaskForm;
