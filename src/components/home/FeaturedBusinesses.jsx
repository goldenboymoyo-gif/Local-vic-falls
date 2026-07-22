import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, MapPin, ArrowRight, ChevronRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { featuredBusinesses } from '../../data/mockData'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturedBusinesses() {
  const sectionRef = useRef(null)
  const rowRefs = useRef([])
  const imgRefs = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current.querySelector('.biz-header'), { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      })

      rowRefs.current.forEach((row, i) => {
        if (!row) return

        const img = imgRefs.current[i]
        const isReversed = i % 2 !== 0

        gsap.fromTo(img, { clipPath: isReversed ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }, {
          clipPath: 'inset(0 0% 0 0%)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 75%', toggleActions: 'play none none none' }
        })

        gsap.fromTo(img, { y: -20 }, {
          y: 20, ease: 'none',
          scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 1 }
        })

        const content = row.querySelector('.biz-content')
        gsap.fromTo(content, { opacity: 0, x: i % 2 === 0 ? 40 : -40 }, {
          opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 70%', toggleActions: 'play none none none' }
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="biz-header flex items-end justify-between mb-14">
          <div>
            <span className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em]">
              Featured
            </span>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold mt-3 tracking-tight leading-[1.1] text-gray-900">
              Top-rated businesses
            </h2>
            <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-md">
              Discover our most trusted and highly recommended service providers.
            </p>
          </div>
          <Link
            to="/search?sort=rating"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors group"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Alternating rows */}
        <div className="flex flex-col gap-8">
          {featuredBusinesses.slice(0, 6).map((biz, i) => {
            const isReversed = i % 2 !== 0
            return (
              <div
                key={biz.id}
                ref={(el) => (rowRefs.current[i] = el)}
                className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-0 rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl transition-shadow duration-500`}
              >
                {/* Image */}
                <div className="relative w-full md:w-1/2 h-[260px] md:h-[280px] overflow-hidden bg-gray-200">
                  <img
                    ref={(el) => (imgRefs.current[i] = el)}
                    src={biz.image}
                    alt={biz.name}
                    className="w-full h-full object-cover"
                  />
                  {biz.featured && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[11px] font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full text-gray-800">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`biz-content flex flex-col justify-center w-full md:w-1/2 p-8 md:p-10 ${isReversed ? 'md:items-end md:text-right' : ''}`}>
                  <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                    {biz.category}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mt-2 tracking-tight break-words line-clamp-2">
                    {biz.name}
                  </h3>

                  <div className={`flex items-center gap-4 mt-3 text-sm ${isReversed ? 'md:justify-end' : ''}`}>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold text-gray-900">{biz.rating}</span>
                      <span className="text-gray-400">({biz.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {biz.city}
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mt-4 max-w-md">
                    Trusted {biz.category.toLowerCase()} serving the Victoria Falls area.
                    Verified and highly rated by the community.
                  </p>

                  <div className={`flex items-center gap-3 mt-6 ${isReversed ? 'md:justify-end' : ''}`}>
                    <Link
                      to={`/business/${biz.slug}`}
                      className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors duration-300"
                    >
                      View profile
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
