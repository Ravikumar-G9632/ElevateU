'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '../../../lib/context'
import DashboardShell from '../../../components/layout/DashboardShell'

const SETTING_SECTIONS = [
  {
    title: 'Notifications',
    items: [
      { key: 'email_reminders', label: 'Email learning reminders', desc: 'Get daily nudges to keep your streak alive', default: true },
      { key: 'cert_alerts', label: 'Certificate alerts', desc: 'Notify when a certificate is ready to download', default: true },
      { key: 'new_courses', label: 'New course announcements', desc: 'Be first to know about new domains', default: false },
    ],
  },
  {
    title: 'Learning Preferences',
    items: [
      { key: 'autoplay', label: 'Autoplay next lesson', desc: 'Automatically load the next video when one ends', default: true },
      { key: 'captions', label: 'Show captions by default', desc: 'Enable subtitles on all video lessons', default: false },
      { key: 'hd_video', label: 'Prefer HD quality', desc: 'Play videos at highest available resolution', default: true },
    ],
  },
  {
    title: 'Privacy',
    items: [
      { key: 'public_profile', label: 'Public profile', desc: 'Allow others to see your certificates and progress', default: false },
      { key: 'activity_data', label: 'Share anonymised activity data', desc: 'Help us improve the platform', default: true },
    ],
  },
]

export default function SettingsPage() {
  const { state } = useApp()
  const router = useRouter()
  const [settings, setSettings] = useState(() => {
    const defaults = {}
    SETTING_SECTIONS.forEach(s => s.items.forEach(i => { defaults[i.key] = i.default }))
    return defaults
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => { if (!state.user) router.replace('/auth') }, [state.user])
  if (!state.user) return null

  const toggle = (key) => setSettings(p => ({ ...p, [key]: !p[key] }))

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <DashboardShell title="Settings" subtitle="Customise your ElevateU experience">
      <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 20 }}>
        {SETTING_SECTIONS.map(section => (
          <div key={section.title} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 18, overflow: 'hidden' }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14 }}>{section.title}</div>
            </div>
            {section.items.map((item, i) => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', borderBottom: i < section.items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : '' }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>{item.desc}</div>
                </div>
                {/* Toggle */}
                <div onClick={() => toggle(item.key)} style={{ width: 44, height: 24, borderRadius: 999, background: settings[item.key] ? '#6366f1' : 'rgba(255,255,255,0.12)', cursor: 'pointer', position: 'relative', transition: 'background .2s', flexShrink: 0 }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: settings[item.key] ? 23 : 3, transition: 'left .2s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
                </div>
              </div>
            ))}
          </div>
        ))}

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-primary" style={{ borderRadius: 10 }} onClick={handleSave}>
            {saved ? '✓ Saved!' : 'Save Settings'}
          </button>
          <button className="btn btn-ghost" style={{ borderRadius: 10 }}>Reset to defaults</button>
        </div>
      </div>
    </DashboardShell>
  )
}
