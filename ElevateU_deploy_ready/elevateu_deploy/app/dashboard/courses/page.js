'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '../../../lib/context'
import DashboardShell from '../../../components/layout/DashboardShell'
import CourseCard from '../../../components/dashboard/CourseCard'
import { COURSES } from '../../../lib/data'

const TABS = ['All', 'In Progress', 'Completed', 'Not Started']
const DOMAINS = ['All Domains', 'Python', 'Java', 'Full Stack', 'MERN', 'Data Science', 'ML', 'Deep Learning']

export default function CoursesPage() {
  const { state, isEnrolled, getProgress, isComplete } = useApp()
  const router = useRouter()
  const [tab, setTab] = useState('All')
  const [domain, setDomain] = useState('All Domains')
  const [search, setSearch] = useState('')

  useEffect(() => { if (!state.user) router.replace('/auth') }, [state.user])
  if (!state.user) return null

  const filtered = COURSES.filter(c => {
    const enrolled = isEnrolled(c.id)
    const pct = getProgress(c.id)
    if (tab === 'In Progress' && !(enrolled && pct < 100)) return false
    if (tab === 'Completed' && !isComplete(c.id)) return false
    if (tab === 'Not Started' && enrolled) return false
    if (search && !c.title.toLowerCase().includes(search.toLowerCase()) && !c.description.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <DashboardShell title="All Courses" subtitle="Browse, enroll and track your learning journey">
      <div style={{ marginBottom: 22, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Search */}
        <input className="input-field" style={{ maxWidth: 280, fontSize: 13, paddingTop: 9, paddingBottom: 9 }}
          placeholder="🔍  Search courses..." value={search} onChange={e => setSearch(e.target.value)} />
        {/* Domain filter */}
        <select value={domain} onChange={e => setDomain(e.target.value)}
          style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 10, padding: '9px 14px', color: '#fff', fontSize: 13, cursor: 'pointer', outline: 'none' }}>
          {DOMAINS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 24, borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: 24 }}>
        {TABS.map(t => (
          <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t}
            <span style={{ marginLeft: 6, fontSize: 10, background: 'rgba(255,255,255,0.08)', padding: '1px 6px', borderRadius: 999 }}>
              {t === 'All' ? COURSES.length : t === 'In Progress' ? COURSES.filter(c => isEnrolled(c.id) && getProgress(c.id) < 100).length : t === 'Completed' ? COURSES.filter(c => isComplete(c.id)).length : COURSES.filter(c => !isEnrolled(c.id)).length}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.3)' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>No courses found</div>
          <div style={{ fontSize: 13 }}>Try adjusting your filters</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: 16 }} className="stagger">
          {filtered.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      )}
    </DashboardShell>
  )
}
