import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pillarCategories } from '../../data/listings'
import SafeImage from '../ui/SafeImage'

gsap.registerPlugin(ScrollTrigger)

const [hero, ...supporting] = pillarCategories

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
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.5, delay: 0.15 + i * 0.07, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 93%', toggleActions: 'play none none none' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const getLink = (slug) =>
    slug === 'nightlife' || slug === 'stay' ? `/search?pillar=${slug}` : `/${slug}`

  return (
    <section id="categories" ref={sectionRef} className="py-16 lg:py-24 bg-white">
      <div className="container-premium">
        <div className="cat-header text-center max-w-2xl mx-auto mb-12">
          <span className="section-label justify-center">Explore Victoria Falls</span>
          <h2 className="section-title text-2xl lg:text-3xl">The falls are just the start</h2>
          <p className="text-sm text-[var(--color-ink-muted)] mt-2 max-w-md mx-auto leading-relaxed">
            From the gorge to the township.
          </p>
        </div>

        {/* ── Desktop / Tablet grid ─────────────────────────────────── */}
        <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-3 lg:gap-4" style={{ height: '460px' }}>
          {/* Hero card — left column, both rows */}
          <Link
            ref={(el) => { cardsRef.current[0] = el }}
            to={getLink(hero.slug)}
            className="group relative rounded-2xl overflow-hidden col-start-1 row-span-2 block"
          >
            <SafeImage
              src={hero.image}
              alt={hero.name}
              pillar={hero.id}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary-light)] mb-2">
                {hero.count} listings
              </span>
              <h3 className="text-white font-bold text-xl lg:text-2xl tracking-tight leading-tight mb-1.5">
                {hero.name}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-3 hidden lg:block">
                {hero.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-[var(--color-primary-light)] text-xs font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                Explore <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>

          {/* 4 supporting cards — 2 columns × 2 rows */}
          {supporting.map((cat, i) => (
            <Link
              key={cat.id}
              ref={(el) => { cardsRef.current[i + 1] = el }}
              to={getLink(cat.slug)}
              className="group relative rounded-2xl overflow-hidden block"
            >
              <SafeImage
                src={cat.image}
                alt={cat.name}
                pillar={cat.id}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute inset-0 p-5 lg:p-6 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary-light)] mb-1">
                  {cat.count} listings
                </span>
                <h3 className="text-white font-bold text-sm lg:text-base tracking-tight leading-snug mb-0.5">
                  {cat.name}
                </h3>
                <p className="text-white/55 text-xs leading-relaxed line-clamp-1 hidden lg:block">
                  {cat.description}
                </p>
                <span className="inline-flex items-center gap-1 text-[var(--color-primary-light)] text-[11px] font-semibold mt-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  Explore <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Mobile layout — single column ──────────────────────────── */}
        <div className="md:hidden flex flex-col gap-3">
          {/* Hero card — full width, taller */}
          <Link
            ref={(el) => { cardsRef.current[0] = el }}
            to={getLink(hero.slug)}
            className="group relative rounded-2xl overflow-hidden block h-[260px]"
          >
            <SafeImage
              src={hero.image}
              alt={hero.name}
              pillar={hero.id}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 p-5 flex flex-col justify-end">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary-light)] mb-1.5">
                {hero.count} listings
              </span>
              <h3 className="text-white font-bold text-lg tracking-tight leading-tight mb-1">
                {hero.name}
              </h3>
              <p className="text-white/60 text-xs leading-relaxed line-clamp-2">
                {hero.description}
              </p>
            </div>
          </Link>

          {/* Supporting cards — 2 columns */}
          <div className="grid grid-cols-2 gap-3">
            {supporting.map((cat, i) => (
              <Link
                key={cat.id}
                ref={(el) => { cardsRef.current[i + 1] = el }}
                to={getLink(cat.slug)}
                className="group relative rounded-2xl overflow-hidden block h-[180px]"
              >
                <SafeImage
                  src={cat.image}
                  alt={cat.name}
                  pillar={cat.id}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-primary-light)] mb-1">
                    {cat.count} listings
                  </span>
                  <h3 className="text-white font-bold text-sm tracking-tight leading-snug">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
