import React, { useEffect, useRef } from 'react'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '../../data/mockData'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const cardBg = [
  'bg-[var(--color-primary)]/5 border-[var(--color-primary)]/10',
  'bg-white border-[var(--color-border-light)]',
  'bg-[var(--color-surface-warm)] border-[var(--color-border-light)]',
  'bg-white border-[var(--color-border-light)]',
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
    <section ref={sectionRef} className="section bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container-premium relative">
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16 lg:mb-20">
          <span className="section-label justify-center block">
            Testimonials
          </span>
          <h2 className="section-title">What our customers say</h2>
          <p className="section-subtitle mx-auto">
            Real stories from real people who discovered amazing experiences through Local Vic Falls.
          </p>
        </div>

        <div className="testimonial-grid grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-auto">
          <div className="testimonial-card md:col-span-2 rounded-2xl border border-[var(--color-primary)]/10 p-8 lg:p-10 bg-gradient-to-br from-[var(--color-primary)]/5 via-white to-[var(--color-primary)]/5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[var(--color-primary)]/5 rounded-full blur-3xl pointer-events-none" />
            <div>
              <Quote className="w-8 h-8 text-[var(--color-primary)]/20 mb-4" />
              <p className="text-[var(--color-ink)] leading-relaxed text-lg lg:text-xl font-medium mb-8 relative">
                &ldquo;{testimonials[0].content}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img
                src={testimonials[0].avatar}
                alt={testimonials[0].name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-[var(--color-primary)]/10"
              />
              <div>
                <div className="font-bold text-base text-[var(--color-ink)]">{testimonials[0].name}</div>
                <div className="text-sm text-[var(--color-ink-muted)]">{testimonials[0].role}</div>
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
              <p className="text-[var(--color-ink-light)] leading-relaxed text-sm mb-6">
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
                <div className="font-semibold text-sm text-[var(--color-ink)]">{testimonials[1].name}</div>
                <div className="text-xs text-[var(--color-ink-muted)]">{testimonials[1].role}</div>
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
              <p className="text-[var(--color-ink-light)] leading-relaxed text-sm mb-6">
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
                <div className="font-semibold text-sm text-[var(--color-ink)]">{testimonials[2].name}</div>
                <div className="text-xs text-[var(--color-ink-muted)]">{testimonials[2].role}</div>
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
              <p className="text-[var(--color-ink-light)] leading-relaxed text-sm mb-6">
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
                <div className="font-semibold text-sm text-[var(--color-ink)]">{testimonials[3].name}</div>
                <div className="text-xs text-[var(--color-ink-muted)]">{testimonials[3].role}</div>
              </div>
            </div>
          </div>

          <div className="testimonial-card hidden md:flex rounded-2xl border border-[var(--color-border-light)] p-6 lg:p-8 bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-surface-warm)]/50 flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-[var(--color-primary)] fill-[var(--color-primary)]" />
            </div>
            <p className="text-sm font-semibold text-[var(--color-ink)] mb-1">Join 15,000+ happy customers</p>
            <p className="text-xs text-[var(--color-ink-muted)]">Share your experience on Local Vic Falls</p>
          </div>
        </div>
      </div>
    </section>
  )
}
