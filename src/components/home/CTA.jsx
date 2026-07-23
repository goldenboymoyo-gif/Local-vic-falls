import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Users, Compass, Headphones, MessageCircle } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  { icon: Shield, label: 'Verified hosts' },
  { icon: Users, label: '15K+ visitors' },
  { icon: Compass, label: 'Instant booking' },
  { icon: Headphones, label: 'WhatsApp support' },
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
    <section ref={sectionRef} className="relative bg-gray-50 overflow-hidden">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32 text-center">
        <div className="cta-content">
          <span className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em]">
            Get started
          </span>
          <h2 className="text-3xl lg:text-[2.75rem] font-bold mt-4 tracking-tight leading-[1.08] text-gray-900">
            Ready to discover Victoria Falls?
          </h2>
          <p className="text-gray-500 mt-5 text-base leading-relaxed max-w-lg mx-auto">
            Find, book, and manage unforgettable experiences — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
            <Link
              to="/sign-up"
              className="magnetic-btn inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-8 py-3.5 rounded-full text-sm font-semibold hover:from-teal-400 hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-teal-500/20"
            >
              Become a Host
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/263781234567?text=Hi!%20I'd%20like%20to%20know%20more%20about%20Local%20Vic%20Falls."
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic-btn inline-flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-[#25D366]/20 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </a>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-5 mt-10">
            {features.map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 text-sm text-gray-500">
                <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                  <item.icon className="w-3.5 h-3.5 text-gray-400" />
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
