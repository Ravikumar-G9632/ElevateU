'use client'
import { createContext, useContext, useReducer, useEffect } from 'react'
import { generateCertId } from './data'

const AppContext = createContext(null)

const initialState = {
  user: null,
  enrolled: {},
  notifications: [],
  searchQuery: '',
  bookmarks: [],      // [courseId]
  streak: 0,          // days
  lastActiveDate: null,
  xp: 0,              // experience points
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload }

    case 'UPDATE_USER':
      return { ...state, user: { ...state.user, ...action.payload } }

    case 'LOGOUT':
      return { ...initialState }

    case 'ENROLL': {
      const { courseId, totalLessons } = action.payload
      if (state.enrolled[courseId]) return state
      return {
        ...state,
        enrolled: {
          ...state.enrolled,
          [courseId]: {
            progress: new Array(totalLessons).fill(false),
            certId: null,
            enrolledAt: new Date().toISOString(),
            lastWatched: 0,
            totalLessons,
          },
        },
        xp: state.xp + 50,
        notifications: [
          { id: Date.now(), type: 'success', message: '🎉 Course enrolled! +50 XP', ts: Date.now() },
          ...state.notifications,
        ],
      }
    }

    case 'MARK_LESSON': {
      const { courseId, lessonIdx } = action.payload
      const course = state.enrolled[courseId]
      if (!course) return state
      const newProgress = [...course.progress]
      if (newProgress[lessonIdx]) return state // already marked
      newProgress[lessonIdx] = true
      const allDone = newProgress.every(Boolean)
      const certId = allDone && !course.certId ? generateCertId() : course.certId
      const notifs = [...state.notifications]
      const xpGain = allDone && !course.certId ? 500 : 20
      if (allDone && !course.certId) {
        notifs.unshift({ id: Date.now(), type: 'cert', message: '🏆 Certificate unlocked! +500 XP', ts: Date.now() })
      }

      // Streak logic
      const today = new Date().toDateString()
      const wasActiveToday = state.lastActiveDate === today
      const yesterday = new Date(Date.now() - 86400000).toDateString()
      const wasActiveYesterday = state.lastActiveDate === yesterday
      const newStreak = wasActiveToday ? state.streak : wasActiveYesterday ? state.streak + 1 : 1

      return {
        ...state,
        enrolled: {
          ...state.enrolled,
          [courseId]: { ...course, progress: newProgress, certId, lastWatched: lessonIdx },
        },
        notifications: notifs,
        xp: state.xp + xpGain,
        streak: newStreak,
        lastActiveDate: today,
      }
    }

    case 'SET_LAST_WATCHED': {
      const { courseId, lessonIdx } = action.payload
      const course = state.enrolled[courseId]
      if (!course) return state
      return {
        ...state,
        enrolled: { ...state.enrolled, [courseId]: { ...course, lastWatched: lessonIdx } },
      }
    }

    case 'TOGGLE_BOOKMARK': {
      const { courseId } = action.payload
      const already = state.bookmarks.includes(courseId)
      return {
        ...state,
        bookmarks: already ? state.bookmarks.filter(id => id !== courseId) : [...state.bookmarks, courseId],
        notifications: already ? state.notifications : [
          { id: Date.now(), type: 'success', message: '🔖 Course bookmarked!', ts: Date.now() },
          ...state.notifications,
        ],
      }
    }

    case 'DISMISS_NOTIFICATION':
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.payload) }

    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload }

    case 'HYDRATE':
      return { ...state, ...action.payload }

    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('elevateu_state')
      if (saved) {
        const parsed = JSON.parse(saved)
        dispatch({ type: 'HYDRATE', payload: parsed })
      }
    } catch {}
  }, [])

  useEffect(() => {
    try {
      const { user, enrolled, bookmarks, streak, lastActiveDate, xp } = state
      localStorage.setItem('elevateu_state', JSON.stringify({ user, enrolled, bookmarks, streak, lastActiveDate, xp }))
    } catch {}
  }, [state.user, state.enrolled, state.bookmarks, state.streak, state.lastActiveDate, state.xp])

  const getProgress = (courseId) => {
    const c = state.enrolled[courseId]
    if (!c) return 0
    const done = c.progress.filter(Boolean).length
    return Math.round((done / c.totalLessons) * 100)
  }

  const isComplete = (courseId) => getProgress(courseId) === 100
  const isEnrolled = (courseId) => !!state.enrolled[courseId]
  const isBookmarked = (courseId) => state.bookmarks.includes(courseId)
  const totalCerts = Object.keys(state.enrolled).filter(id => isComplete(id)).length
  const totalStudyHours = Object.values(state.enrolled).reduce((acc, c) => {
    return acc + c.progress.filter(Boolean).length * 0.5
  }, 0)

  // XP level system
  const level = Math.floor(state.xp / 200) + 1
  const xpToNextLevel = 200 - (state.xp % 200)

  return (
    <AppContext.Provider value={{
      state, dispatch,
      getProgress, isComplete, isEnrolled, isBookmarked,
      totalCerts, totalStudyHours,
      level, xpToNextLevel,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
