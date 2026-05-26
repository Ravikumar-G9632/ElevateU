import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/auth?error=no_code', request.url))
  }

  try {
    // Exchange code for access token
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    })

    const tokenData = await tokenRes.json()

    if (tokenData.error || !tokenData.access_token) {
      return NextResponse.redirect(new URL('/auth?error=token_failed', request.url))
    }

    // Fetch GitHub user profile
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: 'application/json',
      },
    })

    const githubUser = await userRes.json()

    // Build user object and pass to client via query params
    const user = {
      name: githubUser.name || githubUser.login,
      email: githubUser.email || `${githubUser.login}@github.com`,
      avatar: githubUser.avatar_url,
      login: githubUser.login,
      provider: 'github',
    }

    // Redirect to dashboard with user info encoded
    const encoded = encodeURIComponent(JSON.stringify(user))
    return NextResponse.redirect(new URL(`/auth/github-success?user=${encoded}`, request.url))

  } catch (err) {
    console.error('GitHub OAuth error:', err)
    return NextResponse.redirect(new URL('/auth?error=server_error', request.url))
  }
}
