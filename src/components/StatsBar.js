export default function StatsBar({ stats }) {
  const items = [
    { label: 'To Do', key: 'TODO', color: '#6366f1' },
    { label: 'In Progress', key: 'IN_PROGRESS', color: '#f59e0b' },
    { label: 'Done', key: 'DONE', color: '#10b981' }
  ];
  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
      {items.map(item => (
        <div key={item.key} style={{
          flex: 1, padding: '20px', borderRadius: '12px',
          background: '#1e293b', borderLeft: `4px solid ${item.color}`
        }}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: item.color }}>
            {stats[item.key] || 0}
          </div>
          <div style={{ color: '#94a3b8', marginTop: '4px' }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}