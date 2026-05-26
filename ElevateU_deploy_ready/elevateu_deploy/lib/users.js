// lib/users.js
// localStorage-based user database
// Stores: { [userId]: { id, name, username, email, password, createdAt, avatar } }

const DB_KEY = 'elevateu_users'

function generateUserId() {
  return 'EU' + Math.random().toString(36).substr(2, 8).toUpperCase()
}

function getDB() {
  try {
    const raw = localStorage.getItem(DB_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch { return {} }
}

function saveDB(db) {
  try { localStorage.setItem(DB_KEY, JSON.stringify(db)) } catch {}
}

export function registerUser({ name, username, email, password }) {
  const db = getDB()

  // Check duplicates
  const all = Object.values(db)
  if (all.find(u => u.email.toLowerCase() === email.toLowerCase()))
    return { error: 'An account with this email already exists.' }
  if (all.find(u => u.username.toLowerCase() === username.toLowerCase()))
    return { error: 'Username is already taken. Choose another.' }

  const id = generateUserId()
  const user = {
    id,
    name,
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password, // plain text (client-only demo)
    createdAt: new Date().toISOString(),
    avatar: name[0].toUpperCase(),
    provider: 'email',
    bio: '',
    location: '',
  }

  db[id] = user
  saveDB(db)

  // Return safe user (no password)
  const { password: _, ...safeUser } = user
  return { user: safeUser }
}

export function loginUser({ identifier, password }) {
  const db = getDB()
  const all = Object.values(db)

  // Match by email, username, or userId
  const found = all.find(u =>
    u.email.toLowerCase() === identifier.toLowerCase() ||
    u.username.toLowerCase() === identifier.toLowerCase() ||
    u.id.toLowerCase() === identifier.toLowerCase()
  )

  if (!found) return { error: 'No account found with that email, username, or user ID.' }
  if (found.provider === 'github') return { error: 'This account uses GitHub login. Please sign in with GitHub.' }
  if (found.password !== password) return { error: 'Incorrect password. Please try again.' }

  const { password: _, ...safeUser } = found
  return { user: safeUser }
}

export function getUserByEmail(email) {
  const db = getDB()
  const found = Object.values(db).find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!found) return null
  const { password: _, ...safeUser } = found
  return safeUser
}

export function saveGithubUser({ name, email, login, avatar }) {
  const db = getDB()
  const all = Object.values(db)
  const existing = all.find(u => u.email.toLowerCase() === email.toLowerCase())

  if (existing) {
    const { password: _, ...safeUser } = existing
    return { user: safeUser }
  }

  const id = generateUserId()
  const user = {
    id,
    name,
    username: login.toLowerCase(),
    email: email.toLowerCase(),
    password: null,
    createdAt: new Date().toISOString(),
    avatar: avatar || name[0].toUpperCase(),
    provider: 'github',
    bio: '',
    location: '',
  }
  db[id] = user
  saveDB(db)
  const { password: __, ...safeUser } = user
  return { user: safeUser }
}

export function updateUser(id, updates) {
  const db = getDB()
  if (!db[id]) return { error: 'User not found.' }
  db[id] = { ...db[id], ...updates }
  saveDB(db)
  const { password: _, ...safeUser } = db[id]
  return { user: safeUser }
}
