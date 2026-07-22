import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, MapPin, Star, Camera, TreePine, Waves } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  { icon: TreePine, label: 'Rainforest National Park', count: '45+ guides' },
  { icon: Camera, label: 'Photo Safari Tours', count: '20+ operators' },
  { icon: Waves, label: 'White Water Rafting', count: '12+ providers' },
]

const nearbyAreas = [
  { name: 'Town Centre', providers: 850 },
  { name: 'Chinotimba', providers: 210 },
  { name: 'Mkhosana', providers: 180 },
  { name: 'New Stands', providers: 160 },
  { name: 'One Way', providers: 140 },
  { name: 'CBZ', providers: 95 },
  { name: 'Mayadini', providers: 75 },
  { name: 'Jafuta', providers: 65 },
]

export default function Cities() {
  const sectionRef = useRef(null)
  const heroRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroRef.current.querySelector('.vic-hero-img'),
        { scale: 1.15 },
        {
          scale: 1, duration: 1.8, ease: 'power2.out',
          scrollTrigger: { trigger: heroRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
        }
      )
      gsap.fromTo(heroRef.current.querySelector('.vic-hero-content'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: heroRef.current, start: 'top 75%', toggleActions: 'play none none none' },
        }
      )

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 30, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">Destination</span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-3 tracking-tight">
            Victoria Falls, Zimbabwe
          </h2>
          <p className="text-gray-500 mt-2 max-w-lg text-sm">
            The adventure capital of Africa — home to thousands of trusted service providers.
          </p>
        </div>

        {/* Main hero card */}
        <div ref={heroRef} className="relative overflow-hidden rounded-2xl bg-gray-100 mb-8">
          <div className="relative aspect-[16/7]">
            <img
              src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1400&h=600&fit=crop"
              alt="Victoria Falls"
              className="vic-hero-img absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

            <div className="vic-hero-content absolute inset-0 p-8 md:p-12 lg:p-14 flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/10 text-white text-xs font-medium rounded-full">
                  <MapPin className="w-3 h-3" /> Zimbabwe
                </span>
              </div>

              <div className="max-w-lg">
                <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-[1.1] mb-3">
                  Victoria Falls
                </h3>
                <p className="text-white/60 text-sm leading-relaxed mb-5">
                  Home to Mosi-oa-Tunya — the Smoke that Thunders. Discover top-rated service providers.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white/80 text-sm">Avg: <strong className="text-white">4.8</strong></span>
                  </div>
                  <span className="text-white/30">·</span>
                  <span className="text-white/80 text-sm"><strong className="text-white">1,580+</strong> providers</span>
                  <span className="text-white/30">·</span>
                  <span className="text-white/80 text-sm"><strong className="text-white">50+</strong> categories</span>
                </div>

                <Link
                  to="/search?city=Victoria%20Falls"
                  className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all duration-200"
                >
                  Explore Victoria Falls
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {highlights.map((h, i) => (
            <div
              key={h.label}
              ref={(el) => { cardsRef.current[i] = el }}
              className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                <h.icon className="w-4.5 h-4.5 text-blue-600" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800">{h.label}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{h.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Nearby areas */}
        <div ref={(el) => { cardsRef.current[3] = el }}>
          <h3 className="text-lg font-bold text-gray-900 mb-4">Areas in Victoria Falls</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
            {nearbyAreas.map((area) => (
              <Link
                key={area.name}
                to={`/search?city=${encodeURIComponent(area.name)}`}
                className="group block p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300"
              >
                <h4 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{area.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{area.providers} providers</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
