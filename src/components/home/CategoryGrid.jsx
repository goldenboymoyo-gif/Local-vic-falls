import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pillarCategories } from '../../data/listings'
import SafeImage from '../ui/SafeImage'

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
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.5, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="categories" ref={sectionRef} className="py-16 lg:py-20 bg-white">
      <div className="container-premium">
        <div className="cat-header text-center max-w-2xl mx-auto mb-10">
          <span className="section-label justify-center">Explore Victoria Falls</span>
          <h2 className="section-title text-2xl lg:text-3xl">The falls are just the start</h2>
          <p className="text-sm text-[var(--color-ink-muted)] mt-2 max-w-md mx-auto">
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
              className="group relative rounded-2xl overflow-hidden cursor-pointer block"
              style={{ minHeight: i === 0 ? '320px' : '170px' }}
            >
              <SafeImage
                src={cat.image}
                alt={cat.name}
                pillar={cat.id}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Stronger gradient overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5 group-hover:from-black/85 group-hover:via-black/40 transition-all duration-500" />
              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary-light)] mb-1.5 drop-shadow-sm">
                  {cat.count} listings
                </span>
                <h3 className="text-white font-bold text-base lg:text-xl tracking-tight mb-1 drop-shadow-sm">
                  {cat.name}
                </h3>
                <p className="text-white/70 text-xs leading-relaxed line-clamp-2 hidden sm:block drop-shadow-sm">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[var(--color-primary-light)] text-xs font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  Explore
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
