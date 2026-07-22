import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Users, Zap, Headphones } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: Shield, label: 'Verified providers' },
  { icon: Users, label: '15K+ customers' },
  { icon: Zap, label: 'Instant booking' },
  { icon: Headphones, label: '24/7 support' },
]

export default function CTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-left',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.cta-right',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      gsap.fromTo(
        '.cta-pill',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-pills',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-black overflow-hidden">
      {/* Dot grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row min-h-[540px] md:min-h-[480px]">
          {/* Left: text */}
          <div className="cta-left flex flex-col justify-center w-full md:w-1/2 py-16 md:py-20 md:pr-16">
            <span className="text-[11px] font-medium text-white/40 uppercase tracking-[0.2em]">
              Get started
            </span>
            <h2 className="text-3xl lg:text-[2.75rem] font-bold mt-4 tracking-tight leading-[1.08] text-white">
              Ready to find your next trusted service?
            </h2>
            <p className="text-white/40 mt-5 text-base leading-relaxed max-w-lg">
              Join thousands of happy customers. Find, book, and manage
              trusted local services — all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                to="/sign-up"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors duration-200"
              >
                Get started
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center justify-center gap-2 text-sm font-medium text-white/70 px-8 py-3.5 border border-white/15 rounded-full hover:border-white/30 hover:text-white transition-colors duration-200"
              >
                Browse services
              </Link>
            </div>

            {/* Feature pills */}
            <div className="cta-pills flex flex-wrap gap-4 mt-10">
              {features.map((item) => (
                <div
                  key={item.label}
                  className="cta-pill flex items-center gap-2.5 text-sm text-white/50"
                >
                  <div className="w-7 h-7 rounded-full bg-white/[0.07] flex items-center justify-center">
                    <item.icon className="w-3.5 h-3.5 text-white/60" />
                  </div>
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          {/* Right: image + stats */}
          <div className="cta-right w-full md:w-1/2 relative flex items-center justify-center py-8 md:py-16">
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&h=500&fit=crop&q=80"
                alt="Connect with trusted professionals"
                className="w-full h-[300px] md:h-[360px] object-cover rounded-2xl"
              />
              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl" />

              {/* Stats floating on image */}
              <div className="absolute bottom-5 left-5 right-5 flex gap-3">
                <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
                  <div className="text-xl font-bold text-white">2,500+</div>
                  <div className="text-[11px] text-white/50 mt-0.5">Providers</div>
                </div>
                <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
                  <div className="text-xl font-bold text-white">4.8</div>
                  <div className="text-[11px] text-white/50 mt-0.5">Avg Rating</div>
                </div>
                <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl px-4 py-3 border border-white/10">
                  <div className="text-xl font-bold text-white">50K+</div>
                  <div className="text-[11px] text-white/50 mt-0.5">Bookings</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
