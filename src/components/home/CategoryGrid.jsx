import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pillarCategories } from '../../data/listings'

gsap.registerPlugin(ScrollTrigger)

export default function CategoryGrid() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.cat-header', {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="categories" ref={sectionRef} className="py-12 lg:py-16 bg-white">
      <div className="container-premium">
        <div className="cat-header text-center max-w-2xl mx-auto mb-8">
          <span className="section-label justify-center">Explore Victoria Falls</span>
          <h2 className="section-title text-2xl lg:text-3xl">The falls are just the start</h2>
          <p className="text-sm text-[var(--color-ink-muted)] mt-2">
            From the gorge to the township.
          </p>
        </div>

        {/* Bento grid */}
        <div className="bento-grid">
          {pillarCategories.map((cat, i) => (
            <Link
              key={cat.id}
              ref={(el) => { cardsRef.current[i] = el }}
              to={cat.slug === 'nightlife' || cat.slug === 'stay' ? `/search?pillar=${cat.slug}` : `/${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden shine cursor-pointer"
              style={{ minHeight: i === 0 ? '280px' : '160px' }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary-light)] mb-1.5">
                  {cat.count} listings
                </span>
                <h3 className="text-white font-bold text-base lg:text-lg tracking-tight mb-0.5">
                  {cat.name}
                </h3>
                <p className="text-white/50 text-xs leading-relaxed line-clamp-2 hidden sm:block">
                  {cat.description}
                </p>
                <span className="text-[var(--color-primary-light)] text-xs font-medium mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
