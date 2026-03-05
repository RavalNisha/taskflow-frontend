import { useState, useEffect } from 'react';
import { taskAPI } from '../api/taskApi';
import StatsBar from '../components/StatsBar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [filter, setFilter] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await taskAPI.getAll();
      setTasks(res.data);
    } catch (err) {
      setError('Cannot connect to backend. Is Spring Boot running?');
    }
  };

  const fetchStats = async () => {
    try {
      const res = await taskAPI.getStats();
      setStats(res.data);
    } catch (err) {}
  };

  const addTask = async (taskData) => {
    setLoading(true);
    try {
      const res = await taskAPI.create(taskData);
      setTasks(prev => [res.data, ...prev]);
      fetchStats();
    } catch (err) {
      setError('Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskAPI.delete(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      fetchStats();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const updateStatus = async (id, status) => {
    const task = tasks.find(t => t.id === id);
    try {
      await taskAPI.update(id, { ...task, status });
      setTasks(prev => prev.map(t => t.id === id ? { ...t, status } : t));
      fetchStats();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const filtered = filter === 'ALL' ? tasks : tasks.filter(t => t.status === filter);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#6366f1' }}>TaskFlow</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Task Management Dashboard</p>
        </div>
        <div style={{ fontSize: '14px', color: '#64748b' }}>{tasks.length} total tasks</div>
      </div>

      {error && (
        <div style={{ background: '#ef444422', border: '1px solid #ef4444', borderRadius: '8px',
          padding: '12px 16px', marginBottom: '16px', color: '#ef4444' }}>
          ⚠️ {error}
        </div>
      )}

      <StatsBar stats={stats} />
      <TaskForm onAdd={addTask} loading={loading} />

      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        {['ALL', 'TODO', 'IN_PROGRESS', 'DONE'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '6px 14px', borderRadius: '20px', border: 'none',
            cursor: 'pointer', fontSize: '13px', fontWeight: '500',
            background: filter === f ? '#6366f1' : '#1e293b',
            color: filter === f ? 'white' : '#94a3b8'
          }}>
            {f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#475569' }}>
          No tasks yet. Create one above! 🚀
        </div>
      ) : (
        filtered.map(task => (
          <TaskCard key={task.id} task={task}
            onDelete={deleteTask} onStatusChange={updateStatus} />
        ))
      )}
    </div>
  );
}