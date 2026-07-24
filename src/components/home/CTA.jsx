import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Users, Compass, Headphones } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: Shield, label: 'Verified hosts' },
  { icon: Users, label: '15K+ visitors' },
  { icon: Compass, label: 'Instant booking' },
  { icon: Headphones, label: 'Support 24/7' },
]

export default function CTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none none' },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-[var(--color-surface)] overflow-hidden">
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8 lg:px-12 py-24 lg:py-32 text-center">
        <div className="cta-content">
          <span className="section-label justify-center">Get started</span>
          <h2 className="section-title text-center mx-auto" style={{ maxWidth: '36rem' }}>
            Ready to discover Victoria Falls?
          </h2>
          <p className="section-subtitle mx-auto text-center mt-4">
            Find, book, and manage unforgettable experiences — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              to="/sign-up"
              className="btn btn-primary btn-lg"
            >
              Become a Host
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/booking"
              className="btn btn-primary btn-lg"
            >
              Book Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-12">
            {features.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 text-sm text-[var(--color-ink-light)]">
                <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-[var(--color-primary)]" />
                </div>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
