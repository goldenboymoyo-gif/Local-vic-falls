import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Mountain, UtensilsCrossed, Users, Hotel, Music } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  { id: 'adventure', name: 'Adventure', slug: 'adventure', Icon: Mountain },
  { id: 'eat-drink', name: 'Eat & Drink', slug: 'eat-drink', Icon: UtensilsCrossed },
  { id: 'culture', name: 'Culture & Villages', slug: 'culture', Icon: Users },
  { id: 'stay', name: 'Stay', slug: 'stay', Icon: Hotel },
  { id: 'nightlife', name: 'Nightlife', slug: 'nightlife', Icon: Music },
]

export default function Categories() {
  const gridRef = useRef(null)
  const cellsRef = useRef([])

  useEffect(() => {
    if (!gridRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(cellsRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power3.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, gridRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="py-24 lg:py-28 bg-[var(--color-accent)] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-dark)] via-[var(--color-accent)] to-[var(--color-accent)] opacity-50" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="section-label text-white/60">Categories</span>
            <h2 className="section-title text-white">Browse by category</h2>
            <p className="section-subtitle text-white/50">
              Find exactly what you need from our curated selection of service categories.
            </p>
          </div>
          <Link to="/search" className="hidden sm:flex items-center gap-1 text-sm font-medium text-white/60 hover:text-white transition-colors group">
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div
          ref={gridRef}
          className="bg-[#2F3E31] rounded-2xl overflow-hidden grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        >
          {pillars.map((cat, idx) => {
            const { Icon } = cat
            return (
              <motion.div
                key={cat.id}
                ref={(el) => { cellsRef.current[idx] = el }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="relative flex flex-col items-center justify-center py-10 px-4 border-b border-r border-white/[0.06] last:border-r-0 sm:[&:nth-child(3)]:border-r-0 lg:[&:nth-child(5)]:border-r-0 sm:[&:nth-child(n+4)]:border-b-0 lg:[&:nth-child(n+6)]:border-b-0 hover:bg-white/[0.04] transition-colors group"
                >
                  <div className="category-icon-glow transition-all duration-300 group-hover:scale-110">
                    <Icon
                      className="w-11 h-11 text-[var(--color-primary-light)]"
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-[0.8rem] text-white/50 font-medium mt-4 text-center leading-tight group-hover:text-white/75 transition-colors">
                    {cat.name}
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link to="/search" className="inline-flex items-center gap-1 text-sm font-medium text-white/60 hover:text-white">
            View all categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
