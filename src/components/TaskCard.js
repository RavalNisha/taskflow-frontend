export default function TaskCard({ task, onDelete, onStatusChange }) {
  const statusColors = { TODO: '#6366f1', IN_PROGRESS: '#f59e0b', DONE: '#10b981' };
  const priorityColors = { LOW: '#64748b', MEDIUM: '#f59e0b', HIGH: '#ef4444' };

  return (
    <div style={{
      background: '#1e293b', borderRadius: '12px', padding: '20px',
      marginBottom: '12px', borderLeft: `4px solid ${statusColors[task.status]}`
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '8px', fontSize: '16px', color: '#f1f5f9' }}>{task.title}</h3>
          {task.description && (
            <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '12px' }}>
              {task.description}
            </p>
          )}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{
              padding: '3px 10px', borderRadius: '20px', fontSize: '12px',
              background: statusColors[task.status] + '22', color: statusColors[task.status]
            }}>
              {task.status.replace('_', ' ')}
            </span>
            <span style={{
              padding: '3px 10px', borderRadius: '20px', fontSize: '12px',
              background: priorityColors[task.priority] + '22', color: priorityColors[task.priority]
            }}>
              {task.priority}
            </span>
            {task.dueDate && (
              <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '12px',
                background: '#334155', color: '#94a3b8' }}>
                Due: {task.dueDate}
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
          <select value={task.status} onChange={e => onStatusChange(task.id, e.target.value)}
            style={{ background: '#334155', color: '#e2e8f0', border: 'none',
              borderRadius: '6px', padding: '4px 8px', fontSize: '12px', cursor: 'pointer' }}>
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
          <button onClick={() => onDelete(task.id)} style={{
            background: '#ef444422', color: '#ef4444', border: '1px solid #ef444444',
            borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px'
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}