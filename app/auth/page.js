'use client'
import AuthForm from '../../components/auth/AuthForm'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const router = useRouter()
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', color: '#fff' }}>
      {/* Left panel */}
      <div style={{ flex: 1, background: 'linear-gradient(160deg,rgba(99,102,241,0.13) 0%,transparent 65%)', borderRight: '1px solid rgba(255,255,255,0.06)', padding: '60px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center', minWidth: 0 }}>
        <div onClick={() => router.push('/')} style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 52, cursor: 'pointer' }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🎓</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, background: 'linear-gradient(135deg,#a78bfa,#fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ElevateU</span>
        </div>

        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 34, lineHeight: 1.15, marginBottom: 24, letterSpacing: '-0.02em' }}>
          Your journey to<br /><span style={{ background: 'linear-gradient(135deg,#6366f1,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>mastery starts here.</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {['Access 7 world-class tech domains','Structured video lessons, learn at your pace','Earn verified certificates on completion','Recognised by 500+ hiring partners globally'].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: 'rgba(99,102,241,0.18)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, flexShrink: 0 }}>✓</div>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>{f}</span>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '18px 20px' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', fontStyle: 'italic', marginBottom: 12, lineHeight: 1.7 }}>"ElevateU's Deep Learning track landed me my dream role at Google. The structured video content is genuinely world-class."</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>A</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>Aryan Sharma</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>ML Engineer @ Google</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ width: 460, padding: '60px 52px', display: 'flex', flexDirection: 'column', justifyContent: 'center', flexShrink: 0 }}>
        <AuthForm />
      </div>
    </div>
  )
}
