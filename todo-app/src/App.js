import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import FilterButtons from './components/FilterButtons';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(API_URL);
        setTasks(res.data);
      } catch (err) {
        console.error('Erro ao buscar tarefas:', err.message);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (text) => {
    try {
      const res = await axios.post(API_URL, { text });
      setTasks([res.data, ...tasks]);
    } catch (err) {
      console.error('Erro ao adicionar tarefa:', err.message);
    }
  };

  const toggleTask = async (id) => {
    try {
      const task = tasks.find(t => t._id === id || t.id === id);
      const res = await axios.put(`${API_URL}/${id}`, {
        completed: !task.completed,
      });
      setTasks(tasks.map(t => (t._id === id || t.id === id ? res.data : t)));
    } catch (err) {
      console.error('Erro ao alternar tarefa:', err.message);
    }
  };

  const removeTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(t => t._id !== id && t.id !== id));
    } catch (err) {
      console.error('Erro ao remover tarefa:', err.message);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h1 className="text-center text-primary mb-4">📝 Lista de Tarefas</h1>
            <TaskForm addTask={addTask} />
            <FilterButtons filter={filter} setFilter={setFilter} />
            <TaskList tasks={filteredTasks} toggleTask={toggleTask} removeTask={removeTask} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
