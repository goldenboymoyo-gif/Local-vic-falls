import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { moods } from '../../data/mockData'

gsap.registerPlugin(ScrollTrigger)

export default function ExploreByMood() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.mood-header', {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.5, delay: i * 0.06, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mood-header text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-medium text-emerald-600 uppercase tracking-widest">Explore by Mood</span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-3 tracking-tight">
            What are you in the mood for?
          </h2>
          <p className="text-gray-500 mt-2 max-w-md text-sm">
            Choose a mood and we'll show you the perfect experiences in Victoria Falls.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 lg:gap-4">
          {moods.map((mood, i) => (
            <Link
              key={mood.id}
              ref={(el) => { cardsRef.current[i] = el }}
              to={`/search?mood=${mood.slug}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${mood.color} p-5 sm:p-6 text-white hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer aspect-square flex flex-col justify-between`}
            >
              <div className="text-3xl sm:text-4xl">{mood.emoji}</div>
              <div>
                <h3 className="font-bold text-sm sm:text-base leading-tight">{mood.name}</h3>
                <p className="text-white/60 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore →
                </p>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
