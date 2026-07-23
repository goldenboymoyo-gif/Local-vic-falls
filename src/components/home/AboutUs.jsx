import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Users, Heart, Target } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const values = [
  { icon: Shield, title: 'Verified Providers', desc: 'Every professional is background-checked and verified.' },
  { icon: Users, title: 'Community Driven', desc: 'Built for local communities, by people who care.' },
  { icon: Target, title: 'Quality Guaranteed', desc: 'Real reviews ensure top-notch service every time.' },
  { icon: Heart, title: 'Customer First', desc: 'Dedicated support for every booking and inquiry.' },
]

export default function AboutUs() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.about-content', {
        opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="about-content">
            <span className="text-xs font-medium text-blue-400 uppercase tracking-widest">About Local Vic Falls</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 tracking-tight leading-tight">
              Your gateway to authentic Victoria Falls
            </h2>
            <p className="text-white/50 mt-4 leading-relaxed max-w-lg">
              Local Vic Falls is the digital heartbeat of Victoria Falls, connecting tourists, locals, businesses, and communities in one immersive platform.
            </p>
            <p className="text-white/50 mt-3 leading-relaxed max-w-lg">
              From world-class restaurants and thrilling adventures to cultural experiences and hidden gems — discover the real Victoria Falls.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 mt-8 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors group"
            >
              Learn more about us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {values.map((v, i) => (
              <div
                key={v.title}
                className={`p-5 rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-all duration-300 ${i === 1 ? 'mt-6' : ''} ${i === 3 ? 'mt-6' : ''}`}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
                  <v.icon className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-sm">{v.title}</h3>
                <p className="text-white/40 text-xs mt-1 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
