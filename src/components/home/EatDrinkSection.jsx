import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, MapPin, Clock, ArrowRight, Phone } from 'lucide-react'
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
    // Animate cards on filter change
    cardsRef.current.forEach((card, i) => {
      if (!card) return
      gsap.fromTo(card,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, delay: i * 0.06, ease: 'power3.out' }
      )
    })
  }, [activeFilter])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="eat-header flex items-end justify-between mb-10">
          <div>
            <span className="text-[11px] font-medium text-amber-600 uppercase tracking-[0.2em]">
              Eat & Drink
            </span>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold mt-3 tracking-tight leading-[1.1] text-gray-900">
              The town eats well
            </h2>
            <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-md">
              Oxtail at GOAT, tapas at Lola's, sundowners above the gorge. Real restaurants, real menus.
            </p>
          </div>
          <Link
            to="/search?pillar=eat-drink"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:text-amber-600 transition-colors group"
          >
            View all restaurants
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Filters — TripAdvisor style */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto no-scrollbar pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                activeFilter === f
                  ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/20'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
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
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-200 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                  {item.badges?.slice(0, 2).map((badge) => (
                    <span key={badge} className="bg-white/90 backdrop-blur-sm text-gray-800 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-bold">{item.rating}</span>
                  <span className="text-white/50 text-[10px]">({item.reviews})</span>
                </div>

                {/* Price */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span className="text-sm font-bold text-gray-900">{item.price}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{item.category}</span>
                </div>

                <h3 className="text-gray-900 font-bold text-sm tracking-tight mb-1.5 line-clamp-1 group-hover:text-amber-600 transition-colors">
                  {item.name}
                </h3>

                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
                  {item.shortDesc}
                </p>

                <div className="flex flex-col gap-1.5 text-[10px] text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    <span>{item.hours}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span className="line-clamp-1">{item.address}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
