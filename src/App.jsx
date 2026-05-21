import { useState, useEffect } from 'react';
import TodoList from './TodoList';

const API_URL = 'http://localhost:3000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Завантажити задачі при старті
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  // Додати задачу
  function addTask() {
    if (input.trim() === '') return;
    fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: input }),
    })
      .then(res => res.json())
      .then(newTask => {
        setTasks(prev => [...prev, newTask]);
        setInput('');
      });
  }

  // Видалити задачу
  function deleteTask(id) {
    fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' }).then(() => {
      setTasks(prev => prev.filter(t => t.id !== id));
    });
  }

  // Редагувати задачу
  function editTask(id, newTitle) {
    fetch(`${API_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle }),
    })
      .then(res => res.json())
      .then(updated => {
        setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
      });
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') addTask();
  }

  return (
    <div className="app">
      <h1>📝 Список задач</h1>
      <div className="input-row">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Нова задача..."
        />
        <button onClick={addTask}>Додати</button>
      </div>
      <TodoList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
    </div>
  );
}

export default App;
