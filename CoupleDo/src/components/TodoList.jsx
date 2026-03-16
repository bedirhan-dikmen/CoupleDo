import { useState } from 'react';

export default function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Düzenleme modunu açar
  const handleEditStart = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // Düzenlemeyi kaydeder
  const handleEditSave = (id) => {
    if (editText.trim() === "") return;
    onUpdate(id, editText);
    setEditingId(null);
    setEditText("");
  };

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          
          <div className="left-side">
            <div 
              className={`custom-check ${todo.completed ? 'checked' : ''}`} 
              onClick={() => onToggle(todo.id)}
            >
              {todo.completed && <span className="check-icon">✓</span>}
            </div>

            {/* DÜZENLEME MODU KONTROLÜ */}
            {editingId === todo.id ? (
              <input 
                className="modern-input"
                style={{ background: '#f8fafc', padding: '5px 10px', borderRadius: '8px', border: '1px solid #ddd' }}
                value={editText} 
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => handleEditSave(todo.id)} // Dışarı tıklayınca kaydet
                onKeyDown={(e) => e.key === 'Enter' && handleEditSave(todo.id)} // Enter ile kaydet
                autoFocus
              />
            ) : (
              <span className="todo-text">{todo.text}</span>
            )}
          </div>

          <div className="action-buttons">
            {editingId === todo.id ? (
              <button className="btn-action btn-save" onClick={() => handleEditSave(todo.id)}>
                💾
              </button>
            ) : (
              <button className="btn-action btn-edit" onClick={() => handleEditStart(todo)}>
                ✏️
              </button>
            )}
            <button className="btn-action btn-delete" onClick={() => onDelete(todo.id)}>
              🗑️
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}