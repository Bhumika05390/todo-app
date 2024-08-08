import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onUpdate, onToggle }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem key={task.id} task={task} onUpdate={onUpdate} onToggle={onToggle} />
      ))}
    </div>
  );
};

export default TaskList;
