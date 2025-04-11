import React from 'react';

function TaskItem({ task, toggleTask, removeTask }) {
  const completedStyle = {
    backgroundColor: 'rgba(25, 135, 84, 0.2)', // Verde Bootstrap com opacidade
  };

  return (
    <li
      className="list-group-item d-flex justify-content-between align-items-center"
      style={task.completed ? completedStyle : {}}
    >
      <span
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          cursor: 'pointer',
        }}
        onClick={() => toggleTask(task.id)}
      >
        {task.text}
      </span>
      <button className="btn btn-sm btn-danger" onClick={() => removeTask(task.id)}>
        Remover
      </button>
    </li>
  );
}

export default TaskItem;
