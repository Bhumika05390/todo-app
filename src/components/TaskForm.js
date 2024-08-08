import React, { useState } from 'react';

const TaskForm = ({ onSubmit, existingTask }) => {
  const [title, setTitle] = useState(existingTask ? existingTask.title : '');
  const [description, setDescription] = useState(existingTask ? existingTask.description : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <form  className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Task Description"
        required
      />
      <button type="submit">Save Task</button>
    </form>
  );
};

export default TaskForm;
