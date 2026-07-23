import React, { useRef, useEffect, useState } from 'react'
import { Users, Building2, Compass, Briefcase, Heart, Calendar } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const impactStats = [
  { icon: Users, value: 500, suffix: '+', label: 'Local Hosts' },
  { icon: Building2, value: 200, suffix: '+', label: 'Experiences Listed' },
  { icon: Compass, value: 15000, suffix: '+', label: 'Visitors Connected' },
  { icon: Briefcase, value: 1200, suffix: '+', label: 'Local Jobs Supported' },
  { icon: Heart, value: 50, suffix: '+', label: 'Community Projects' },
  { icon: Calendar, value: 100, suffix: '+', label: 'Events Hosted' },
]

function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const duration = 2000
          const start = Date.now()
          const tick = () => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(eased * value))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function CommunityImpact() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.impact-header', {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      })
      gsap.from('.impact-card', {
        y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.impact-grid', start: 'top 85%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(16,185,129,0.05) 1px, transparent 0)',
        backgroundSize: '32px 32px',
      }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="impact-header text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-medium text-emerald-600 uppercase tracking-widest">Community Impact</span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-3 tracking-tight">
            Growing together with Victoria Falls
          </h2>
          <p className="text-gray-500 mt-3 text-sm max-w-md mx-auto">
            Every booking supports local communities, creates jobs, and preserves culture.
          </p>
        </div>

        <div className="impact-grid grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {impactStats.map((stat) => (
            <div
              key={stat.label}
              className="impact-card text-center p-6 lg:p-8 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-gray-500 mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
