import { useState } from 'react';

export default function TaskForm({ onAdd, loading }) {
  const [form, setForm] = useState({
    title: '', description: '', priority: 'MEDIUM', dueDate: ''
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = () => {
    if (!form.title.trim()) return alert('Title is required!');
    onAdd({ ...form, status: 'TODO' });
    setForm({ title: '', description: '', priority: 'MEDIUM', dueDate: '' });
  };

  const inputStyle = {
    background: '#0f172a', border: '1px solid #334155', color: '#e2e8f0',
    borderRadius: '8px', padding: '10px 14px', width: '100%', fontSize: '14px'
  };

  return (
    <div style={{ background: '#1e293b', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
      <h2 style={{ marginBottom: '16px', color: '#6366f1', fontSize: '18px' }}>+ New Task</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <input name="title" value={form.title} onChange={handle}
          placeholder="Task title *" style={inputStyle} />
        <input name="dueDate" type="date" value={form.dueDate} onChange={handle}
          style={inputStyle} />
        <textarea name="description" value={form.description} onChange={handle}
          placeholder="Description (optional)" rows={2}
          style={{ ...inputStyle, gridColumn: 'span 2', resize: 'vertical' }} />
        <select name="priority" value={form.priority} onChange={handle} style={inputStyle}>
          <option value="LOW">Low Priority</option>
          <option value="MEDIUM">Medium Priority</option>
          <option value="HIGH">High Priority</option>
        </select>
        <button onClick={submit} disabled={loading} style={{
          background: loading ? '#4338ca' : '#6366f1', color: 'white', border: 'none',
          borderRadius: '8px', padding: '10px', fontSize: '14px',
          fontWeight: '600', cursor: 'pointer'
        }}>
          {loading ? 'Adding...' : 'Add Task'}
        </button>
      </div>
    </div>
  );
}