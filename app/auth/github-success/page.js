'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useApp } from '../../../lib/context'
import { saveGithubUser } from '../../../lib/users'

export default function GitHubSuccess() {
  const { dispatch } = useApp()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const userParam = searchParams.get('user')
    const error = searchParams.get('error')

    if (error || !userParam) {
      router.replace('/auth?error=' + (error || 'unknown'))
      return
    }

    try {
      const githubUser = JSON.parse(decodeURIComponent(userParam))
      // Save or retrieve from user DB
      const result = saveGithubUser(githubUser)
      if (result.user) {
        dispatch({ type: 'LOGIN', payload: result.user })
        router.replace('/dashboard')
      } else {
        router.replace('/auth?error=github_failed')
      }
    } catch {
      router.replace('/auth?error=parse_failed')
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⏳</div>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18 }}>Signing you in with GitHub...</p>
      </div>
    </div>
  )
}
