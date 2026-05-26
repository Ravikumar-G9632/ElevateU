'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '../../../lib/context'
import DashboardShell from '../../../components/layout/DashboardShell'
import { COURSES } from '../../../lib/data'
import { updateUser } from '../../../lib/users'

export default function ProfilePage() {
  const { state, dispatch, getProgress, isEnrolled, totalCerts, totalStudyHours, level } = useApp()
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', bio: '', location: '' })
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => { if (!state.user) router.replace('/auth') }, [state.user])
  useEffect(() => {
    if (state.user) setForm({
      name: state.user.name || '',
      email: state.user.email || '',
      bio: state.user.bio || 'Passionate learner on a mission to master tech skills.',
      location: state.user.location || 'India',
    })
  }, [state.user])

  if (!state.user) return null

  const enrolledCourses = COURSES.filter(c => isEnrolled(c.id))
  const memberSince = new Date(state.user.createdAt || Date.now()).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })

  const handleSave = () => {
    const updated = { ...state.user, ...form }
    dispatch({ type: 'UPDATE_USER', payload: updated })
    if (state.user.id) updateUser(state.user.id, form)
    setSaved(true)
    setEditMode(false)
    setTimeout(() => setSaved(false), 2500)
  }

  const copyId = () => {
    navigator.clipboard.writeText(state.user.id || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <DashboardShell title="My Profile" subtitle="Manage your account and learning identity">
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: 22 }}>
        {/* Left */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 18, padding: '28px 24px', textAlign: 'center' }}>
            {state.user.avatar && state.user.avatar.startsWith('http') ? (
              <img src={state.user.avatar} alt="avatar" style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px', display: 'block' }} />
            ) : (
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 32, margin: '0 auto 16px' }}>
                {state.user.name?.[0]?.toUpperCase()}
              </div>
            )}
            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, marginBottom: 2 }}>{state.user.name}</h2>
            {state.user.username && <p style={{ fontSize: 12, color: '#a78bfa', marginBottom: 2, fontWeight: 600 }}>@{state.user.username}</p>}
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 4 }}>{state.user.email}</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginBottom: 10 }}>📍 {form.location}</p>

            {/* User ID */}
            {state.user.id && (
              <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 9, padding: '8px 12px', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: 1 }}>USER ID</div>
                  <div style={{ fontSize: 12, fontFamily: 'monospace', fontWeight: 800, color: '#a78bfa' }}>{state.user.id}</div>
                </div>
                <button onClick={copyId} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }} title="Copy">
                  {copied ? '✅' : '📋'}
                </button>
              </div>
            )}

            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 14 }}>
              <span style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.25)', color: '#a78bfa', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>Lv {level}</span>
              <span style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#34d399', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>Active</span>
              {totalCerts > 0 && <span style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)', color: '#fbbf24', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>Certified</span>}
              {state.user.provider === 'github' && <span style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 999 }}>GitHub</span>}
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, marginBottom: 14, fontStyle: 'italic' }}>{form.bio}</p>
            <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: 13 }} onClick={() => setEditMode(!editMode)}>
              {editMode ? 'Cancel' : '✏️ Edit Profile'}
            </button>
            {saved && <p style={{ color: '#34d399', fontSize: 12, marginTop: 8 }}>✓ Profile saved!</p>}
          </div>

          {/* Stats */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px 22px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 12, marginBottom: 14, color: 'rgba(255,255,255,0.4)', letterSpacing: 1 }}>LEARNING STATS</div>
            {[['📚','Enrolled',enrolledCourses.length],['🏆','Certificates',totalCerts],['⚡','XP Earned',state.xp],['🔥','Day Streak',state.streak],['⏱','Study Hours',`${totalStudyHours.toFixed(1)}h`],['📅','Member Since',memberSince]].map(([ic,l,v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: 13 }}>
                <span style={{ color: 'rgba(255,255,255,0.4)' }}>{ic} {l}</span>
                <span style={{ fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {editMode ? (
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 18, padding: '28px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, marginBottom: 20 }}>Edit Profile</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[['Full Name','name','text'],['Location','location','text']].map(([l,k,t]) => (
                  <div key={k}>
                    <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, display: 'block', marginBottom: 6 }}>{l}</label>
                    <input className="input-field" type={t} value={form[k]} onChange={e => setForm({...form, [k]: e.target.value})} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 700, display: 'block', marginBottom: 6 }}>Bio</label>
                  <textarea className="input-field" rows={3} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} style={{ resize: 'vertical' }} />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button className="btn btn-primary" style={{ borderRadius: 10 }} onClick={handleSave}>Save Changes</button>
                  <button className="btn btn-ghost" style={{ borderRadius: 10 }} onClick={() => setEditMode(false)}>Cancel</button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 18, padding: '26px 28px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, marginBottom: 18 }}>Account Info</h3>
              {[['Name',state.user.name],['Username',state.user.username ? '@' + state.user.username : '—'],['Email',state.user.email],['User ID',state.user.id || '—'],['Login via',state.user.provider === 'github' ? 'GitHub OAuth' : 'Email & Password'],['Location',form.location],['Member Since',memberSince]].map(([l,v]) => (
                <div key={l} style={{ display: 'flex', gap: 20, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', width: 120, flexShrink: 0, fontWeight: 600 }}>{l}</span>
                  <span style={{ fontSize: 13, color: l === 'User ID' ? '#a78bfa' : '#fff', fontFamily: l === 'User ID' ? 'monospace' : 'inherit', fontWeight: l === 'User ID' ? 700 : 400 }}>{v}</span>
                </div>
              ))}
            </div>
          )}

          {/* Enrolled courses list */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 18, padding: '24px 26px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16, marginBottom: 16 }}>My Learning Journey</h3>
            {enrolledCourses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '24px', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
                No courses enrolled yet.{' '}
                <span style={{ color: '#a78bfa', cursor: 'pointer', fontWeight: 700 }} onClick={() => router.push('/dashboard/courses')}>Explore →</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {enrolledCourses.map(c => {
                  const pct = getProgress(c.id)
                  return (
                    <div key={c.id} onClick={() => router.push(`/dashboard/learn/${c.id}`)} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '10px 12px', borderRadius: 12, transition: 'background .15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
                      onMouseLeave={e => e.currentTarget.style.background = ''}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: c.accentLight, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 5 }}>{c.title}</div>
                        <div className="progress-bar">
                          <div className={`progress-fill ${pct === 100 ? 'done' : ''}`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 800, color: pct === 100 ? '#10b981' : '#a78bfa', flexShrink: 0 }}>{pct}%</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Danger zone */}
          <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: 16, padding: '20px 24px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 13, color: '#f87171', marginBottom: 8 }}>Danger Zone</div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 14 }}>Signing out will end your current session. Your progress is saved.</p>
            <button className="btn" style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', fontSize: 12, padding: '8px 16px', borderRadius: 8 }}
              onClick={() => { dispatch({ type: 'LOGOUT' }); router.push('/') }}>
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
