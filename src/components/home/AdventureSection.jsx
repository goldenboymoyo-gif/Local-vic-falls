import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, Clock, ArrowRight, Mountain } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { adventures } from '../../data/listings'

gsap.registerPlugin(ScrollTrigger)

export default function AdventureSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.adv-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section bg-white relative overflow-hidden">
      <div className="container-premium relative z-10">
        {/* Header */}
        <div className="adv-header flex items-end justify-between mb-12">
          <div>
            <span className="section-label">
              <Mountain className="w-3.5 h-3.5" />
              Adventure & Adrenaline
            </span>
            <h2 className="section-title">The Zambezi doesn't do half measures</h2>
            <p className="section-subtitle">
              Grade 5 rapids, 111m bungee drops, gorge swings — all below the falls.
            </p>
          </div>
          <Link
            to="/adventures"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-primary)] transition-colors group"
          >
            View all adventures
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {adventures.slice(0, 8).map((adv, i) => (
            <div
              key={adv.id}
              ref={(el) => { cardsRef.current[i] = el }}
              className="card group"
            >
              {/* Image */}
              <div className="card-image h-52 relative">
                <img
                  src={adv.image}
                  alt={adv.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                  {adv.badges?.slice(0, 2).map((badge) => (
                    <span key={badge} className="badge bg-[var(--color-primary)] text-white">
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Price badge */}
                <div className="absolute bottom-3 right-3 bg-white rounded-lg px-3 py-1.5 shadow-md">
                  <span className="text-[10px] text-[var(--color-ink-muted)] block leading-none">{adv.priceNote}</span>
                  <span className="text-lg font-bold text-[var(--color-ink)] leading-none">{adv.price}</span>
                </div>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-semibold">{adv.rating}</span>
                  <span className="text-white/50 text-[10px]">({adv.reviews})</span>
                </div>
              </div>

              {/* Content */}
              <div className="card-body">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-primary">{adv.category}</span>
                  <div className="flex items-center gap-1 text-[var(--color-ink-muted)]">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px]">{adv.duration}</span>
                  </div>
                </div>

                <h3 className="text-[var(--color-ink)] font-semibold text-sm tracking-tight mb-1.5 line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {adv.name}
                </h3>

                <p className="text-[var(--color-ink-muted)] text-xs leading-relaxed line-clamp-2 mb-4">
                  {adv.shortDesc}
                </p>

                <Link
                  to={`/business/${adv.slug}`}
                  className="btn btn-primary btn-sm w-full"
                >
                  Book Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
