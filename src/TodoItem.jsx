import { useState } from 'react';

function TodoItem({ task, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  function handleSave() {
    if (editValue.trim() === '') return;
    onEdit(task.id, editValue.trim());
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditValue(task.title);
      setIsEditing(false);
    }
  }

  return (
    <li className="todo-item">
      {isEditing ? (
        <>
          <input
            className="edit-input"
            value={editValue}
            onChange={e => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button className="btn-save" onClick={handleSave}>✓</button>
          <button className="btn-cancel" onClick={() => { setEditValue(task.title); setIsEditing(false); }}>✕</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <button className="btn-edit" onClick={() => setIsEditing(true)}>✏️</button>
          <button className="btn-delete" onClick={() => onDelete(task.id)}>✕</button>
        </>
      )}
    </li>
  );
}

export default TodoItem;
