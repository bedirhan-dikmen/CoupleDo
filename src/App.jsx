import { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [mode, setMode] = useState('personal'); 
  const [date, setDate] = useState(new Date());
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('planbudur_vFinal');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('planbudur_vFinal', JSON.stringify(todos));
  }, [todos]);

  const changeMonth = (offset) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + offset);
    setCurrentMonth(newMonth);
  };

  const addAction = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false, type: mode, date: date.toDateString() }]);
  };

  const deleteAction = (id) => setTodos(todos.filter(t => t.id !== id));
  const toggleAction = (id) => setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const updateAction = (id, newText) => setTodos(todos.map(t => t.id === id ? { ...t, text: newText } : t));

  const filteredData = todos.filter(t => t.type === mode && t.date === date.toDateString());

  const renderCalendar = () => {
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    const startDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
    const calendarGrid = [];

    for (let i = 0; i < startDay; i++) {
      calendarGrid.push(<div key={`empty-${i}`} className="cal-tile empty"></div>);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const tileDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
      const isActive = tileDate.toDateString() === date.toDateString();
      const taskCount = todos.filter(t => t.type === mode && t.date === tileDate.toDateString()).length;

      calendarGrid.push(
        <div key={`day-${d}`} className={`cal-tile ${isActive ? 'active' : ''}`} onClick={() => setDate(tileDate)}>
          <span className="day-num">{d}</span>
          {taskCount > 0 && <span className="day-count">{taskCount}</span>}
        </div>
      );
    }
    return calendarGrid;
  };

  return (
    <div className={`app-wrapper ${mode}`}>
      <div className="glass-container">
        <aside className="sidebar">
          <div className="logo-area">
            <h2 className="brand">CoupleDo</h2>
            <p className="tagline">Geleceği Birlikte Planla</p>
          </div>

          <div className="calendar-card">
            <header className="cal-header">
              <button onClick={() => changeMonth(-1)} className="cal-nav-btn">‹</button>
              <span>{currentMonth.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}</span>
              <button onClick={() => changeMonth(1)} className="cal-nav-btn">›</button>
            </header>
            <div className="calendar-grid">
              {['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'].map(day => (
                <div key={day} className="day-header">{day}</div>
              ))}
              {renderCalendar()}
            </div>
          </div>

          <nav className="mode-nav">
            <button className={`mode-nav-btn ${mode === 'personal' ? 'active' : ''}`} onClick={() => setMode('personal')}>👤 Kişisel Alanım</button>
            <button className={`mode-nav-btn ${mode === 'couple' ? 'active' : ''}`} onClick={() => setMode('couple')}>❤️ Bizim Alanımız</button>
          </nav>
        </aside>

        <main className="main-content">
          <header className="content-header">
            <h1>{date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</h1>
            <p className="subtitle">{mode === 'couple' ? '🚀 Bizim Alanımız' : '🎯 Kişisel Hedefler'}</p>
          </header>

          <div className="todo-container">
            <TodoInput onAdd={addAction} mode={mode} />
            <TodoList todos={filteredData} onToggle={toggleAction} onDelete={deleteAction} onUpdate={updateAction} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;