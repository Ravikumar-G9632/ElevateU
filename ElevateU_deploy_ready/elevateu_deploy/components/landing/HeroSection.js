'use client'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const router = useRouter()

  return (
    <section style={{ maxWidth: 960, margin: '0 auto', padding: '80px 5% 64px', textAlign: 'center', position: 'relative' }}>
      {/* Glow orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 360, height: 360, background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '20%', right: '5%', width: 280, height: 280, background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="stagger">
        {/* Badge */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.28)', borderRadius: 999, padding: '5px 14px', marginBottom: 24 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1', display: 'inline-block', animation: 'pulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: 12, color: '#a78bfa', fontWeight: 600 }}>Trusted by 80,000+ learners worldwide</span>
        </div>

        {/* Headline */}
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(38px,5.5vw,68px)', lineHeight: 1.08, marginBottom: 20, letterSpacing: '-0.025em' }}>
          Learn Tech Skills<br />
          <span style={{ background: 'linear-gradient(135deg,#6366f1 0%,#a78bfa 50%,#ec4899 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            That Actually Matter
          </span>
        </h1>

        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Structured video courses in Python, AI, Full Stack and more. Complete every lesson and earn a verified certificate - in your name, from ElevateU.
        </p>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
          <button className="btn btn-primary btn-pill" style={{ fontSize: 15, padding: '13px 30px' }} onClick={() => router.push('/auth')}>
            Start Learning Free →
          </button>
          <button className="btn btn-ghost btn-pill" style={{ fontSize: 15 }} onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}>
            Browse Courses
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[['80K+','Students'],['7','Domains'],['500+','Hiring Partners'],['4.9★','Avg Rating']].map(([v,l]) => (
            <div key={l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, background: 'linear-gradient(135deg,#a78bfa,#fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3, fontWeight: 500 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
