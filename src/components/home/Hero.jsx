import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, ChevronRight, Search, MapPin, Compass, Mountain, UtensilsCrossed, Hotel, Waves } from 'lucide-react'
import gsap from 'gsap'

const taglines = [
  'Discover the Real Victoria Falls',
  'Every Street Has a Story',
  'Explore Beyond the Falls',
]

const quickCategories = [
  { title: 'Restaurants', icon: UtensilsCrossed, slug: 'restaurants', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop' },
  { title: 'Adventures', icon: Mountain, slug: 'adventures', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=500&fit=crop' },
  { title: 'Hotels & Lodges', icon: Hotel, slug: 'hotels', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=500&fit=crop' },
  { title: 'Hidden Gems', icon: Compass, slug: 'hidden-gems', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop' },
]

const searchCategories = [
  'Restaurants', 'Hotels', 'Adventures', 'Safaris', 'Rafting',
  'Helicopter Flights', 'Cultural Tours', 'Markets', 'Bars', 'Events',
]

const particles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 10,
  opacity: Math.random() * 0.3 + 0.05,
}))

export default function Hero() {
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const subtitleRef = useRef(null)
  const searchRef = useRef(null)
  const cardsRef = useRef([])
  const videoRef = useRef(null)
  const navigate = useNavigate()
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

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
      // Headline word-by-word
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.hw')
        gsap.fromTo(words,
          { opacity: 0, y: 40, rotationX: -40 },
          {
            opacity: 1, y: 0, rotationX: 0,
            duration: 0.8, stagger: 0.1, delay: 0.3, ease: 'power3.out',
          }
        )
      }

      // Subtitle
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, delay: 1.2, ease: 'power3.out',
        })
      }

      // Search bar
      if (searchRef.current) {
        gsap.fromTo(searchRef.current, { opacity: 0, y: 20, scale: 0.98 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 1.6, ease: 'power3.out',
        })
      }

      // Category cards stagger
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, delay: 2.0 + i * 0.12, ease: 'power3.out',
          }
        )
        gsap.to(card, {
          y: `+=${3 + i * 1}`,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        })
      })

      // Video slow zoom
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.1,
          duration: 30,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
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
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-emerald-600/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px]" />

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
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&h=1080&fit=crop"
        >
          <source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-victoria-falls-1584/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/70 via-[#050816]/30 to-[#050816]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/30 via-transparent to-[#050816]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 overflow-hidden">
        {/* Spacer for nav */}
        <div className="h-16 lg:h-18" />

        {/* Hero content — centered */}
        <div
          className="flex items-center justify-center px-5 sm:px-10 lg:px-14 py-14 sm:py-20 lg:py-28"
          style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
        >
          <div className="text-center max-w-5xl">
            {/* Rotating tagline badge */}
            <div className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] rounded-full px-4 py-1.5 mb-6">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-medium text-white/70">{taglines[taglineIndex]}</span>
            </div>

            <h1 ref={headlineRef} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-5 sm:mb-6" style={{ perspective: '600px' }}>
              {'Discover the Real'.split(' ').map((word, i) => (
                <span key={i} className="hw inline-block mr-[0.3em]">{word}</span>
              ))}
              <span className="hw inline-block mr-[0.3em] text-emerald-400">Victoria</span>
              <span className="hw inline-block mr-[0.3em] text-emerald-400">Falls</span>
            </h1>

            <p ref={subtitleRef} className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              From world-class adventures and luxury lodges to hidden gems and authentic cultural experiences — Local Vic Falls connects you with the best of Victoria Falls.
            </p>

            {/* Animated search bar */}
            <div ref={searchRef} className="max-w-2xl mx-auto mb-8">
              <form onSubmit={handleSearch} className="relative">
                <div className="flex items-center bg-white/[0.08] backdrop-blur-xl border border-white/[0.12] rounded-2xl p-1.5 hover:bg-white/[0.1] hover:border-white/[0.18] transition-all duration-300 shadow-2xl shadow-black/20">
                  <div className="flex items-center gap-2 flex-1 px-4">
                    <Search className="w-5 h-5 text-white/40" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search restaurants, adventures, hotels, experiences..."
                      className="flex-1 bg-transparent border-none outline-none text-white placeholder-white/40 text-sm sm:text-base py-3"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold text-sm hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-lg shadow-emerald-500/20 shrink-0"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* Quick search suggestions */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                <span className="text-xs text-white/30">Popular:</span>
                {searchCategories.slice(0, 5).map((cat) => (
                  <Link
                    key={cat}
                    to={`/search?q=${encodeURIComponent(cat)}`}
                    className="text-xs text-white/50 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] px-3 py-1 rounded-full transition-all duration-200 border border-white/[0.06] hover:border-white/[0.12]"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick category cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
              {quickCategories.map((card, i) => (
                <Link
                  key={card.title}
                  to={`/category/${card.slug}`}
                  ref={(el) => { cardsRef.current[i] = el }}
                  className="group relative h-36 sm:h-44 rounded-2xl overflow-hidden border border-white/[0.08] cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-emerald-600/0 group-hover:bg-emerald-600/10 transition-colors duration-500" />
                  <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-emerald-400/30 transition-colors duration-500 shadow-[0_0_0_rgba(16,185,129,0)] group-hover:shadow-[0_8px_40px_rgba(16,185,129,0.15)]" />

                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <div className="flex items-center gap-2 mb-1">
                      <card.icon className="w-4 h-4 text-emerald-400" />
                      <h3 className="text-white font-bold text-lg">{card.title}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Explore
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
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
