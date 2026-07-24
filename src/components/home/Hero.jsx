import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Mountain, UtensilsCrossed, Users, Hotel, Music } from 'lucide-react'
import gsap from 'gsap'
import { heroCategoryPills } from '../../data/listings'

const iconMap = { Mountain, UtensilsCrossed, Users, Hotel, Music }

const headlines = [
  "Victoria Falls isn't just a view.",
  "It's a whole town.",
]

export default function Hero() {
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const pillsRef = useRef(null)
  const searchRef = useRef(null)
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

      if (searchRef.current) {
        gsap.fromTo(searchRef.current, { opacity: 0, y: 24, scale: 0.97 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 1.6, ease: 'power3.out', clearProps: 'all',
        })
      }

      if (pillsRef.current) {
        const pills = pillsRef.current.querySelectorAll('.cat-pill')
        gsap.fromTo(pills,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, delay: 2.0, ease: 'power3.out', clearProps: 'all' }
        )
      }
    }, heroRef)

    const fallback = setTimeout(() => {
      document.querySelectorAll('.hw, .cat-pill').forEach(el => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
    }, 3500)

    return () => { ctx.revert(); clearTimeout(fallback) }
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <div ref={heroRef} className="relative overflow-hidden" style={{ minHeight: '90vh' }}>
      {/* Video background */}
      <div className="absolute inset-0">
        <iframe
          src="https://www.youtube.com/embed/UZ3DV7rCCH4?autoplay=1&mute=1&loop=1&playlist=UZ3DV7rCCH4&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&vq=hd2160&quality=hd2160"
          title="Victoria Falls background"
          className="absolute top-1/2 left-1/2 w-[178%] h-[178%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          style={{ border: 'none' }}
        />
        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fafaf8] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="h-16 lg:h-[4.5rem]" />

        <div className="flex items-center justify-center px-5 sm:px-8 lg:px-12 pt-16 sm:pt-24 lg:pt-32 pb-24 sm:pb-32 lg:pb-40">
          <div className="text-center max-w-4xl">
            {/* Headline */}
            <h1 ref={headlineRef} className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-black tracking-tight text-white leading-[1.05] mb-6">
              {headlines[0].split(' ').map((word, i) => (
                <span key={i} className="hw inline-block mr-[0.28em]">{word}</span>
              ))}
              <br />
              {headlines[1].split(' ').map((word, i) => (
                <span key={i} className={`hw inline-block mr-[0.28em] ${i === 0 ? '' : 'text-[var(--color-primary-light)]'}`}>{word}</span>
              ))}
            </h1>

            {/* Subhead */}
            <p ref={subRef} className="text-base sm:text-lg text-white/60 max-w-xl mx-auto mb-12 leading-relaxed font-light">
              Rapids, rooftop bars, village classrooms. The version locals live in.
            </p>

            {/* Search bar — premium, journey-starting */}
            <div ref={searchRef} className="max-w-2xl mx-auto mb-10">
              <form onSubmit={handleSearch} className="relative">
                <div className={`flex items-center bg-white rounded-2xl p-2 transition-all duration-500 ${
                  searchFocused
                    ? 'shadow-[0_8px_40px_rgba(0,0,0,0.15)]'
                    : 'shadow-[0_4px_24px_rgba(0,0,0,0.1)]'
                }`}>
                  <div className="flex items-center gap-3 flex-1 px-4">
                    <Search className="w-5 h-5 text-[var(--color-ink-muted)]" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setSearchFocused(false)}
                      placeholder="Where do you want to start your adventure?"
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

            {/* Category pills */}
            <div ref={pillsRef} className="flex flex-wrap items-center justify-center gap-2.5">
              {heroCategoryPills.map((pill) => {
                const Icon = iconMap[pill.icon]
                return (
                  <Link
                    key={pill.slug}
                    to={pill.slug === 'adventure' ? '/adventures' : pill.slug === 'nightlife' || pill.slug === 'stay' ? `/search?pillar=${pill.slug}` : `/${pill.slug}`}
                    className="cat-pill inline-flex items-center gap-2 bg-white/8 backdrop-blur-sm border border-white/10 hover:bg-white/15 hover:border-white/20 text-white/70 hover:text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200"
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
