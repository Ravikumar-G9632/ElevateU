'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '../../lib/context'
import DashboardShell from '../../components/layout/DashboardShell'
import StatCard from '../../components/dashboard/StatCard'
import CourseCard from '../../components/dashboard/CourseCard'
import ActivityChart from '../../components/dashboard/ActivityChart'
import { COURSES } from '../../lib/data'

export default function DashboardPage() {
  const { state, getProgress, isEnrolled, totalCerts, totalStudyHours, level, xpToNextLevel } = useApp()
  const router = useRouter()

  useEffect(() => { if (!state.user) router.replace('/auth') }, [state.user])
  if (!state.user) return null

  const enrolledCourses = COURSES.filter(c => isEnrolled(c.id))
  const inProgress = enrolledCourses.filter(c => getProgress(c.id) < 100)
  const greetHour = new Date().getHours()
  const greeting = greetHour < 12 ? 'Good morning' : greetHour < 18 ? 'Good afternoon' : 'Good evening'
  const xpPct = Math.round(((200 - xpToNextLevel) / 200) * 100)

  return (
    <DashboardShell title={`${greeting}, ${state.user.name?.split(' ')[0]} 👋`} subtitle="Here's what's happening with your learning today.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* XP / Level bar */}
        <div style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.13),rgba(139,92,246,0.07))', border: '1px solid rgba(99,102,241,0.22)', borderRadius: 16, padding: '16px 22px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20, flexShrink: 0 }}>
            Lv{level}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: '#a78bfa' }}>Level {level} Learner</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{state.xp} XP · {xpToNextLevel} to next level</span>
            </div>
            <div style={{ height: 8, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${xpPct}%`, background: 'linear-gradient(90deg,#6366f1,#a78bfa)', borderRadius: 999, transition: 'width 0.5s ease' }} />
            </div>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: 22 }}>🔥</div>
            <div style={{ fontSize: 13, fontWeight: 800, color: '#f97316' }}>{state.streak}d</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>Streak</div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }} className="stagger">
          <StatCard icon="📚" value={enrolledCourses.length} label="Enrolled Courses" accent="#6366f1" />
          <StatCard icon="✅" value={totalCerts} label="Completed" sub={totalCerts > 0 ? 'Certificates earned!' : null} accent="#10b981" />
          <StatCard icon="🏆" value={totalCerts} label="Certificates" accent="#f59e0b" />
          <StatCard icon="⏱" value={`${totalStudyHours.toFixed(1)}h`} label="Study Time" accent="#ec4899" />
        </div>

        {/* User ID card */}
        {state.user.id && (
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>YOUR USER ID</span>
              <div style={{ fontSize: 14, fontWeight: 800, fontFamily: 'monospace', color: '#a78bfa', letterSpacing: 1 }}>{state.user.id}</div>
            </div>
            <button className="btn btn-ghost" style={{ fontSize: 11, padding: '5px 12px', borderRadius: 7 }}
              onClick={() => { navigator.clipboard.writeText(state.user.id) }}>
              📋 Copy ID
            </button>
          </div>
        )}

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <ActivityChart />

            {inProgress.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>Continue Learning</h3>
                  <button className="btn btn-ghost" style={{ fontSize: 11, padding: '6px 12px', borderRadius: 8 }} onClick={() => router.push('/dashboard/courses')}>View all →</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 14 }} className="stagger">
                  {inProgress.slice(0, 4).map(c => <CourseCard key={c.id} course={c} />)}
                </div>
              </div>
            )}

            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 16 }}>Explore Courses</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 14 }} className="stagger">
                {COURSES.filter(c => !isEnrolled(c.id)).slice(0, 4).map(c => <CourseCard key={c.id} course={c} />)}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* User card */}
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '22px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                {state.user.avatar && state.user.avatar.startsWith('http') ? (
                  <img src={state.user.avatar} alt="avatar" style={{ width: 48, height: 48, borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20 }}>
                    {state.user.name?.[0]?.toUpperCase()}
                  </div>
                )}
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{state.user.name}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>@{state.user.username || state.user.email}</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[['📚', enrolledCourses.length, 'Enrolled'],['🏆', totalCerts, 'Certs'],['⚡', state.xp, 'XP'],['🔥', state.streak, 'Streak']].map(([ic,v,l]) => (
                  <div key={l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px', textAlign: 'center' }}>
                    <div style={{ fontSize: 16 }}>{ic}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18 }}>{v}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrolled courses */}
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, marginBottom: 14 }}>Enrolled Courses</div>
              {enrolledCourses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px 0', color: 'rgba(255,255,255,0.3)', fontSize: 13 }}>
                  No courses yet.<br />
                  <span style={{ color: '#a78bfa', cursor: 'pointer', fontWeight: 700 }} onClick={() => router.push('/dashboard/courses')}>Browse all →</span>
                </div>
              ) : enrolledCourses.map(c => {
                const pct = getProgress(c.id)
                return (
                  <div key={c.id} onClick={() => router.push(`/dashboard/learn/${c.id}`)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer' }}>
                    <span style={{ fontSize: 20 }}>{c.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.title}</div>
                      <div className="progress-bar" style={{ marginTop: 5 }}>
                        <div className={`progress-fill ${pct === 100 ? 'done' : ''}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: pct === 100 ? '#10b981' : '#a78bfa', flexShrink: 0 }}>{pct}%</span>
                  </div>
                )
              })}
            </div>

            {/* Quick actions */}
            <div style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.07))', border: '1px solid rgba(99,102,241,0.22)', borderRadius: 16, padding: '20px' }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: '#a78bfa', marginBottom: 10 }}>🎯 Quick Actions</div>
              {[['🏆','View Certificates','/dashboard/certificates'],['📊','My Progress','/dashboard/progress'],['🔖','Bookmarks','/dashboard/bookmarks'],['👤','Edit Profile','/dashboard/profile']].map(([ic,l,h]) => (
                <button key={h} className="sidebar-item" style={{ marginBottom: 2 }} onClick={() => router.push(h)}>
                  <span>{ic}</span> {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
