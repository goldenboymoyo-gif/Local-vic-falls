import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { adventures, eatDrink, stayListings, cultureListings } from '../../data/listings'

gsap.registerPlugin(ScrollTrigger)

const featured = [
  { ...adventures.find(a => a.id === 'adv-5'), pillar: 'Adventure' },
  { ...adventures.find(a => a.id === 'adv-1'), pillar: 'Adventure' },
  { ...eatDrink.find(e => e.id === 'eat-4'), pillar: 'Eat & Drink' },
  { ...stayListings.find(s => s.id === 'stay-1'), pillar: 'Stay' },
  { ...eatDrink.find(e => e.id === 'eat-3'), pillar: 'Eat & Drink' },
  { ...cultureListings.find(c => c.id === 'cul-1'), pillar: 'Culture' },
  { ...stayListings.find(s => s.id === 'stay-2'), pillar: 'Stay' },
  { ...adventures.find(a => a.id === 'adv-6'), pillar: 'Adventure' },
]

const pillarColors = {
  'Adventure': 'bg-teal-500/15 text-teal-400',
  'Eat & Drink': 'bg-amber-500/15 text-amber-400',
  'Stay': 'bg-blue-500/15 text-blue-400',
  'Culture': 'bg-purple-500/15 text-purple-400',
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
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-[#050816]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="feat-header flex items-end justify-between mb-12">
          <div>
            <span className="text-[11px] font-medium text-teal-400 uppercase tracking-[0.2em]">
              Staff Picks
            </span>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold mt-3 tracking-tight leading-[1.1] text-white">
              Featured
            </h2>
          </div>
          <Link
            to="/search"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-teal-400 transition-colors group"
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
              className="group bg-white/[0.04] backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.06] hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/5 transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden bg-white/[0.04]">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className={`absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${pillarColors[item.pillar]}`}>
                  {item.pillar}
                </span>
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-lg">
                  <span className="text-[10px] text-gray-500 block leading-none">{item.priceNote}</span>
                  <span className="text-lg font-black text-gray-900 leading-none">{item.price}</span>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-bold">{item.rating}</span>
                  <span className="text-white/50 text-[10px]">({item.reviews})</span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-bold text-sm tracking-tight line-clamp-1 group-hover:text-teal-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-white/35 text-xs mt-1 line-clamp-1">
                  {item.shortDesc || item.description?.slice(0, 60)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
