import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Minus, Plus, ChevronDown, Calendar, Users, Compass } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ExperienceCard from '../ui/ExperienceCard'

gsap.registerPlugin(ScrollTrigger)

const experienceOptions = ['Adventure', 'Culture', 'Eat & Drink', 'Nightlife', 'Stay']

const stats = [
  { number: '40+', label: 'Local Guides' },
  { number: '127+', label: 'Experiences' },
  { number: '15k+', label: 'Travelers Hosted' },
]

const featuredExperiences = [
  {
    id: 'feat-1',
    title: 'Sunset Cruise',
    category: 'Adventure · Zambezi River',
    price: 'from $59',
    duration: '2–3 hrs',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop&q=80',
    slug: 'sunset-cruise',
  },
  {
    id: 'feat-2',
    title: 'Village Cultural Tour',
    category: 'Culture · Monde Village',
    price: 'from $40',
    duration: 'Half day',
    image: 'https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=600&h=400&fit=crop&q=80',
    slug: 'monde-village',
  },
  {
    id: 'feat-3',
    title: 'The Lookout Cafe',
    category: 'Rooftop · Batoka Gorge',
    price: '$10–$35',
    duration: 'All day',
    image: 'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&h=400&fit=crop&q=80',
    slug: 'lookout-cafe',
  },
]

