import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { addTask, editTask, deleteTask } from '../../store/tasksSlice';
import TaskForm from '../../../components/TaskForm'; // Adjust the import based on your actual file structure
import TaskList from '../../../components/TaskList'; // Adjust the import based on your actual file structure
import TaskItem from '../../../components/TaskList/TaskItem'; // Adjust the import based on your actual file structure

const Dashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [initialLoad, setInitialLoad] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
    setInitialLoad(false); // Set initialLoad to false after the first load
  }, [initialLoad]);

  const handleAddEditTask = (task) => {
    const updatedTasks = task.id
      ? tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t))
      : [...tasks, { ...task, id: Date.now().toString(), status: 'pending' }];

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    if (task.id) {
      dispatch(editTask(task));
    } else {
      dispatch(addTask(task));
    }
    setEditingTask(null);
  };

  const handleEditInit = (task) => {
    setEditingTask(task);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((t) => t.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    dispatch(deleteTask(taskId));
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="task-form-container">
          <TaskForm onSave={handleAddEditTask} initialData={editingTask} />
        </div>
        <div className="task-list-container">
          <TaskList>
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={handleEditInit}
                onDelete={handleDeleteTask}
              />
            ))}
          </TaskList>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
