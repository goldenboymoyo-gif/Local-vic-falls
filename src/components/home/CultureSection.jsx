import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Star, BookOpen } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cultureListings } from '../../data/listings'

gsap.registerPlugin(ScrollTrigger)

export default function CultureSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.cul-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const featured = cultureListings[0]
  const rest = cultureListings.slice(1)

  return (
    <section ref={sectionRef} className="section bg-[var(--color-surface)] relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-primary) 1px, transparent 0)', backgroundSize: '28px 28px' }}
      />

      <div className="container-premium relative">
        {/* Header */}
        <div className="cul-header text-center max-w-2xl mx-auto mb-12">
          <span className="section-label justify-center">
            <BookOpen className="w-3.5 h-3.5" />
            Culture, Schools & Villages
          </span>
          <h2 className="section-title">The version tourists rarely see</h2>
          <p className="section-subtitle mx-auto">
            Monde Village, Chinotimba Township, heritage centres. More than a waterfall.
          </p>
        </div>

        {/* Featured story — large */}
        <div
          ref={(el) => { cardsRef.current[0] = el }}
          className="group relative rounded-2xl overflow-hidden h-[420px] lg:h-[500px] mb-6 cursor-pointer shine"
        >
          <img
            src={featured.image}
            alt={featured.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end max-w-2xl">
            <span className="badge badge-accent self-start mb-4">
              {featured.type}
            </span>
            <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-3">{featured.name}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{featured.description}</p>
            <div className="flex items-center gap-4 mb-5 text-white/40 text-xs">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.duration}</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{featured.rating} ({featured.reviews})</span>
              <span className="font-bold text-white">{featured.price} {featured.priceNote}</span>
            </div>
            <Link
              to="/booking"
              className="btn btn-primary w-fit"
            >
              Book Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Other culture listings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {rest.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { cardsRef.current[i + 1] = el }}
              className="card group"
            >
              <div className="card-image h-48 relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 badge bg-white/90 text-[var(--color-ink)]">
                  {item.type}
                </span>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-full px-2.5 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-semibold">{item.rating}</span>
                </div>
              </div>
              <div className="card-body">
                <h3 className="text-[var(--color-ink)] font-semibold text-sm tracking-tight mb-1.5 group-hover:text-[var(--color-accent)] transition-colors">
                  {item.name}
                </h3>
                <p className="text-[var(--color-ink-muted)] text-xs leading-relaxed line-clamp-2">{item.shortDesc}</p>
                <div className="flex items-center gap-3 text-[10px] text-[var(--color-ink-muted)] mt-auto pt-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.duration}</span>
                  <span className="font-semibold text-[var(--color-ink)]">{item.price} {item.priceNote}</span>
                </div>
                <Link
                  to="/booking"
                  className="btn btn-sm w-full btn-primary mt-3"
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
