import React, { useEffect, useRef } from 'react'
import { Star } from 'lucide-react'
import { testimonials } from '../../data/mockData'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cardBg = [
  'bg-blue-50/70 border-blue-100',
  'bg-white border-gray-100',
  'bg-emerald-50/60 border-emerald-100',
  'bg-white border-gray-100',
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current.children, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      })

      gsap.from('.testimonial-card', {
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.testimonial-grid',
          start: 'top 82%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="text-xs font-medium text-blue-600 uppercase tracking-widest block">
            Testimonials
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mt-3 tracking-tight">
            What our customers say
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            Real stories from real people who found trusted services through ConnectHub.
          </p>
        </div>

        <div className="testimonial-grid grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto">
          <div className="testimonial-card md:col-span-2 rounded-2xl border border-gray-100 p-8 lg:p-10 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-0.5 mb-5">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-800 leading-relaxed text-lg lg:text-xl font-medium mb-8 relative">
                &ldquo;{testimonials[0].content}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={testimonials[0].avatar}
                alt={testimonials[0].name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-blue-100"
              />
              <div>
                <div className="font-bold text-base">{testimonials[0].name}</div>
                <div className="text-sm text-gray-500">{testimonials[0].role}</div>
              </div>
            </div>
          </div>

          <div className={`testimonial-card rounded-2xl border p-6 lg:p-8 flex flex-col justify-between ${cardBg[1]}`}>
            <div>
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed text-sm mb-6">
                &ldquo;{testimonials[1].content}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={testimonials[1].avatar}
                alt={testimonials[1].name}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-sm">{testimonials[1].name}</div>
                <div className="text-xs text-gray-500">{testimonials[1].role}</div>
              </div>
            </div>
          </div>

          <div className={`testimonial-card rounded-2xl border p-6 lg:p-8 flex flex-col justify-between ${cardBg[2]}`}>
            <div>
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed text-sm mb-6">
                &ldquo;{testimonials[2].content}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={testimonials[2].avatar}
                alt={testimonials[2].name}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-sm">{testimonials[2].name}</div>
                <div className="text-xs text-gray-500">{testimonials[2].role}</div>
              </div>
            </div>
          </div>

          <div className={`testimonial-card rounded-2xl border p-6 lg:p-8 flex flex-col justify-between ${cardBg[0]}`}>
            <div>
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed text-sm mb-6">
                &ldquo;{testimonials[3].content}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={testimonials[3].avatar}
                alt={testimonials[3].name}
                className="w-11 h-11 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-sm">{testimonials[3].name}</div>
                <div className="text-xs text-gray-500">{testimonials[3].role}</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card hidden md:flex rounded-2xl border border-gray-100 p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-gray-100/50 flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-blue-600 fill-blue-600" />
            </div>
            <p className="text-sm font-semibold text-gray-800 mb-1">Join 15,000+ happy customers</p>
            <p className="text-xs text-gray-500">Share your experience on ConnectHub</p>
          </div>
        </div>
      </div>
    </section>
  )
}
