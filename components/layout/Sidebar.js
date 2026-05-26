'use client'
import { useApp } from '../../lib/context'
import { useRouter, usePathname } from 'next/navigation'

const NAV = [
  { icon: '⊞', label: 'Dashboard', href: '/dashboard' },
  { icon: '📚', label: 'My Courses', href: '/dashboard/courses' },
  { icon: '🔖', label: 'Bookmarks', href: '/dashboard/bookmarks' },
  { icon: '🏆', label: 'Certificates', href: '/dashboard/certificates' },
  { icon: '📊', label: 'Progress', href: '/dashboard/progress' },
  { icon: '👤', label: 'Profile', href: '/dashboard/profile' },
  { icon: '⚙️', label: 'Settings', href: '/dashboard/settings' },
]

export default function Sidebar() {
  const { state, dispatch, totalCerts, level } = useApp()
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    router.push('/')
  }

  return (
    <aside style={{
      width: 228, flexShrink: 0, background: 'rgba(255,255,255,0.02)',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      display: 'flex', flexDirection: 'column', padding: '20px 12px',
      gap: 2, minHeight: '100vh', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto',
    }}>
      {/* Logo */}
      <div onClick={() => router.push('/')} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '6px 8px', marginBottom: 20, cursor: 'pointer' }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>🎓</div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, background: 'linear-gradient(135deg,#a78bfa,#fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ElevateU</span>
      </div>

      {/* Nav items */}
      {NAV.map(item => {
        const active = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href))
        return (
          <button key={item.href} className={`sidebar-item ${active ? 'active' : ''}`} onClick={() => router.push(item.href)}>
            <span className="icon">{item.icon}</span>
            {item.label}
            {item.label === 'Certificates' && totalCerts > 0 && (
              <span style={{ marginLeft: 'auto', background: 'rgba(99,102,241,0.25)', color: '#a78bfa', fontSize: 10, fontWeight: 800, padding: '1px 7px', borderRadius: 999 }}>{totalCerts}</span>
            )}
          </button>
        )
      })}

      {/* Bottom - user */}
      <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        {/* XP mini bar */}
        <div style={{ padding: '8px 10px', marginBottom: 6 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 10, color: '#a78bfa', fontWeight: 700 }}>⚡ {state.xp} XP</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>Lv {level}</span>
          </div>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${Math.round(((200 - ((200 - (state.xp % 200)) || 200)) / 200) * 100)}%`, background: 'linear-gradient(90deg,#6366f1,#a78bfa)', borderRadius: 999 }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px', marginBottom: 6 }}>
          {state.user?.avatar && state.user.avatar.startsWith('http') ? (
            <img src={state.user.avatar} alt="avatar" style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
          ) : (
            <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
              {state.user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{state.user?.name}</div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>@{state.user?.username || state.user?.email?.split('@')[0]}</div>
          </div>
        </div>
        <button className="sidebar-item" onClick={handleLogout} style={{ color: 'rgba(255,100,100,0.6)' }}>
          <span className="icon">→</span> Sign out
        </button>
      </div>
    </aside>
  )
}
