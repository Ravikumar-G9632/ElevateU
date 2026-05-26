'use client'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const DATA = [
  { day: 'Mon', lessons: 2 }, { day: 'Tue', lessons: 4 }, { day: 'Wed', lessons: 1 },
  { day: 'Thu', lessons: 6 }, { day: 'Fri', lessons: 3 }, { day: 'Sat', lessons: 7 }, { day: 'Sun', lessons: 5 },
]

export default function ActivityChart() {
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '20px 22px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15 }}>Weekly Activity</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>Lessons completed this week</div>
        </div>
        <span style={{ fontSize: 22, fontFamily: 'var(--font-display)', fontWeight: 800, color: '#a78bfa' }}>28</span>
      </div>
      <ResponsiveContainer width="100%" height={100}>
        <AreaChart data={DATA} margin={{ top: 4, right: 0, left: -36, bottom: 0 }}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: '#1e1e35', border: '1px solid rgba(99,102,241,0.3)', borderRadius: 8, fontSize: 12 }} labelStyle={{ color: '#fff' }} itemStyle={{ color: '#a78bfa' }} />
          <Area type="monotone" dataKey="lessons" stroke="#6366f1" strokeWidth={2} fill="url(#grad)" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
