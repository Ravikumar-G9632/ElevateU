'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useApp } from '../../../../lib/context'
import { COURSES } from '../../../../lib/data'
import VideoPlayer from '../../../../components/course/VideoPlayer'
import LessonList from '../../../../components/course/LessonList'
import { CertificateModal } from '../../../../components/certificate/Certificate'
import ProgressRing from '../../../../components/ui/ProgressRing'

export default function LearnPage() {
  const { courseId } = useParams()
  const { state, dispatch, getProgress, isComplete, isEnrolled } = useApp()
  const router = useRouter()
  const [activeIdx, setActiveIdx] = useState(0)
  const [showCert, setShowCert] = useState(false)

  const course = COURSES.find(c => c.id === courseId)
  const enrolled = isEnrolled(courseId)
  const pct = getProgress(courseId)
  const done = isComplete(courseId)
  const lessonProgress = state.enrolled[courseId]?.progress || []
  const certId = state.enrolled[courseId]?.certId

  useEffect(() => {
    if (!state.user) router.replace('/auth')
    if (!course) router.replace('/dashboard/courses')
  }, [state.user, course])

  useEffect(() => {
    // Auto-advance to last watched or first incomplete
    if (enrolled && state.enrolled[courseId]) {
      const lastWatched = state.enrolled[courseId].lastWatched || 0
      setActiveIdx(lastWatched)
    }
  }, [courseId])

  if (!state.user || !course) return null

  const handleEnroll = () => {
    dispatch({ type: 'ENROLL', payload: { courseId: course.id, totalLessons: course.videos.length } })
  }

  const handleComplete = () => {
    dispatch({ type: 'MARK_LESSON', payload: { courseId: course.id, lessonIdx: activeIdx } })
    // Auto-advance
    if (activeIdx < course.videos.length - 1) {
      setTimeout(() => {
        const nextIdx = activeIdx + 1
        setActiveIdx(nextIdx)
        dispatch({ type: 'SET_LAST_WATCHED', payload: { courseId: course.id, lessonIdx: nextIdx } })
      }, 600)
    }
  }

  const handleSelect = (idx) => {
    setActiveIdx(idx)
    dispatch({ type: 'SET_LAST_WATCHED', payload: { courseId: course.id, lessonIdx: idx } })
  }

  const currentVideo = course.videos[activeIdx]
  const isCurrentDone = lessonProgress[activeIdx]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)', color: '#fff' }}>
      {/* Topbar */}
      <div style={{ height: 56, borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0, background: 'rgba(13,13,20,0.9)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 5 }} onClick={() => router.push('/dashboard')}>
            ← Dashboard
          </button>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>|</span>
          <span style={{ fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 7 }}>{course.icon} {course.title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <ProgressRing pct={pct} size={36} stroke={3} color={course.accent} />
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{lessonProgress.filter(Boolean).length}/{course.videos.length} done</span>
          {done && (
            <button className="btn btn-primary" style={{ fontSize: 12, padding: '7px 14px', borderRadius: 9 }} onClick={() => setShowCert(true)}>
              🏆 View Certificate
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* Main content */}
        <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto', minWidth: 0 }}>

          {/* Enroll prompt */}
          {!enrolled && (
            <div style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 14, padding: '18px 22px', marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>Enroll to unlock all lessons</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>Preview lesson 1 is free. Enroll to access all {course.videos.length} lessons.</div>
              </div>
              <button className="btn btn-primary" style={{ fontSize: 13, borderRadius: 9, flexShrink: 0 }} onClick={handleEnroll}>Enroll Free →</button>
            </div>
          )}

          {/* Video player */}
          <div style={{ marginBottom: 20 }}>
            <VideoPlayer video={currentVideo} onComplete={handleComplete} isCompleted={isCurrentDone} courseAccent={course.accent} />
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, marginBottom: 3 }}>{currentVideo.title}</h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>Lesson {activeIdx + 1} of {course.videos.length} · {currentVideo.duration}</p>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-ghost" style={{ fontSize: 12, padding: '8px 16px' }} disabled={activeIdx === 0} onClick={() => handleSelect(activeIdx - 1)}>← Prev</button>
              {enrolled && !isCurrentDone && (
                <button className="btn btn-primary" style={{ fontSize: 12, padding: '8px 16px', borderRadius: 9 }} onClick={handleComplete}>Mark Complete ✓</button>
              )}
              {isCurrentDone && <span style={{ fontSize: 12, color: '#10b981', fontWeight: 700, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 4 }}>✓ Completed</span>}
              <button className="btn btn-ghost" style={{ fontSize: 12, padding: '8px 16px' }} disabled={activeIdx === course.videos.length - 1} onClick={() => handleSelect(activeIdx + 1)}>Next →</button>
            </div>
          </div>

          {/* Course info tabs */}
          <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '22px 24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, marginBottom: 12 }}>About this course</h3>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.75, marginBottom: 16 }}>{course.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {course.skills.map(s => (
                <span key={s} style={{ fontSize: 11, background: `${course.accent}18`, color: course.accent, border: `1px solid ${course.accent}40`, padding: '4px 12px', borderRadius: 999, fontWeight: 700 }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Completion banner */}
          {done && (
            <div style={{ marginTop: 20, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 16, padding: '22px 26px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#34d399', marginBottom: 4 }}>🏆 Course Complete! Well done!</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>Your certificate has been issued. Download or share it anytime.</div>
              </div>
              <button className="btn btn-primary" style={{ background: 'linear-gradient(135deg,#10b981,#34d399)', borderRadius: 10, fontSize: 13, flexShrink: 0 }} onClick={() => setShowCert(true)}>
                View Certificate →
              </button>
            </div>
          )}
        </div>

        {/* Lesson sidebar */}
        <div style={{ width: 300, borderLeft: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 56px)', position: 'sticky', top: 56, overflow: 'hidden', flexShrink: 0 }}>
          <LessonList videos={course.videos} progress={lessonProgress} activeIdx={activeIdx} onSelect={handleSelect} accent={course.accent} />
        </div>
      </div>

      <CertificateModal open={showCert} onClose={() => setShowCert(false)} course={course} user={state.user} certId={certId} />
    </div>
  )
}
