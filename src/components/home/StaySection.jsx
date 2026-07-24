import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, MapPin, Hotel } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { stayListings } from '../../data/listings'

gsap.registerPlugin(ScrollTrigger)

export default function StaySection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.stay-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section bg-white">
      <div className="container-premium">
        {/* Header */}
        <div className="stay-header flex items-end justify-between mb-12">
          <div>
            <span className="section-label">
              <Hotel className="w-3.5 h-3.5" />
              Stay
            </span>
            <h2 className="section-title">Where you rest shapes how you explore</h2>
            <p className="section-subtitle">
              Backpacker dorms to riverside lodges — your base matters.
            </p>
          </div>
          <Link
            to="/search?pillar=stay"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-primary)] transition-colors group"
          >
            View all accommodation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Stay cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stayListings.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { cardsRef.current[i] = el }}
              className="card group"
            >
              <div className="card-image h-52 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 badge bg-white/90 text-[var(--color-ink)]">
                  {item.type}
                </span>
                <div className="absolute bottom-3 right-3 bg-white rounded-lg px-3 py-1.5 shadow-md">
                  <span className="text-[10px] text-[var(--color-ink-muted)] block leading-none">{item.priceNote}</span>
                  <span className="text-lg font-bold text-[var(--color-ink)] leading-none">{item.price}</span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-semibold">{item.rating}</span>
                  <span className="text-white/50 text-[10px]">({item.reviews})</span>
                </div>
              </div>
              <div className="card-body">
                <h3 className="text-[var(--color-ink)] font-semibold text-sm tracking-tight mb-1.5 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {item.name}
                </h3>
                <p className="text-[var(--color-ink-muted)] text-xs leading-relaxed line-clamp-2 mb-3">
                  {item.description}
                </p>
                <Link
                  to={`/search?pillar=stay`}
                  className="text-xs font-semibold text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors"
                >
                  View details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
