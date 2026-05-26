'use client'
import { clsx } from 'clsx'

export default function Button({ children, variant = 'primary', size = 'md', pill = false, className = '', loading = false, ...props }) {
  const base = 'btn'
  const variants = {
    primary: 'btn-primary',
    ghost: 'btn-ghost',
    danger: 'bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20',
    success: 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20',
  }
  const sizes = {
    sm: 'text-xs px-3 py-2 gap-1',
    md: '',
    lg: 'text-base px-6 py-3',
  }
  return (
    <button
      className={clsx(base, variants[variant], sizes[size], pill && 'btn-pill', 'select-none', className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <Spinner /> : null}
      {children}
    </button>
  )
}

function Spinner() {
  return (
    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity=".25" />
      <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
