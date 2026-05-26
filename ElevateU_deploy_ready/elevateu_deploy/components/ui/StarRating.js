'use client'
export default function StarRating({ rating = 5, size = 13 }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5
  return (
    <span style={{ display: 'inline-flex', gap: 1 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= full ? '#fbbf24' : half && i === full + 1 ? '#fbbf24' : 'rgba(255,255,255,0.15)' }}>
          {i <= full ? '★' : half && i === full + 1 ? '★' : '☆'}
        </span>
      ))}
    </span>
  )
}
