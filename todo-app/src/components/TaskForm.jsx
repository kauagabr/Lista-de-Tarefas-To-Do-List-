import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Nova tarefa..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">Adicionar</button>
    </form>
  );
}

export default TaskForm;
