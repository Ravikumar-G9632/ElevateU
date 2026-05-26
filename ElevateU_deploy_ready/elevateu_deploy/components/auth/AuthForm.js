'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useApp } from '../../lib/context'
import Button from '../ui/Button'
import { registerUser, loginUser } from '../../lib/users'

function GitHubBtn() {
  const handleGitHubLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    const redirectUri = encodeURIComponent(`${base}/api/auth/callback/github`)
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=read:user,user:email`
  }
  return (
    <button onClick={handleGitHubLogin} style={{
      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 10, padding: '11px 16px', marginBottom: 10,
      background: '#24292f', border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: 14,
      cursor: 'pointer', fontFamily: 'inherit', transition: 'background 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.background = '#2f363d'}
      onMouseLeave={e => e.currentTarget.style.background = '#24292f'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
      Continue with GitHub
    </button>
  )
}

export default function AuthForm() {
  const { dispatch } = useApp()
  const router = useRouter()
  const [mode, setMode] = useState('login') // login | signup
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '', confirm: '', identifier: '' })
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const doRegister = async () => {
    setError('')
    const { name, username, email, password, confirm } = form
    if (!name.trim()) return setError('Full name is required.')
    if (!username.trim() || username.length < 3) return setError('Username must be at least 3 characters.')
    if (!/^[a-zA-Z0-9_]+$/.test(username)) return setError('Username can only contain letters, numbers and underscores.')
    if (!email.includes('@')) return setError('Enter a valid email address.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    if (password !== confirm) return setError('Passwords do not match.')

    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const result = registerUser({ name: name.trim(), username: username.trim(), email: email.trim().toLowerCase(), password })
    setLoading(false)

    if (result.error) return setError(result.error)
    setSuccess(`Account created! Your User ID is: ${result.user.id}`)
    dispatch({ type: 'LOGIN', payload: result.user })
    setTimeout(() => router.push('/dashboard'), 1200)
  }

  const doLogin = async () => {
    setError('')
    const { identifier, password } = form
    if (!identifier.trim()) return setError('Enter your email, username, or user ID.')
    if (!password) return setError('Password is required.')

    setLoading(true)
    await new Promise(r => setTimeout(r, 600))
    const result = loginUser({ identifier: identifier.trim(), password })
    setLoading(false)

    if (result.error) return setError(result.error)
    dispatch({ type: 'LOGIN', payload: result.user })
    router.push('/dashboard')
  }

  const switchMode = () => {
    setMode(m => m === 'login' ? 'signup' : 'login')
    setError(''); setSuccess('')
    setForm({ name: '', username: '', email: '', password: '', confirm: '', identifier: '' })
  }

  const inputStyle = { width: '100%', boxSizing: 'border-box' }

  return (
    <div className="fade-up">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, marginBottom: 4 }}>
          {mode === 'login' ? 'Welcome back' : 'Create your account'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          {mode === 'login' ? 'Sign in using email, username, or user ID' : 'Join 80,000+ learners worldwide'}
        </p>
      </div>

      <GitHubBtn />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>or continue with email</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {mode === 'signup' ? (
          <>
            <input className="input-field" style={inputStyle} placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)} />
            <input className="input-field" style={inputStyle} placeholder="Username (e.g. john_doe)" value={form.username} onChange={e => set('username', e.target.value)} />
            <input className="input-field" style={inputStyle} type="email" placeholder="Email address" value={form.email} onChange={e => set('email', e.target.value)} />
            <div style={{ position: 'relative' }}>
              <input className="input-field" style={{ ...inputStyle, paddingRight: 44 }} type={show ? 'text' : 'password'} placeholder="Password (min 6 chars)" value={form.password} onChange={e => set('password', e.target.value)} />
              <button type="button" onClick={() => setShow(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: 14 }}>{show ? '🙈' : '👁'}</button>
            </div>
            <input className="input-field" style={inputStyle} type={show ? 'text' : 'password'} placeholder="Confirm password" value={form.confirm} onChange={e => set('confirm', e.target.value)} />
          </>
        ) : (
          <>
            <input className="input-field" style={inputStyle} placeholder="Email, username, or user ID" value={form.identifier} onChange={e => set('identifier', e.target.value)} />
            <div style={{ position: 'relative' }}>
              <input className="input-field" style={{ ...inputStyle, paddingRight: 44 }} type={show ? 'text' : 'password'} placeholder="Password" value={form.password} onChange={e => set('password', e.target.value)}
                onKeyDown={e => e.key === 'Enter' && doLogin()} />
              <button type="button" onClick={() => setShow(s => !s)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontSize: 14 }}>{show ? '🙈' : '👁'}</button>
            </div>
          </>
        )}
      </div>

      {error && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 9, padding: '10px 14px', marginBottom: 14 }}>
          <p style={{ color: '#f87171', fontSize: 12, margin: 0 }}>⚠ {error}</p>
        </div>
      )}

      {success && (
        <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 9, padding: '10px 14px', marginBottom: 14 }}>
          <p style={{ color: '#34d399', fontSize: 12, margin: 0 }}>✓ {success}</p>
        </div>
      )}

      <Button style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: 14 }}
        onClick={mode === 'login' ? doLogin : doRegister} loading={loading}>
        {mode === 'login' ? 'Sign In →' : 'Create Account →'}
      </Button>

      {mode === 'login' && (
        <div style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)', borderRadius: 10, padding: '10px 14px', marginTop: 14 }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', margin: 0, lineHeight: 1.7 }}>
            💡 You can sign in with your <strong style={{ color: '#a78bfa' }}>email</strong>, <strong style={{ color: '#a78bfa' }}>username</strong>, or <strong style={{ color: '#a78bfa' }}>User ID</strong> (shown after registration)
          </p>
        </div>
      )}

      <p style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 18 }}>
        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
        <span style={{ color: '#a78bfa', cursor: 'pointer', fontWeight: 700 }} onClick={switchMode}>
          {mode === 'login' ? 'Sign up free' : 'Sign in'}
        </span>
      </p>
    </div>
  )
}
