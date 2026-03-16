import { useState } from 'react';

export default function TodoInput({ onAdd, mode }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-input-wrapper">
      <input
        className="modern-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={mode === 'couple' ? 'Ortak bir hayal yaz...' : 'Kişisel bir görev ekle...'}
      />
      <button type="submit" className="btn-add-prem">Ekle</button>
    </form>
  );
}