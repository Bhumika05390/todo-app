import React, { useState } from 'react';
  /**
 * Component for displaying a list of tasks.
 * @param {Object} props - The properties for the component.
 * @param {Array} props.tasks - Array of task objects.
 * @param {Function} props.onUpdate - Function to handle updating tasks.
 * @param {Function} props.onToggle - Function to handle toggling task completion.
 * @returns {JSX.Element} - Rendered component.
 */
const TaskItem = ({ task, onUpdate, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleToggleExpand = () => setIsExpanded(!isExpanded);

  const handleEditClick = () => {
    if (isEditing) {
      onUpdate(task.id, { title, description });
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="task-item">
      <h3 onClick={handleToggleExpand}>
        {task.title} {task.completed ? '✔️' : '❌'}
      </h3>
      {isExpanded && (
        <div className="task-details">
          {isEditing ? (
            <div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
              />
              <button onClick={handleEditClick}>Save</button>
            </div>
          ) : (
            <div>
              <p>{task.description}</p>
              <p>Last updated: {new Date(task.timestamp).toLocaleString()}</p>
              <button onClick={() => onToggle(task.id)}>
                {task.completed ? 'Mark as Incomplete' : 'Mark as Done'}
              </button>
              <button onClick={handleEditClick}>Edit</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskItem;
