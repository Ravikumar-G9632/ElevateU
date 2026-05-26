'use client'
import { useApp } from '../../lib/context'
import { useEffect } from 'react'

export function Toaster() {
  const { state, dispatch } = useApp()
  const { notifications } = state

  useEffect(() => {
    if (notifications.length === 0) return
    const latest = notifications[0]
    const timer = setTimeout(() => {
      dispatch({ type: 'DISMISS_NOTIFICATION', payload: latest.id })
    }, 4000)
    return () => clearTimeout(timer)
  }, [notifications])

  if (notifications.length === 0) return null
  const n = notifications[0]

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, animation: 'fadeUp 0.3s ease' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        background: n.type === 'cert' ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.15)',
        border: `1px solid ${n.type === 'cert' ? 'rgba(16,185,129,0.4)' : 'rgba(99,102,241,0.4)'}`,
        borderRadius: 12, padding: '14px 18px', backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)', maxWidth: 320, color: '#fff', fontSize: 14, fontWeight: 600,
      }}>
        <span>{n.message}</span>
        <button onClick={() => dispatch({ type: 'DISMISS_NOTIFICATION', payload: n.id })}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: 16, lineHeight: 1, padding: 0 }}>✕</button>
      </div>
    </div>
  )
}
