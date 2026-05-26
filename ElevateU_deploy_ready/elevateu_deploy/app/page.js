import Navbar from '../components/landing/Navbar'
import HeroSection from '../components/landing/HeroSection'
import { TestimonialsSection, FAQSection, CertificateBanner } from '../components/landing/Sections'

export default function HomePage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: '#fff' }}>
      <Navbar />
      <HeroSection />
      <TestimonialsSection />
      <CertificateBanner />
      <FAQSection />
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '28px 5%', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
          <div style={{ width: 24, height: 24, borderRadius: 7, background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>🎓</div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, background: 'linear-gradient(135deg,#a78bfa,#fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ElevateU</span>
        </div>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>© 2025 ElevateU. Built for learners who mean business.</p>
      </footer>
    </div>
  )
}
