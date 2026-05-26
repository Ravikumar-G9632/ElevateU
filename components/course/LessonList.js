'use client'

export default function LessonList({ videos, progress = [], activeIdx, onSelect, accent = '#6366f1' }) {
  const done = progress.filter(Boolean).length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.35)', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 10 }}>Course Content</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 7 }}>
          <span>Progress</span>
          <span style={{ fontWeight: 700, color: done === videos.length ? '#10b981' : '#a78bfa' }}>{done}/{videos.length}</span>
        </div>
        <div className="progress-bar">
          <div className={`progress-fill ${done === videos.length ? 'done' : ''}`} style={{ width: `${(done / videos.length) * 100}%` }} />
        </div>
      </div>

      {/* Lessons */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
        {videos.map((v, i) => {
          const isDone = progress[i]
          const isActive = i === activeIdx
          return (
            <div key={i} className={`vid-item ${isActive ? 'active' : ''}`} onClick={() => onSelect(i)}>
              {/* Status circle */}
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800,
                background: isDone ? 'rgba(16,185,129,0.18)' : isActive ? `${accent}28` : 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${isDone ? 'rgba(16,185,129,0.5)' : isActive ? `${accent}80` : 'rgba(255,255,255,0.1)'}`,
                color: isDone ? '#10b981' : isActive ? '#a78bfa' : 'rgba(255,255,255,0.3)',
              }}>
                {isDone ? '✓' : i + 1}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: isActive ? 700 : 500, color: isActive ? '#fff' : 'rgba(255,255,255,0.55)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: 1.3 }}>{v.title}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)' }}>{v.duration}</span>
                  {v.preview && <span style={{ fontSize: 9, color: accent, fontWeight: 700 }}>FREE</span>}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
