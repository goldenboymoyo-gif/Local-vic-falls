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
            scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section bg-white">
      <div className="container-premium">
        <div className="mb-10">
          <span className="section-label">
            <MapPin className="w-3.5 h-3.5" />
            Destination
          </span>
          <h2 className="section-title">Victoria Falls, Zimbabwe</h2>
          <p className="section-subtitle">
            The adventure capital of Africa — home to thousands of trusted service providers.
          </p>
        </div>

        {/* Main hero card */}
        <div ref={heroRef} className="relative overflow-hidden rounded-2xl bg-[var(--color-border-light)] mb-8">
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
                <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight leading-[1.1] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
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
                  className="btn bg-white text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
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
              className="flex items-center gap-4 p-4 rounded-xl border border-[var(--color-border-light)] bg-[var(--color-surface)]/50 hover:bg-white hover:shadow-sm hover:border-[var(--color-border)] transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center shrink-0 group-hover:bg-[var(--color-primary)]/15 transition-colors">
                <h.icon className="w-4 h-4 text-[var(--color-primary)]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--color-ink)]">{h.label}</h4>
                <p className="text-xs text-[var(--color-ink-muted)] mt-0.5">{h.count}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Nearby areas */}
        <div ref={(el) => { cardsRef.current[3] = el }}>
          <h3 className="text-lg font-bold text-[var(--color-ink)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>Areas in Victoria Falls</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
            {nearbyAreas.map((area) => (
              <Link
                key={area.name}
                to={`/search?city=${encodeURIComponent(area.name)}`}
                className="group block p-4 rounded-xl border border-[var(--color-border-light)] hover:border-[var(--color-border)] hover:shadow-sm transition-all duration-300"
              >
                <h4 className="text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-primary)] transition-colors">{area.name}</h4>
                <p className="text-xs text-[var(--color-ink-muted)] mt-1">{area.providers} providers</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
