import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, Clock, Search, ChevronLeft } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { localVoices } from '../data/listings'

gsap.registerPlugin(ScrollTrigger)

export default function Professionals() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card, { opacity: 0, y: 40, scale: 0.97 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' }
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="pt-28 pb-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to home
          </Link>
          <div className="max-w-2xl">
            <span className="text-xs font-medium text-teal-600 uppercase tracking-widest">Local Voices</span>
            <h1 className="text-4xl lg:text-5xl font-bold mt-3 tracking-tight">Meet the people of Victoria Falls</h1>
            <p className="text-gray-500 mt-3 text-base">The guides, chefs, hosts, and storytellers who make this town real.</p>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {localVoices.map((person, i) => (
              <div key={person.id} ref={(el) => { cardsRef.current[i] = el }}>
                <Link
                  to={`/search?q=${encodeURIComponent(person.name)}`}
                  className="group flex flex-col md:flex-row items-stretch rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative w-full md:w-72 shrink-0 overflow-hidden">
                    <img src={person.image} alt={person.name} className="w-full h-56 md:h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                    <span className="text-xs font-medium text-teal-600 uppercase tracking-wider">{person.role}</span>
                    <h3 className="text-xl lg:text-2xl font-bold mt-1 group-hover:text-teal-600 transition-colors">{person.name}</h3>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{person.bio}</p>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-teal-600 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all">
                      View linked experience <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
