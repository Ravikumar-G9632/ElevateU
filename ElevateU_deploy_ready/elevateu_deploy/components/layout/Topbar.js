'use client'
import { useApp } from '../../lib/context'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Topbar({ title, subtitle }) {
  const { state, dispatch } = useApp()
  const router = useRouter()
  const [search, setSearch] = useState('')

  const handleSearch = (e) => {
    setSearch(e.target.value)
    dispatch({ type: 'SET_SEARCH', payload: e.target.value })
  }

  return (
    <header style={{
      height: 60, borderBottom: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', gap: 20, flexShrink: 0,
      background: 'rgba(13,13,20,0.8)', backdropFilter: 'blur(12px)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div>
        {title && <h2 style={{ fontSize: 16, fontWeight: 800, fontFamily: 'var(--font-display)', color: '#fff', lineHeight: 1.2 }}>{title}</h2>}
        {subtitle && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>{subtitle}</p>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Search */}
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: 'rgba(255,255,255,0.25)', pointerEvents: 'none' }}>🔍</span>
          <input
            className="input-field"
            style={{ width: 200, paddingLeft: 30, paddingTop: 8, paddingBottom: 8, fontSize: 13 }}
            placeholder="Search courses..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        {/* Notifications bell */}
        <button
          onClick={() => router.push('/dashboard')}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 9, width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: 15 }}>
          🔔
        </button>

        {/* Avatar */}
        <div onClick={() => router.push('/dashboard/profile')} style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, cursor: 'pointer', flexShrink: 0 }}>
          {state.user?.name?.[0]?.toUpperCase() || 'U'}
        </div>
      </div>
    </header>
  )
}
