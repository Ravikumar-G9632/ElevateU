'use client'
import Modal from '../ui/Modal'

export function CertificateModal({ open, onClose, course, user, certId }) {
  if (!course || !user) return null
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <Modal open={open} onClose={onClose} maxWidth={680}>
      <div className="cert-paper" style={{ padding: '52px 60px', textAlign: 'center', color: '#1a1a2e' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 20, background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: '#bbb', lineHeight: 1 }}>✕</button>

        {/* Header strip */}
        <div style={{ height: 6, borderRadius: 3, background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899)', marginBottom: 36 }} />

        <div style={{ fontSize: 42, marginBottom: 6 }}>🏆</div>
        <div style={{ fontSize: 11, color: '#6366f1', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 2 }}>Certificate of Completion</div>
        <div style={{ fontSize: 12, color: '#999', fontWeight: 600, marginBottom: 30, fontFamily: 'var(--font-display)' }}>ElevateU · Excellence in Tech Education</div>

        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#e5e7eb,transparent)', marginBottom: 30 }} />

        <p style={{ color: '#6b7280', fontSize: 15, marginBottom: 8 }}>This is to certify that</p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 38, color: '#1a1a2e', marginBottom: 8, letterSpacing: '-0.02em' }}>{user?.name}</h2>
        <p style={{ color: '#6b7280', fontSize: 15, marginBottom: 6 }}>has successfully completed</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: '#6366f1', marginBottom: 8 }}>
          {course.icon} {course.title}
        </h3>
        <p style={{ color: '#9ca3af', fontSize: 13, marginBottom: 28 }}>with {course.lessons} lessons over {course.duration}</p>

        {/* Skills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', marginBottom: 28 }}>
          {course.skills.map(s => (
            <span key={s} style={{ fontSize: 11, background: '#f0f0ff', color: '#6366f1', border: '1px solid #c7d2fe', padding: '3px 10px', borderRadius: 999, fontWeight: 700 }}>{s}</span>
          ))}
        </div>

        <div style={{ height: 1, background: 'linear-gradient(90deg,transparent,#e5e7eb,transparent)', marginBottom: 24 }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9ca3af', marginBottom: 28 }}>
          <span>Issue Date: {date}</span>
          <span>Certificate ID: <strong style={{ color: '#6366f1' }}>{certId}</strong></span>
        </div>

        {/* Signatures */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 30 }}>
          {['Founder, ElevateU','Head of Learning'].map((role, i) => (
            <div key={i}>
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 8 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: '#374151' }}>{['Aditya Kumar','Priya Nair'][i]}</div>
                <div style={{ fontSize: 11, color: '#9ca3af' }}>{role}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: 6, borderRadius: 3, background: 'linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899)' }} />

        <div style={{ marginTop: 24, display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="btn btn-primary" style={{ borderRadius: 10, fontSize: 13 }} onClick={onClose}>Download PDF ↓</button>
          <button className="btn btn-ghost" style={{ borderRadius: 10, fontSize: 13 }} onClick={onClose}>Share 🔗</button>
        </div>
      </div>
    </Modal>
  )
}

export function CertificateCard({ course, user, certId, onClick }) {
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  return (
    <div style={{ background: `linear-gradient(135deg,${course.accent}14,rgba(99,102,241,0.07))`, border: `1px solid ${course.accent}35`, borderRadius: 18, padding: '24px 22px', cursor: 'pointer', transition: 'all .2s' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
      onMouseLeave={e => e.currentTarget.style.transform = ''}
      onClick={onClick}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>{course.icon}</div>
      <div style={{ fontSize: 10, color: course.accent, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>Certificate of Completion</div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, marginBottom: 6, color: '#fff' }}>{course.title}</h3>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>Issued: {date}</div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginBottom: 16 }}>ID: {certId}</div>
      <button className="btn btn-primary" style={{ fontSize: 12, padding: '8px 16px', borderRadius: 9, width: '100%', justifyContent: 'center' }}>View Certificate →</button>
    </div>
  )
}
