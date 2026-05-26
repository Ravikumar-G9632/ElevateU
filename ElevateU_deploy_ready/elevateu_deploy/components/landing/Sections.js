'use client'
import { TESTIMONIALS, FAQS } from '../../lib/data'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function TestimonialsSection() {
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 5% 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 34, marginBottom: 8 }}>What Our Students Say</h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>Real outcomes from real learners.</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
        {TESTIMONIALS.map((t, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '24px 22px' }}>
            <div style={{ display: 'flex', gap: 5, marginBottom: 14 }}>{[1,2,3,4,5].map(s => <span key={s} style={{ color: '#fbbf24', fontSize: 13 }}>★</span>)}</div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: 18, fontStyle: 'italic' }}>"{t.text}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>{t.avatar}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{t.role}</div>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: 10, background: 'rgba(99,102,241,0.12)', color: '#a78bfa', border: '1px solid rgba(99,102,241,0.25)', padding: '2px 8px', borderRadius: 999, fontWeight: 700 }}>{t.course}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function FAQSection() {
  const [open, setOpen] = useState(null)
  return (
    <section style={{ maxWidth: 760, margin: '0 auto', padding: '0 5% 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 34, marginBottom: 8 }}>Frequently Asked</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {FAQS.map((f, i) => (
          <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', transition: 'border-color .2s', borderColor: open === i ? 'rgba(99,102,241,0.35)' : '' }}>
            <button onClick={() => setOpen(open === i ? null : i)}
              style={{ width: '100%', background: 'none', border: 'none', padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-body)', gap: 16 }}>
              {f.q}
              <span style={{ flexShrink: 0, fontSize: 18, color: 'rgba(255,255,255,0.35)', transition: 'transform .2s', transform: open === i ? 'rotate(45deg)' : '' }}>+</span>
            </button>
            {open === i && (
              <div style={{ padding: '0 20px 18px', fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.75 }}>{f.a}</div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export function CertificateBanner() {
  const router = useRouter()
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 5% 80px' }}>
      <div style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.14),rgba(139,92,246,0.09))', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 24, padding: '52px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 28, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.2),transparent 70%)', pointerEvents: 'none' }} />
        <div>
          <div style={{ fontSize: 12, color: '#a78bfa', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 10 }}>Upon Course Completion</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 30, marginBottom: 10 }}>Earn Your ElevateU Certificate</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, maxWidth: 460, lineHeight: 1.75 }}>
            Complete all video lessons and receive a verified certificate issued in your name - recognised by 500+ hiring partners globally including Razorpay, Flipkart, Infosys and more.
          </p>
        </div>
        <button className="btn btn-primary btn-pill" style={{ fontSize: 15, padding: '14px 32px', flexShrink: 0 }} onClick={() => router.push('/auth')}>Enroll Now →</button>
      </div>
    </section>
  )
}
