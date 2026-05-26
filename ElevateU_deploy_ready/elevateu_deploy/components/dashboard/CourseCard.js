'use client'
import { useApp } from '../../lib/context'
import { useRouter } from 'next/navigation'
import ProgressRing from '../ui/ProgressRing'
import StarRating from '../ui/StarRating'
import { formatStudents } from '../../lib/data'

export default function CourseCard({ course }) {
  const { isEnrolled, getProgress, isComplete, isBookmarked, dispatch } = useApp()
  const router = useRouter()
  const enrolled = isEnrolled(course.id)
  const pct = getProgress(course.id)
  const done = isComplete(course.id)
  const bookmarked = isBookmarked(course.id)

  const handleEnroll = (e) => {
    e.stopPropagation()
    if (!enrolled) dispatch({ type: 'ENROLL', payload: { courseId: course.id, totalLessons: course.videos.length } })
    router.push(`/dashboard/learn/${course.id}`)
  }

  const handleBookmark = (e) => {
    e.stopPropagation()
    dispatch({ type: 'TOGGLE_BOOKMARK', payload: { courseId: course.id } })
  }

  return (
    <div
      onClick={() => router.push(`/dashboard/learn/${course.id}`)}
      style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 18, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.22s', position: 'relative' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = course.accent + '55' }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--border)' }}>

      {/* Bookmark button */}
      <button onClick={handleBookmark} style={{
        position: 'absolute', top: 10, right: 10, zIndex: 2,
        background: bookmarked ? 'rgba(99,102,241,0.25)' : 'rgba(0,0,0,0.25)',
        border: 'none', borderRadius: 7, width: 28, height: 28,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', fontSize: 13, backdropFilter: 'blur(4px)',
        transition: 'background 0.2s',
      }}>
        {bookmarked ? '🔖' : '🏷'}
      </button>

      {/* Banner */}
      <div style={{ background: course.accentLight, padding: '18px 18px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 30 }}>{course.icon}</span>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: course.accentDark }}>{course.title}</div>
            <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', marginTop: 1 }}>{course.lessons} lessons · {course.duration}</div>
          </div>
        </div>
        {enrolled && <ProgressRing pct={pct} size={44} stroke={4} color={course.accent} />}
      </div>

      {/* Body */}
      <div style={{ padding: '14px 18px 16px' }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 12, lineHeight: 1.6 }}>{course.description}</p>

        {enrolled ? (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,255,255,0.35)', marginBottom: 6 }}>
              <span>Progress</span>
              <span style={{ fontWeight: 700, color: done ? '#10b981' : '#a78bfa' }}>{pct}%</span>
            </div>
            <div className="progress-bar">
              <div className={`progress-fill ${done ? 'done' : ''}`} style={{ width: `${pct}%` }} />
            </div>
            {done && <div style={{ marginTop: 10, fontSize: 11, color: '#10b981', fontWeight: 700 }}>🏆 Certificate earned!</div>}
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <StarRating rating={course.rating} size={12} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>({formatStudents(course.reviews)})</span>
            </div>
            <button className="btn btn-primary" style={{ fontSize: 11, padding: '6px 14px', borderRadius: 8 }} onClick={handleEnroll}>
              Enroll →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
