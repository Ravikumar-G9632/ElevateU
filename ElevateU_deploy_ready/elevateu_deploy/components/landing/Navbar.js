'use client'
import { useRouter } from 'next/navigation'
import { useApp } from '../../lib/context'

export default function Navbar() {
  const router = useRouter()
  const { state } = useApp()

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(13,13,20,0.85)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '0 5%', height: 60,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      <div onClick={() => router.push('/')} style={{ display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>🎓</div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, background: 'linear-gradient(135deg,#a78bfa,#fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ElevateU</span>
      </div>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {['Courses','Community','Pricing'].map(l => (
          <span key={l} style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', cursor: 'pointer', fontWeight: 500, transition: 'color .15s' }}
            onMouseEnter={e => e.target.style.color='#fff'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.55)'}>{l}</span>
        ))}
        {state.user ? (
          <button className="btn btn-primary btn-pill" style={{ fontSize: 13, padding: '9px 20px' }} onClick={() => router.push('/dashboard')}>Dashboard →</button>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-ghost" style={{ fontSize: 13, padding: '9px 18px', borderRadius: 999 }} onClick={() => router.push('/auth')}>Sign In</button>
            <button className="btn btn-primary btn-pill" style={{ fontSize: 13, padding: '9px 20px' }} onClick={() => router.push('/auth')}>Get Started</button>
          </div>
        )}
      </div>
    </nav>
  )
}
