'use client'
import { useState } from 'react'

export default function VideoPlayer({ video, onComplete, isCompleted, courseAccent = '#6366f1' }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(isCompleted ? 100 : 0)

  const handlePlay = () => {
    if (isCompleted) return
    setPlaying(true)
    // Simulate video progress
    let p = progress
    const interval = setInterval(() => {
      p += 2
      setProgress(Math.min(p, 100))
      if (p >= 100) {
        clearInterval(interval)
        setPlaying(false)
        onComplete?.()
      }
    }, 80)
  }

  return (
    <div style={{ background: '#0a0a10', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', aspectRatio: '16/9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Ambient glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 200, height: 200, background: `radial-gradient(circle,${courseAccent}25,transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />

      {isCompleted ? (
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#10b981', marginBottom: 4 }}>Lesson Completed</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{video.title}</div>
        </div>
      ) : playing ? (
        <div style={{ textAlign: 'center', width: '80%' }}>
          <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', marginBottom: 20 }}>▶ Now Playing: {video.title}</div>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 99, overflow: 'hidden', marginBottom: 10 }}>
            <div style={{ height: '100%', background: `linear-gradient(90deg,${courseAccent},#a78bfa)`, borderRadius: 99, width: `${progress}%`, transition: 'width .1s linear' }} />
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{Math.round(progress)}% • {video.duration}</div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handlePlay}
            style={{ width: 72, height: 72, borderRadius: '50%', background: `rgba(99,102,241,0.2)`, border: `2px solid ${courseAccent}80`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 26, margin: '0 auto 14px', transition: 'all .2s' }}
            onMouseEnter={e => e.currentTarget.style.background = `${courseAccent}35`}
            onMouseLeave={e => e.currentTarget.style.background = `rgba(99,102,241,0.2)`}>
            ▶
          </button>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{video.title}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{video.duration}</div>
          {video.preview && <div style={{ marginTop: 8, fontSize: 11, color: courseAccent, fontWeight: 700 }}>Free Preview</div>}
        </div>
      )}

      {/* Bottom bar */}
      {isCompleted && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#10b981,#34d399)' }} />
      )}
    </div>
  )
}
