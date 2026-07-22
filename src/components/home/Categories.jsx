import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Zap,
  Droplets,
  Hammer,
  Wrench,
  Sparkles,
  Camera,
  Stethoscope,
  Scissors,
  Scale,
  BookOpen,
  UtensilsCrossed,
  Dumbbell,
  CalendarCheck,
  Compass,
  Hotel,
  Flower2,
  ShoppingBag,
} from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { categories } from '../../data/mockData'

gsap.registerPlugin(ScrollTrigger)

const iconComponents = {
  Zap,
  Droplets,
  Hammer,
  Wrench,
  Sparkles,
  Camera,
  Stethoscope,
  Scissors,
  Scale,
  BookOpen,
  UtensilsCrossed,
  Dumbbell,
  CalendarCheck,
  Compass,
  Hotel,
  Flower2,
  ShoppingBag,
}

export default function Categories() {
  const gridRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!gridRef.current) return

    gsap.set(cardsRef.current, { opacity: 0, y: 40, scale: 0.95 })

    const ctx = gsap.context(() => {
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, gridRef)

    return () => ctx.revert()
  }, [])

  const handleMagneticEnter = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(card, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMagneticMove = (e) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(card, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  return (
    <section className="py-24 lg:py-28 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">Categories</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-3 tracking-tight">
              Browse by category
            </h2>
            <p className="text-gray-500 mt-2 max-w-md text-sm">
              Find exactly what you need from our curated selection of service categories.
            </p>
          </div>
          <Link to="/search" className="hidden sm:flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors group">
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 lg:gap-4">
          {categories.map((cat, idx) => {
            const IconComponent = iconComponents[cat.icon]
            return (
              <motion.div
                key={cat.id}
                ref={(el) => (cardsRef.current[idx] = el)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, duration: 0.4 }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className="group block relative overflow-hidden rounded-2xl bg-gray-50"
                  onPointerEnter={handleMagneticEnter}
                  onPointerMove={handleMagneticMove}
                  onPointerLeave={handleMagneticLeave}
                >
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center">
                      {IconComponent && <IconComponent className="w-4 h-4 text-gray-700" />}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-semibold text-sm leading-tight">{cat.name}</h3>
                      <p className="text-white/60 text-xs mt-0.5">{cat.count} providers</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link to="/search" className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">
            View all categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
