import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { localVoices } from '../../data/listings'
import { Users } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function LocalVoices() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.lv-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="section bg-[var(--color-surface)]">
      <div className="container-premium">
        {/* Header */}
        <div className="lv-header text-center max-w-2xl mx-auto mb-12">
          <span className="section-label justify-center">
            <Users className="w-3.5 h-3.5" />
            Local Voices
          </span>
          <h2 className="section-title">Meet the people who make it real</h2>
          <p className="section-subtitle mx-auto">
            Real guides, chefs, village hosts — the people behind the experiences.
          </p>
        </div>

        {/* People grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {localVoices.map((person, i) => (
            <div
              key={person.id}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group text-center"
            >
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-[var(--color-border-light)]">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-[10px] leading-relaxed line-clamp-3">{person.bio}</p>
                </div>
              </div>
              <h3 className="text-[var(--color-ink)] font-semibold text-sm tracking-tight">{person.name}</h3>
              <p className="text-[var(--color-primary)] text-xs font-medium mt-0.5">{person.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
