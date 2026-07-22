import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, BadgeCheck } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { popularProfessionals } from '../../data/mockData'

gsap.registerPlugin(ScrollTrigger)

export default function PopularProfessionals() {
  const featured = popularProfessionals.slice(0, 6)
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.pro-section-header', {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pro-section-header flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">Featured Professionals</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-3 tracking-tight">Talents that stand out</h2>
            <p className="text-gray-500 mt-2 max-w-md text-sm">Handpicked professionals with proven track records.</p>
          </div>
          <Link to="/professionals" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors group">
            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((pro, i) => (
            <div key={pro.id} ref={(el) => { cardsRef.current[i] = el }}>
              <Link
                to={`/professional/${pro.id}`}
                className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-200 transition-all duration-500"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={pro.image}
                    alt={pro.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {pro.available && (
                    <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500 text-white text-[10px] font-semibold rounded-full shadow-lg">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      Available
                    </span>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-start gap-2">
                      <h3 className="text-lg font-bold text-white tracking-tight break-words line-clamp-2 flex-1 min-w-0">{pro.name}</h3>
                      {pro.rating >= 4.8 && <BadgeCheck className="w-4 h-4 text-yellow-400 shrink-0 mt-1" />}
                    </div>
                    <p className="text-white/70 text-xs mt-1">{pro.profession} · {pro.experience}</p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className={`w-3 h-3 ${idx < Math.round(pro.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                        ))}
                      </div>
                      <span className="text-xs font-semibold text-gray-800">{pro.rating}</span>
                      <span className="text-xs text-gray-400">({pro.jobs} jobs)</span>
                    </div>
                    <span className="text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View profile →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link to="/professionals" className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600">
            View all professionals <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
