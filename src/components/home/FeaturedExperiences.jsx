import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, Clock, DollarSign, ArrowRight, Heart, Share2 } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { featuredExperiences } from '../../data/mockData'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedExperiences() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.exp-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      })

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
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
        <div className="exp-header flex items-end justify-between mb-14">
          <div>
            <span className="text-[11px] font-medium text-emerald-600 uppercase tracking-[0.2em]">
              Featured Experiences
            </span>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold mt-3 tracking-tight leading-[1.1] text-gray-900">
              Unforgettable adventures await
            </h2>
            <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-md">
              Hand-picked experiences that showcase the best of Victoria Falls.
            </p>
          </div>
          <Link
            to="/search?type=experiences"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:text-emerald-600 transition-colors group"
          >
            View all experiences
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredExperiences.map((exp, i) => (
            <div
              key={exp.id}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl hover:shadow-gray-200/50 hover:border-gray-200 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-gray-200">
                <img
                  src={exp.image}
                  alt={exp.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  {exp.featured && (
                    <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                  {exp.verified && (
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                    <Share2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-bold">{exp.rating}</span>
                  <span className="text-white/60 text-xs">({exp.reviews})</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{exp.category}</span>
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">{exp.duration}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors">
                  {exp.name}
                </h3>

                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {exp.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-gray-900 font-bold" />
                    <span className="text-xl font-bold text-gray-900">{exp.price}</span>
                    <span className="text-xs text-gray-400">/ person</span>
                  </div>
                  <Link
                    to={`/business/${exp.slug}`}
                    className="inline-flex items-center gap-1.5 bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-emerald-600 transition-colors duration-300"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
