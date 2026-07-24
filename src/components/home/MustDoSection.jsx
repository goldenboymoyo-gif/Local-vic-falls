import React, { useRef, useEffect } from 'react'
import { Star, Clock, Flame, ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { adventures } from '../../data/listings'

gsap.registerPlugin(ScrollTrigger)

const mustDoIds = ['adv-5', 'adv-1', 'adv-2', 'adv-6', 'adv-7']
const mustDo = mustDoIds
  .map(id => adventures.find(a => a.id === id))
  .filter(Boolean)
  .map((item, i) => ({ ...item, rank: i + 1 }))

export default function MustDoSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.must-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section bg-[var(--color-surface)]">
      <div className="container-premium">
        <div className="must-header text-center max-w-2xl mx-auto mb-12">
          <span className="section-label justify-center">
            <Flame className="w-3.5 h-3.5" />
            Don't Miss
          </span>
          <h2 className="section-title">Must-do experiences</h2>
          <p className="section-subtitle mx-auto">
            The five things you can't leave Victoria Falls without doing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {mustDo.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { cardsRef.current[i] = el }}
              className="card group relative"
            >
              {/* Rank badge */}
              <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white text-sm font-bold shadow-lg">
                {item.rank}
              </div>

              <div className="card-image h-52 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Price */}
                <div className="absolute bottom-3 right-3 bg-white rounded-lg px-3 py-1.5 shadow-md">
                  <span className="text-[10px] text-[var(--color-ink-muted)] block leading-none">{item.priceNote}</span>
                  <span className="text-lg font-bold text-[var(--color-ink)] leading-none">{item.price}</span>
                </div>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-semibold">{item.rating}</span>
                  <span className="text-white/50 text-[10px]">({item.reviews})</span>
                </div>
              </div>

              <div className="card-body">
                <h3 className="text-[var(--color-ink)] font-semibold text-sm tracking-tight line-clamp-1 group-hover:text-[var(--color-accent)] transition-colors">
                  {item.name}
                </h3>
                <p className="text-[var(--color-ink-muted)] text-xs mt-1 line-clamp-2 leading-relaxed">
                  {item.shortDesc}
                </p>
                <div className="flex items-center gap-2 mt-2.5 text-[10px] text-[var(--color-ink-muted)]">
                  <Clock className="w-3 h-3" />
                  <span>{item.duration}</span>
                </div>
                <Link
                  to={`/business/${item.slug}`}
                  className="btn btn-primary btn-sm w-full mt-3"
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
