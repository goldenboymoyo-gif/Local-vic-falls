import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Camera, Music, UtensilsCrossed, Compass, Users, Map } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const hostTypes = [
  { icon: Compass, title: 'Tour Guides', desc: 'Share your knowledge of Victoria Falls' },
  { icon: UtensilsCrossed, title: 'Restaurants & Cafés', desc: 'Showcase your cuisine' },
  { icon: Camera, title: 'Photographers', desc: 'Capture the beauty of the Falls' },
  { icon: Music, title: 'Cultural Performers', desc: 'Share music and dance' },
  { icon: Users, title: 'Community Hosts', desc: 'Open your village to visitors' },
  { icon: Map, title: 'Adventure Operators', desc: 'Lead thrilling experiences' },
]

export default function BecomeHost() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.host-content', {
        x: -50, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
      })
      gsap.from('.host-card', {
        x: 50, opacity: 0, duration: 0.9, ease: 'power3.out', delay: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
      })
      gsap.from('.host-type', {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: '.host-types-grid', start: 'top 85%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div className="host-content">
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest">Become a Host</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 tracking-tight leading-tight">
              Share what makes Victoria Falls unique
            </h2>
            <p className="text-white/60 mt-4 leading-relaxed max-w-lg">
              Local Vic Falls empowers residents, businesses, and community organizations to become hosts and share authentic experiences with visitors from around the world.
            </p>
            <p className="text-white/60 mt-3 leading-relaxed max-w-lg">
              Whether you're a tour guide, restaurant owner, cultural performer, or community leader — there's a place for you on Local Vic Falls.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                to="/sign-up"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-900 px-8 py-3.5 rounded-2xl text-sm font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Start Hosting Today
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white/70 px-8 py-3.5 border border-white/15 rounded-2xl hover:border-white/30 hover:text-white transition-colors duration-200"
              >
                Learn more
              </Link>
            </div>
          </div>

          {/* Right side — host types grid */}
          <div className="host-card">
            <div className="host-types-grid grid grid-cols-2 gap-3">
              {hostTypes.map((type) => (
                <div
                  key={type.title}
                  className="host-type p-4 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] hover:bg-white/[0.1] hover:border-white/[0.15] transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-3">
                    <type.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">{type.title}</h3>
                  <p className="text-white/40 text-xs mt-1 leading-relaxed">{type.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
