import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, toggleTask, removeTask }) {
  return (
    <ul className="list-group">
      {tasks.map(task => (
        <li
          key={task._id}
          className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'bg-success bg-opacity-25' : ''}`}
        >
          <span
            style={{
              textDecoration: task.completed ? 'line-through' : 'none',
              cursor: 'pointer',
              flex: 1
            }}
            onClick={() => toggleTask(task._id)}
          >
            {task.text}
          </span>
          <button className="btn btn-sm btn-danger ms-2" onClick={() => removeTask(task._id)}>Excluir</button>
        </li>
      ))}
    </ul>

  );
}

export default TaskList;
