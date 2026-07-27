import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, MapPin, Clock, ArrowRight, UtensilsCrossed } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { eatDrink } from '../../data/listings'

gsap.registerPlugin(ScrollTrigger)

const filters = ['All', 'Local / African', 'International', 'Rooftop & Views', 'Nightlife']

export default function EatDrinkSection() {
  const sectionRef = useRef(null)
  const [activeFilter, setActiveFilter] = useState('All')
  const cardsRef = useRef([])

  const filtered = activeFilter === 'All'
    ? eatDrink
    : eatDrink.filter(e => e.subcategory === activeFilter)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.eat-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(card,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, delay: i * 0.06, ease: 'power3.out' }
      )
    })
  }, [activeFilter])

  return (
    <section ref={sectionRef} className="section bg-white">
      <div className="container-premium">
        {/* Header */}
        <div className="eat-header flex items-end justify-between mb-8">
          <div>
            <span className="section-label">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              Eat & Drink
            </span>
            <h2 className="section-title">The town eats well</h2>
            <p className="section-subtitle">
              Oxtail, tapas, sundowners. Real restaurants, real menus.
            </p>
          </div>
          <Link
            to="/eat-drink"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors group"
          >
            View all restaurants
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 border ${
                activeFilter === f
                  ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)] shadow-sm'
                  : 'bg-[var(--color-surface)] text-[var(--color-ink-light)] border-[var(--color-border)] hover:bg-[var(--color-surface-warm)] hover:border-[var(--color-border)]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Restaurant cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { cardsRef.current[i] = el }}
              className="card group"
            >
              {/* Image */}
              <div className="card-image h-52 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                  {item.badges?.slice(0, 2).map((badge) => (
                    <span key={badge} className="badge bg-white/90 text-[var(--color-ink)]">
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-semibold">{item.rating}</span>
                  <span className="text-white/50 text-[10px]">({item.reviews})</span>
                </div>
              </div>

              {/* Content */}
              <div className="card-body">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-accent">{item.category}</span>
                </div>

                <h3 className="text-[var(--color-ink)] font-semibold text-sm tracking-tight mb-1.5 line-clamp-1 group-hover:text-[var(--color-accent)] transition-colors">
                  {item.name}
                </h3>

                <p className="text-[var(--color-ink-muted)] text-xs leading-relaxed line-clamp-2 mb-3">
                  {item.shortDesc}
                </p>

                <div className="flex flex-col gap-1.5 text-[10px] text-[var(--color-ink-muted)]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{item.hours}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{item.address}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--color-border-light)]">
                  <span className="text-sm font-bold text-[var(--color-primary)]">{item.price}</span>
                  {item.priceNote && <span className="text-[10px] text-[var(--color-ink-muted)]">{item.priceNote}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
