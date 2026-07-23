import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, MapPin } from 'lucide-react'
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
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="stay-header flex items-end justify-between mb-14">
          <div>
            <span className="text-[11px] font-medium text-teal-600 uppercase tracking-[0.2em]">
              Stay
            </span>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold mt-3 tracking-tight leading-[1.1] text-gray-900">
              Where you rest shapes how you explore
            </h2>
            <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-md">
              Backpacker dorms to riverside lodges — your base matters.
            </p>
          </div>
          <Link
            to="/search?pillar=stay"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:text-teal-600 transition-colors group"
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
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-200 transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-gray-800">
                  {item.type}
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
              <div className="p-5">
                <h3 className="text-gray-900 font-bold text-sm tracking-tight mb-1.5 line-clamp-1 group-hover:text-teal-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">
                  {item.description}
                </p>
                <Link
                  to={`/search?pillar=stay`}
                  className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors"
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
