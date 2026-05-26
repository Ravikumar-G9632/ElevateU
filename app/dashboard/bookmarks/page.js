'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '../../../lib/context'
import DashboardShell from '../../../components/layout/DashboardShell'
import CourseCard from '../../../components/dashboard/CourseCard'
import { COURSES } from '../../../lib/data'

export default function BookmarksPage() {
  const { state, isBookmarked } = useApp()
  const router = useRouter()

  useEffect(() => { if (!state.user) router.replace('/auth') }, [state.user])
  if (!state.user) return null

  const bookmarked = COURSES.filter(c => isBookmarked(c.id))

  return (
    <DashboardShell title="Bookmarks" subtitle="Courses you've saved for later">
      {bookmarked.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.3)' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔖</div>
          <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: 'rgba(255,255,255,0.5)' }}>No bookmarks yet</div>
          <div style={{ fontSize: 13, marginBottom: 24 }}>Bookmark courses to save them for later</div>
          <button className="btn btn-primary" style={{ borderRadius: 10 }} onClick={() => router.push('/dashboard/courses')}>
            Browse Courses →
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(270px,1fr))', gap: 16 }} className="stagger">
          {bookmarked.map(c => <CourseCard key={c.id} course={c} />)}
        </div>
      )}
    </DashboardShell>
  )
}
