import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Compass, Mountain, UtensilsCrossed, Users, Hotel, Music } from 'lucide-react'
import gsap from 'gsap'
import { heroCategoryPills } from '../../data/listings'

const iconMap = { Mountain, UtensilsCrossed, Users, Hotel, Music }

const headlines = [
  "Victoria Falls isn't just a view.",
  "It's a whole town.",
]

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 10,
  opacity: Math.random() * 0.25 + 0.05,
}))

export default function Hero() {
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const pillsRef = useRef(null)
  const searchRef = useRef(null)
  const videoRef = useRef(null)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline word-by-word spring reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.hw')
        gsap.fromTo(words,
          { opacity: 0, y: 40, rotationX: -40 },
          { opacity: 1, y: 0, rotationX: 0, duration: 0.8, stagger: 0.1, delay: 0.3, ease: 'power3.out' }
        )
      }

      // Subhead
      if (subRef.current) {
        gsap.fromTo(subRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, delay: 1.0, ease: 'power3.out',
        })
      }

      // Category pills
      if (pillsRef.current) {
        const pills = pillsRef.current.querySelectorAll('.cat-pill')
        gsap.fromTo(pills,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, delay: 1.4, ease: 'power3.out' }
        )
      }

      // Search bar
      if (searchRef.current) {
        gsap.fromTo(searchRef.current, { opacity: 0, y: 20, scale: 0.98 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 1.8, ease: 'power3.out',
        })
      }

      // Video slow zoom
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.1, duration: 30, repeat: -1, yoyo: true, ease: 'sine.inOut',
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div ref={heroRef} className="relative bg-[#050816] overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-teal-600/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px]" />

        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `float-particle ${p.duration}s ${p.delay}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Video background — full bleed */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay loop muted playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&h=1080&fit=crop"
        >
          <source src="https://videos.pexels.com/video-files/16680514/16680514-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/75 via-[#050816]/30 to-[#050816]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/30 via-transparent to-[#050816]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 overflow-hidden">
        <div className="h-16 lg:h-18" />

        <div
          className="flex items-center justify-center px-5 sm:px-10 lg:px-14 py-14 sm:py-20 lg:py-28"
          style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
        >
          <div className="text-center max-w-4xl">
            {/* Headline — bold, opinionated */}
            <h1 ref={headlineRef} className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-black tracking-tight text-white leading-[1.05] mb-6" style={{ perspective: '600px' }}>
              {headlines[0].split(' ').map((word, i) => (
                <span key={i} className="hw inline-block mr-[0.25em]">{word}</span>
              ))}
              <br />
              {headlines[1].split(' ').map((word, i) => (
                <span key={i} className={`hw inline-block mr-[0.25em] ${i === 0 ? '' : 'text-teal-400'}`}>{word}</span>
              ))}
            </h1>

            {/* Subhead — specific, not abstract */}
            <p ref={subRef} className="text-base sm:text-lg text-white/65 max-w-2xl mx-auto mb-10 leading-relaxed">
              Grade 5 rapids on the Zambezi. Oxtail at a rooftop bar. A village classroom 20 minutes out. This is the version of Victoria Falls locals actually live in.
            </p>

            {/* Search bar */}
            <div ref={searchRef} className="max-w-xl mx-auto mb-8">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-1.5 hover:bg-white/[0.1] hover:border-white/[0.18] transition-all duration-300 shadow-2xl shadow-black/20">
                  <div className="flex items-center gap-2 flex-1 px-4">
                    <Search className="w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="What are you looking for?"
                      className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-sm sm:text-base py-3"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold text-sm hover:from-teal-400 hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-teal-500/20 shrink-0"
                  >
                    Explore
                  </button>
                </div>
              </form>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
              <Link
                to="#categories"
                className="magnetic-btn inline-flex items-center gap-2 bg-white text-[#050816] px-7 py-3 rounded-full text-sm font-semibold hover:bg-white/90 transition-colors duration-200"
              >
                Explore what's on
              </Link>
              <Link
                to="#build-your-day"
                className="magnetic-btn inline-flex items-center gap-2 text-sm font-medium text-white/70 px-7 py-3 border border-white/15 rounded-full hover:border-white/30 hover:text-white transition-colors duration-200"
              >
                Plan your day
              </Link>
            </div>

            {/* Category pills strip */}
            <div ref={pillsRef} className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {heroCategoryPills.map((pill) => {
                const Icon = iconMap[pill.icon]
                return (
                  <Link
                    key={pill.slug}
                    to={`/search?pillar=${pill.slug}`}
                    className="cat-pill inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] hover:bg-white/[0.12] hover:border-white/[0.2] text-white/70 hover:text-white px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300"
                  >
                    {Icon && <Icon className="w-3.5 h-3.5" />}
                    {pill.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(-30px) translateX(8px); }
        }
      `}</style>
    </div>
  )
}
