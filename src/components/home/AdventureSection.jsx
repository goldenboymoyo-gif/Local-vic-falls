import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Clock, ArrowRight, Heart, Share2, MessageCircle } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { adventures } from '../../data/listings'

gsap.registerPlugin(ScrollTrigger)

export default function AdventureSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [showCursor, setShowCursor] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.adv-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.7, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  function handleMouseMove(e) {
    setCursorPos({ x: e.clientX, y: e.clientY })
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-[#050816] relative overflow-hidden"
      onMouseEnter={() => setShowCursor(true)}
      onMouseLeave={() => setShowCursor(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Cursor glow — desktop only */}
      {showCursor && (
        <div
          className="cursor-glow hidden lg:block"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        />
      )}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="adv-header flex items-end justify-between mb-14">
          <div>
            <span className="text-[11px] font-medium text-teal-400 uppercase tracking-[0.2em]">
              Adventure & Adrenaline
            </span>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold mt-3 tracking-tight leading-[1.1] text-white">
              The Zambezi doesn't do half measures
            </h2>
            <p className="text-white/40 mt-3 text-sm leading-relaxed max-w-md">
              Grade 5 rapids, 111m bungee drops, gorge swings — all below the world's largest curtain of falling water.
            </p>
          </div>
          <Link
            to="/adventures"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-teal-400 transition-colors group"
          >
            View all adventures
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Cards grid — Klook style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {adventures.slice(0, 8).map((adv, i) => (
            <div
              key={adv.id}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group bg-white/[0.04] backdrop-blur-sm rounded-2xl overflow-hidden border border-white/[0.06] hover:border-teal-500/30 hover:shadow-2xl hover:shadow-teal-500/5 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-white/[0.04]">
                <img
                  src={adv.image}
                  alt={adv.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                  {adv.badges?.slice(0, 2).map((badge) => (
                    <span key={badge} className="bg-teal-500 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <button className="w-7 h-7 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-colors">
                    <Heart className="w-3.5 h-3.5 text-white/70" />
                  </button>
                  <button className="w-7 h-7 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-colors">
                    <Share2 className="w-3.5 h-3.5 text-white/70" />
                  </button>
                </div>

                {/* Price badge — Klook style */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-lg">
                  <span className="text-[10px] text-gray-500 block leading-none">{adv.priceNote}</span>
                  <span className="text-lg font-black text-gray-900 leading-none">{adv.price}</span>
                </div>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-bold">{adv.rating}</span>
                  <span className="text-white/50 text-[10px]">({adv.reviews})</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-medium text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">{adv.category}</span>
                  <div className="flex items-center gap-1 text-white/30">
                    <Clock className="w-3 h-3" />
                    <span className="text-[10px]">{adv.duration}</span>
                  </div>
                </div>

                <h3 className="text-white font-bold text-sm tracking-tight mb-1.5 line-clamp-1 group-hover:text-teal-400 transition-colors">
                  {adv.name}
                </h3>

                <p className="text-white/35 text-xs leading-relaxed line-clamp-2 mb-4">
                  {adv.shortDesc}
                </p>

                {/* WhatsApp CTA */}
                <a
                  href={adv.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BA5C] text-white text-xs font-semibold py-2.5 rounded-xl transition-colors duration-200"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Book on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
