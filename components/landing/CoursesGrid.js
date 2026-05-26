'use client'
import { COURSES, formatStudents } from '../../lib/data'
import { useRouter } from 'next/navigation'
import StarRating from '../ui/StarRating'

export default function CoursesGrid() {
  const router = useRouter()

  return (
    <section id="courses" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 5% 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 36, marginBottom: 10 }}>Choose Your Domain</h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, maxWidth: 500, margin: '0 auto' }}>7 career-defining tracks taught by industry professionals - from first line of code to job-ready.</p>
      </div>

      <div className="stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(290px,1fr))', gap: 16 }}>
        {COURSES.map(c => (
          <div key={c.id}
            onClick={() => router.push('/auth')}
            style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 18, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.22s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = c.accent + '60'; e.currentTarget.style.boxShadow = `0 16px 48px rgba(0,0,0,0.35)` }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = '' }}>
            {/* Top */}
            <div style={{ background: c.accentLight, padding: '22px 20px 16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ fontSize: 32 }}>{c.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, color: c.accentDark, fontFamily: 'var(--font-display)' }}>{c.title}</div>
                  <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', marginTop: 2 }}>{c.lessons} lessons · {c.duration}</div>
                </div>
              </div>
              <span style={{ fontSize: 10, fontWeight: 800, background: c.accent + '22', color: c.accent, padding: '3px 9px', borderRadius: 999, border: `1px solid ${c.accent}40`, whiteSpace: 'nowrap', flexShrink: 0 }}>{c.tag}</span>
            </div>

            {/* Body */}
            <div style={{ padding: '16px 20px 18px' }}>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginBottom: 14, lineHeight: 1.65 }}>{c.description}</p>

              {/* Skills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
                {c.skills.slice(0, 4).map(s => (
                  <span key={s} style={{ fontSize: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', padding: '2px 8px', borderRadius: 5, fontWeight: 600 }}>{s}</span>
                ))}
                {c.skills.length > 4 && <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', padding: '2px 4px' }}>+{c.skills.length - 4}</span>}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <StarRating rating={c.rating} />
                  <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>({formatStudents(c.reviews)})</span>
                </div>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>👥 {formatStudents(c.students)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