export default function Hero() {
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const subRef = useRef(null)
  const searchRef = useRef(null)
  const statsRef = useRef(null)
  const cardsRowRef = useRef(null)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  const [selectedExperience, setSelectedExperience] = useState('')
  const [showExpDropdown, setShowExpDropdown] = useState(false)
  const [guestCount, setGuestCount] = useState(2)
  const [searchDate, setSearchDate] = useState('')

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowExpDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.hw')
        gsap.fromTo(words,
          { opacity: 0, y: 50, rotationX: -30 },
          { opacity: 1, y: 0, rotationX: 0, duration: 1, stagger: 0.1, delay: 0.3, ease: 'power3.out', clearProps: 'all' }
        )
      }

      if (subRef.current) {
        gsap.fromTo(subRef.current, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.8, delay: 1.0, ease: 'power3.out', clearProps: 'all',
        })
      }

      if (searchRef.current) {
        gsap.fromTo(searchRef.current, { opacity: 0, y: 30, scale: 0.97 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 1.5, ease: 'power3.out', clearProps: 'all',
        })
      }

      if (statsRef.current) {
        gsap.fromTo(statsRef.current.children, { opacity: 0, y: 16 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 1.7, ease: 'power3.out', clearProps: 'all',
        })
      }

      if (cardsRowRef.current) {
        const cards = cardsRowRef.current.querySelectorAll('.exp-card')
        gsap.fromTo(cards,
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, delay: 2.1, ease: 'power3.out', clearProps: 'all' }
        )
      }
    }, heroRef)

    const fallback = setTimeout(() => {
      document.querySelectorAll('.hw').forEach(el => {
        el.style.opacity = '1'
        el.style.transform = 'none'
      })
    }, 4000)

    return () => { ctx.revert(); clearTimeout(fallback) }
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (selectedExperience) params.set('q', selectedExperience)
    if (searchDate) params.set('date', searchDate)
    if (guestCount > 1) params.set('guests', guestCount.toString())
    navigate(`/search?${params.toString()}`)
  }

  return (
    <div ref={heroRef} className="relative" style={{ minHeight: '75vh' }}>
      {/* ── Background ─────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src="https://www.youtube.com/embed/UZ3DV7rCCH4?autoplay=1&mute=1&loop=1&playlist=UZ3DV7rCCH4&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1&vq=hd2160&quality=hd2160"
          title="Victoria Falls background"
          className="absolute top-1/2 left-1/2 w-[178%] h-[178%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          allow="autoplay; encrypted-media"
          allowFullScreen={false}
          style={{ border: 'none' }}
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/15" />
      </div>

      {/* Bottom fade into page background — tall enough to sit behind the cards */}
      <div className="absolute bottom-0 left-0 right-0 h-[30vh] sm:h-[35vh] bg-gradient-to-t from-[#faf8f5] via-[#faf8f5]/50 to-transparent z-[1]" />

      {/* ── Content ────────────────────────────────────────────────────────── */}
      <div className="relative z-10 min-h-[75vh] flex flex-col">
        {/* Nav spacer */}
        <div className="h-16 lg:h-[4.5rem]" />

        <div className="flex-1 flex flex-col px-6 sm:px-8 lg:px-12 xl:px-16 pt-10 sm:pt-14 lg:pt-20 pb-8 sm:pb-12 lg:pb-16">

          {/* ── Headline — centered ──────────────────────────────────────── */}
          <div className="max-w-3xl mx-auto text-center">
            <h1
              ref={headlineRef}
              className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.5rem] font-black tracking-tight text-white leading-[1.02] mb-5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {"Victoria Falls".split(' ').map((word, i) => (
                <span key={i} className="hw inline-block mr-[0.28em]">{word}</span>
              ))}
              <br className="hidden sm:block" />
              {"Isn't Just a View.".split(' ').map((word, i) => (
                <span key={`b-${i}`} className="hw inline-block mr-[0.28em]">{word}</span>
              ))}
            </h1>

            {/* Description */}
            <p
              ref={subRef}
              className="text-base sm:text-lg text-white/60 max-w-lg mx-auto leading-relaxed mb-4"
            >
              Rapids, rooftop bars, village classrooms. The version locals live in.
            </p>

          </div>

          {/* Spacer pushes bottom section down */}
          <div className="flex-1 min-h-[1rem] lg:min-h-[2rem]" />

          {/* ── Bottom section ──────────────────────────────────────────────── */}
          <div className="space-y-5 sm:space-y-6">

            {/* ── Search card — centered ─────────────────────────────────── */}
            <div ref={searchRef} className="flex justify-center">
              <form
                onSubmit={handleSearch}
                className="search-pill bg-black/35 backdrop-blur-xl rounded-full p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto sm:max-w-[560px]"
              >
                {/* Experience dropdown */}
                <div ref={dropdownRef} className="relative flex-1 sm:flex-none">
                  <button
                    type="button"
                    onClick={() => setShowExpDropdown(!showExpDropdown)}
                    className="flex items-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl text-sm text-white/80 hover:bg-white/5 transition-colors w-full sm:w-[160px]"
                  >
                    <span className="truncate">{selectedExperience || 'Experience'}</span>
                    <ChevronDown className={`w-3.5 h-3.5 ml-auto shrink-0 transition-transform ${showExpDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showExpDropdown && (
                    <div className="absolute top-full left-0 mt-2 w-full bg-[#1c1917] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                      {experienceOptions.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => { setSelectedExperience(opt); setShowExpDropdown(false) }}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                            selectedExperience === opt
                              ? 'bg-[var(--color-primary)]/20 text-[var(--color-accent-light)]'
                              : 'text-white/70 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-6 bg-white/10" />

                {/* Date */}
                <div className="flex items-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl text-sm flex-1 sm:flex-none sm:w-[140px]">
                  <Calendar className="w-4 h-4 text-white/40 shrink-0" />
                  <input
                    type="text"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    placeholder="Any day"
                    className="bg-transparent border-none outline-none text-white/80 placeholder-white/35 w-full text-sm"
                  />
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-6 bg-white/10" />

                {/* Guests */}
                <div className="flex items-center gap-2 px-4 py-3 sm:py-2.5 rounded-xl text-sm flex-1 sm:flex-none sm:w-[150px]">
                  <Users className="w-4 h-4 text-white/40 shrink-0" />
                  <span className="text-white/80 whitespace-nowrap">{guestCount} People</span>
                  <div className="flex items-center gap-1 ml-auto">
                    <button
                      type="button"
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/15 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setGuestCount(guestCount + 1)}
                      className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/15 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Explore button — inside pill */}
                <button
                  type="submit"
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-light)] text-white rounded-full px-5 h-10 sm:h-10 shrink-0 flex items-center justify-center gap-2 transition-colors"
                >
                  <Compass className="w-4 h-4" strokeWidth={2} />
                  <span className="text-sm font-semibold">Explore</span>
                </button>
              </form>
            </div>

            {/* ── Stats row — bottom right ──────────────────────────────────── */}
            <div ref={statsRef} className="flex justify-center gap-8 lg:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-left lg:text-right">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-[0.65rem] sm:text-xs text-white/45 font-medium uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured experience cards — horizontal scroll row ──────────────── */}
      <div className="relative z-10 -mt-4 sm:-mt-6 lg:-mt-8 mb-8 sm:mb-12 lg:mb-16 px-6 sm:px-8 lg:px-12 xl:px-16">
        <div
          ref={cardsRowRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-4 justify-center"
        >
          {featuredExperiences.map((exp) => (
            <div key={exp.id} className="exp-card snap-start">
              <ExperienceCard {...exp} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
