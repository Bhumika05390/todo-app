import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import './App.css';
const App = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetch('/data/tasks.json')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const handleAddTask = (task) => {
    const newTask = {
      id: tasks.length + 1,
      ...task,
      completed: false,
      timestamp: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
    setEditingTask(null);
  };

  const handleUpdateTask = (id, updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, ...updatedTask, timestamp: new Date().toISOString() } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed, timestamp: new Date().toISOString() } : task
    );
    setTasks(updatedTasks);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Todo List</h1>
      <SearchBar query={searchQuery} onSearch={handleSearch} />
      <TaskForm onSubmit={editingTask ? handleUpdateTask : handleAddTask} existingTask={editingTask} />
      <TaskList tasks={filteredTasks} onUpdate={setEditingTask} onToggle={handleToggleTask} />
    </div>
  );
};

export default App;
