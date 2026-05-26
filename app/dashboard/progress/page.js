'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '../../../lib/context'
import DashboardShell from '../../../components/layout/DashboardShell'
import ProgressRing from '../../../components/ui/ProgressRing'
import { COURSES } from '../../../lib/data'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

export default function ProgressPage() {
  const { state, getProgress, isEnrolled, isComplete, totalStudyHours, totalCerts } = useApp()
  const router = useRouter()

  useEffect(() => { if (!state.user) router.replace('/auth') }, [state.user])
  if (!state.user) return null

  const enrolledCourses = COURSES.filter(c => isEnrolled(c.id))
  const overallPct = enrolledCourses.length === 0 ? 0 : Math.round(enrolledCourses.reduce((a, c) => a + getProgress(c.id), 0) / enrolledCourses.length)

  const radarData = COURSES.map(c => ({ domain: c.title.split(' ')[0], value: getProgress(c.id) }))
  const barData = enrolledCourses.map(c => ({ name: c.title.split(' ')[0], progress: getProgress(c.id) }))

  return (
    <DashboardShell title="My Progress" subtitle="Deep dive into your learning analytics">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>

        {/* Top summary */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {[
            { icon: '🎯', label: 'Overall Progress', value: `${overallPct}%`, accent: '#6366f1' },
            { icon: '📚', label: 'Courses Enrolled', value: enrolledCourses.length, accent: '#8b5cf6' },
            { icon: '🏆', label: 'Completed', value: totalCerts, accent: '#10b981' },
            { icon: '⏱', label: 'Study Hours', value: `${totalStudyHours.toFixed(1)}h`, accent: '#f59e0b' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px 22px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <ProgressRing pct={typeof s.value === 'string' && s.value.includes('%') ? overallPct : Math.min((typeof s.value === 'number' ? s.value : parseFloat(s.value)) / 10 * 100, 100)} size={48} stroke={4} color={s.accent} />
              <div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginBottom: 3, fontWeight: 600 }}>{s.icon} {s.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22 }}>{s.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Bar chart */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '22px 20px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Course Progress</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 18 }}>Completion % per enrolled course</div>
            {enrolledCourses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px', color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>Enroll in courses to see progress</div>
            ) : (
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={barData} margin={{ left: -32, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: '#1e1e35', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8, fontSize: 12 }} labelStyle={{ color: '#fff' }} itemStyle={{ color: '#a78bfa' }} />
                  <Bar dataKey="progress" fill="#6366f1" radius={[5,5,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Radar */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '22px 20px' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, marginBottom: 4 }}>Domain Coverage</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 18 }}>Skills across all 7 domains</div>
            <ResponsiveContainer width="100%" height={180}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="domain" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 9 }} />
                <Radar dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Per-course breakdown */}
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '22px 24px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, marginBottom: 18 }}>All Courses Breakdown</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {COURSES.map(c => {
              const pct = getProgress(c.id)
              const done = isComplete(c.id)
              const enrolled = isEnrolled(c.id)
              return (
                <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }} onClick={() => router.push(`/dashboard/learn/${c.id}`)}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{c.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                      <span style={{ fontSize: 13, fontWeight: 600 }}>{c.title}</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: done ? '#10b981' : enrolled ? '#a78bfa' : 'rgba(255,255,255,0.25)' }}>
                        {enrolled ? `${pct}%` : 'Not started'}
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div className={`progress-fill ${done ? 'done' : ''}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                  {done && <span style={{ fontSize: 14 }}>🏆</span>}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
