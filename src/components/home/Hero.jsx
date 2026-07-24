import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Mountain, UtensilsCrossed, Users, Hotel, Music, Sun } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { heroCategoryPills } from '../../data/listings'

gsap.registerPlugin(ScrollTrigger)

const iconMap = { Mountain, UtensilsCrossed, Users, Hotel, Music }

const headlines = [
  "Victoria Falls isn't just a view.",
  "It's a whole town.",
]

const hostAvatars = [
  { name: 'Tendai', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=80' },
  { name: 'Nomsa', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=80' },
  { name: 'Grace', src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&q=80' },
]

export default function Hero() {
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const proofRef = useRef(null)
  const pillsRef = useRef(null)
  const searchRef = useRef(null)
  const localRef = useRef(null)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.hw')
        gsap.fromTo(words,
          { opacity: 0, y: 50, rotationX: -30 },
          { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.12, delay: 0.4, ease: 'power3.out', clearProps: 'all' }
        )
      }

      if (subRef.current) {
        gsap.fromTo(subRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.9, delay: 1.2, ease: 'power3.out', clearProps: 'all',
        })
      }

      if (proofRef.current) {
        gsap.fromTo(proofRef.current, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: 'power3.out', clearProps: 'all',
        })
      }

      if (searchRef.current) {
        gsap.fromTo(searchRef.current, { opacity: 0, y: 24, scale: 0.97 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 1.8, ease: 'power3.out', clearProps: 'all',
        })
      }

      if (localRef.current) {
        gsap.fromTo(localRef.current, { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.7, delay: 2.2, ease: 'power3.out', clearProps: 'all',
        })
      }

      if (pillsRef.current) {
        const pills = pillsRef.current.querySelectorAll('.cat-pill')
        gsap.set(pills, { opacity: 0, y: 20 })

        ScrollTrigger.create({
          trigger: pillsRef.current,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(pills, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: 'power3.out',
              clearProps: 'all',
            })
          },
        })
      }
    }, heroRef)

    const fallback = setTimeout(() => {
      document.querySelectorAll('.hw, .cat-pill').forEach(el => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
    }, 4000)

    return () => { ctx.revert(); clearTimeout(fallback) }
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div ref={heroRef} className="relative overflow-hidden" style={{ minHeight: '100vh' }}>
      {/* Full-bleed cinematic background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1577401239170-897c650e4929?w=1920&q=90&auto=format&fit=crop"
          alt="Victoria Falls aerial view"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#faf8f5] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="h-16 lg:h-[4.5rem]" />

        <div className="flex items-center justify-center px-5 sm:px-8 lg:px-12 pt-20 sm:pt-28 lg:pt-36 pb-28 sm:pb-36 lg:pb-44">
          <div className="text-center max-w-4xl">
            {/* Headline */}
            <h1 ref={headlineRef} className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-black tracking-tight text-white leading-[1.05] mb-6">
              {headlines[0].split(' ').map((word, i) => (
                <span key={i} className="hw inline-block mr-[0.28em]">{word}</span>
              ))}
              <br />
              {headlines[1].split(' ').map((word, i) => (
                <span key={i} className={`hw inline-block mr-[0.28em] ${i === 0 ? '' : 'text-[var(--color-accent-light)]'}`}>{word}</span>
              ))}
            </h1>

            {/* Subhead */}
            <p ref={subRef} className="text-base sm:text-lg text-white/65 max-w-xl mx-auto mb-3 leading-relaxed font-light">
              Rapids, rooftop bars, village classrooms. The version locals live in.
            </p>

            {/* Proof point */}
            <div ref={proofRef} className="flex items-center justify-center gap-2 text-sm text-white/45 mb-10 font-light">
              <span>34 experiences</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>6 local guides</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>1 town</span>
            </div>

            {/* Search bar — premium, journey-starting */}
            <div ref={searchRef} className="max-w-2xl mx-auto mb-5">
              <form onSubmit={handleSearch} className="relative">
                <div className={`flex items-center bg-white rounded-2xl p-2 transition-all duration-500 ${
                  searchFocused
                    ? 'shadow-[0_8px_40px_rgba(0,0,0,0.18)]'
                    : 'shadow-[0_4px_24px_rgba(0,0,0,0.12)]'
                }`}>
                  <div className="flex items-center gap-3 flex-1 px-4">
                    <Search className="w-5 h-5 text-[var(--color-ink-muted)]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                      placeholder="Bungee at dawn? Sunset cruise? We've got both."
                      className="flex-1 bg-transparent border-none outline-none text-[var(--color-ink)] placeholder-[var(--color-ink-muted)] text-sm sm:text-base py-3"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-[var(--color-primary)] text-white px-7 sm:px-8 py-3 rounded-xl font-semibold text-sm hover:bg-[var(--color-primary-dark)] transition-all duration-200 shrink-0 flex items-center gap-2"
                  >
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Curated by locals — human element */}
            <div ref={localRef} className="flex items-center justify-center gap-3 mb-10">
              <div className="flex -space-x-2">
                {hostAvatars.map((host) => (
                  <img
                    key={host.name}
                    src={host.src}
                    alt={host.name}
                    className="w-7 h-7 rounded-full border-2 border-white/80 object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
              <span className="text-xs text-white/50 font-light">
                Curated by locals who actually live here
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                to="#categories"
                className="inline-flex items-center gap-2 bg-white text-[var(--color-ink)] px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-[var(--color-surface)] transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Explore what's on
              </Link>
              <Link
                to="/plan-your-day"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/70 px-8 py-3.5 border border-white/20 rounded-xl hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                Plan your day
              </Link>
            </div>

            {/* Local detail callout — hyper-specific */}
            <div className="flex items-center justify-center gap-2 mb-8 text-xs text-white/40 font-light">
              <Sun className="w-3.5 h-3.5 text-[var(--color-accent-light)]/60" />
              <span>
                Best sunset right now: the Lookout Café, 5:45 PM — grab a Zambezi lager and watch the gorge glow.
              </span>
            </div>

            {/* Category pills — scroll-triggered staggered animation */}
            <div ref={pillsRef} className="flex flex-wrap items-center justify-center gap-2.5">
              {heroCategoryPills.map((pill) => {
                const Icon = iconMap[pill.icon]
                return (
                  <Link
                    key={pill.slug}
                    to={pill.slug === 'adventure' ? '/adventures' : pill.slug === 'nightlife' || pill.slug === 'stay' ? `/search?pillar=${pill.slug}` : `/${pill.slug}`}
                    className="cat-pill inline-flex items-center gap-2 bg-black/25 backdrop-blur-md border border-white/15 hover:bg-black/35 hover:border-white/25 text-white/80 hover:text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200"
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {pill.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
