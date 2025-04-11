const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, '..', 'tasks.json');

// Helper: lê e salva
const readTasks = () => JSON.parse(fs.readFileSync(filePath));
const saveTasks = (tasks) => fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));

// GET todas as tarefas
router.get('/', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// POST nova tarefa
router.post('/', (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: Date.now().toString(),
    text: req.body.text,
    completed: false,
  };
  tasks.unshift(newTask);
  saveTasks(tasks);
  res.json(newTask);
});

// PUT (toggle)
router.put('/:id', (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index !== -1) {
    tasks[index].completed = req.body.completed;
    saveTasks(tasks);
    res.json(tasks[index]);
  } else {
    res.status(404).json({ message: 'Tarefa não encontrada' });
  }
});

// DELETE
router.delete('/:id', (req, res) => {
  let tasks = readTasks();
  tasks = tasks.filter(t => t.id !== req.params.id);
  saveTasks(tasks);
  res.json({ message: 'Tarefa removida' });
});

module.exports = router;
