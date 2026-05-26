'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '../../../lib/context'
import DashboardShell from '../../../components/layout/DashboardShell'
import { CertificateCard, CertificateModal } from '../../../components/certificate/Certificate'
import { COURSES } from '../../../lib/data'

export default function CertificatesPage() {
  const { state, isComplete, totalCerts } = useApp()
  const router = useRouter()
  const [activeCert, setActiveCert] = useState(null)

  useEffect(() => { if (!state.user) router.replace('/auth') }, [state.user])
  if (!state.user) return null

  const earnedCourses = COURSES.filter(c => isComplete(c.id))
  const lockedCourses = COURSES.filter(c => !isComplete(c.id))

  return (
    <DashboardShell title="My Certificates" subtitle="Your verified credentials - shareable and download-ready">
      {earnedCourses.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', textAlign: 'center' }}>
          <div style={{ fontSize: 56, marginBottom: 18 }}>🏆</div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, marginBottom: 10 }}>No certificates yet</h3>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, maxWidth: 380, lineHeight: 1.7, marginBottom: 24 }}>
            Complete all lessons in any course to earn a verified certificate in your name.
          </p>
          <button className="btn btn-primary btn-pill" onClick={() => router.push('/dashboard/courses')}>Browse Courses →</button>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 999, padding: '6px 16px', fontSize: 13, color: '#10b981', fontWeight: 700 }}>
              🏆 {totalCerts} Certificate{totalCerts !== 1 ? 's' : ''} Earned
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16, marginBottom: 40 }} className="stagger">
            {earnedCourses.map(c => (
              <CertificateCard key={c.id} course={c} user={state.user} certId={state.enrolled[c.id]?.certId} onClick={() => setActiveCert(c)} />
            ))}
          </div>
        </>
      )}

      {/* Locked certificates */}
      {lockedCourses.length > 0 && (
        <>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, marginBottom: 14, color: 'rgba(255,255,255,0.5)' }}>
            🔒 Locked Certificates ({lockedCourses.length})
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 14 }}>
            {lockedCourses.map(c => (
              <div key={c.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: 16, padding: '22px 20px', opacity: 0.6 }}>
                <div style={{ fontSize: 28, marginBottom: 10, filter: 'grayscale(1)' }}>{c.icon}</div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>Locked</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>{c.title}</div>
                <button className="btn btn-ghost" style={{ fontSize: 12, padding: '7px 14px', borderRadius: 8, width: '100%', justifyContent: 'center' }} onClick={() => router.push(`/dashboard/learn/${c.id}`)}>
                  Start Course →
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <CertificateModal open={!!activeCert} onClose={() => setActiveCert(null)} course={activeCert} user={state.user} certId={activeCert ? state.enrolled[activeCert.id]?.certId : null} />
    </DashboardShell>
  )
}
