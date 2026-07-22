import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, ArrowRight, Award, Briefcase, Clock, Search, Filter, ChevronLeft } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { popularProfessionals } from '../data/mockData'

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
            <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">Professionals</span>
            <h1 className="text-4xl lg:text-5xl font-bold mt-3 tracking-tight">Top-rated professionals in Victoria Falls</h1>
            <p className="text-gray-500 mt-3 text-base">Browse verified, experienced professionals ready to help with your next project.</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <div className="flex-1 min-w-[280px] flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-gray-400 transition-colors">
              <Search className="w-5 h-5 text-gray-400" />
              <input type="text" placeholder="Search professionals..." className="flex-1 bg-transparent border-none outline-none text-sm" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            {popularProfessionals.map((pro, i) => (
              <div key={pro.id} ref={(el) => { cardsRef.current[i] = el }}>
                <Link
                  to={`/professional/${pro.id}`}
                  className="group flex flex-col md:flex-row items-stretch rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500"
                >
                  <div className="relative w-full md:w-72 shrink-0 overflow-hidden">
                    <img src={pro.image} alt={pro.name} className="w-full h-56 md:h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    {pro.available && (
                      <span className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full">
                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                        Available
                      </span>
                    )}
                  </div>
                  <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">{pro.profession}</span>
                    <h3 className="text-xl lg:text-2xl font-bold mt-1 group-hover:text-blue-600 transition-colors break-words line-clamp-2">{pro.name}</h3>
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, idx) => (
                           <Star key={idx} className={`w-4 h-4 ${idx < Math.round(pro.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                        ))}
                        <span className="text-sm font-semibold ml-1">{pro.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {pro.experience}</span>
                      <span className="text-sm text-gray-500 flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {pro.jobs} jobs</span>
                      <span className="text-sm text-gray-500 flex items-center gap-1"><Award className="w-3.5 h-3.5" /> Verified</span>
                    </div>
                    <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600 opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-1 transition-all">
                      View profile <ArrowRight className="w-4 h-4" />
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
