import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, TrendingUp } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { adventures, eatDrink, stayListings, cultureListings } from '../../data/listings'
import SafeImage from '../ui/SafeImage'

gsap.registerPlugin(ScrollTrigger)

const featured = [
  { ...adventures.find(a => a.id === 'adv-5'), pillar: 'Adventure' },
  { ...eatDrink.find(e => e.id === 'eat-3'), pillar: 'Eat & Drink' },
  { ...stayListings.find(s => s.id === 'stay-1'), pillar: 'Stay' },
  { ...adventures.find(a => a.id === 'adv-1'), pillar: 'Adventure' },
  { ...cultureListings.find(c => c.id === 'cul-1'), pillar: 'Culture' },
  { ...eatDrink.find(e => e.id === 'eat-4'), pillar: 'Eat & Drink' },
  { ...stayListings.find(s => s.id === 'stay-2'), pillar: 'Stay' },
  { ...adventures.find(a => a.id === 'adv-6'), pillar: 'Adventure' },
]

const pillarColors = {
  'Adventure': 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]',
  'Eat & Drink': 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]',
  'Stay': 'bg-blue-500/10 text-blue-600',
  'Culture': 'bg-purple-500/10 text-purple-600',
}

export default function FeaturedSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.feat-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.06, ease: 'power3.out',
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
        <div className="feat-header flex items-end justify-between mb-10">
          <div>
            <span className="section-label">
              <TrendingUp className="w-3.5 h-3.5" />
              Staff Picks
            </span>
            <h2 className="section-title">Featured</h2>
            <p className="section-subtitle">Hand-picked experiences we think you'll love.</p>
          </div>
          <Link
            to="/search"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-primary)] transition-colors group"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((item, i) => (
            <Link
              key={item.id}
              ref={(el) => { cardsRef.current[i] = el }}
              to={`/business/${item.slug}`}
              className="card group"
            >
              <div className="card-image h-52 relative">
                <SafeImage
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className={`absolute top-3 left-3 badge ${pillarColors[item.pillar]}`}>
                  {item.pillar}
                </span>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-semibold">{item.rating}</span>
                  <span className="text-white/50 text-[10px]">({item.reviews})</span>
                </div>
              </div>
              <div className="card-body">
                <h3 className="text-[var(--color-ink)] font-semibold text-sm tracking-tight line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors">
                  {item.name}
                </h3>
                <p className="text-[var(--color-ink-muted)] text-xs mt-1 line-clamp-1">
                  {item.shortDesc || item.description?.slice(0, 60)}
                </p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-[var(--color-border-light)]">
                  <span className="text-sm font-bold text-[var(--color-primary)]">{item.price}</span>
                  <span className="text-[10px] text-[var(--color-ink-muted)]">{item.priceNote}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
