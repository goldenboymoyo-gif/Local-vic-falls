import React, { useRef, useEffect } from 'react'
import { Star, Clock, MessageCircle, Flame } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { adventures } from '../../data/listings'

gsap.registerPlugin(ScrollTrigger)

const mustDoIds = ['adv-5', 'adv-1', 'adv-2', 'adv-6', 'adv-7']
const mustDo = mustDoIds
  .map(id => adventures.find(a => a.id === id))
  .filter(Boolean)
  .map((item, i) => ({ ...item, rank: i + 1 }))

export default function MustDoSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.must-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 40, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="must-header text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-amber-600 uppercase tracking-[0.2em]">
            <Flame className="w-3.5 h-3.5" />
            Don't Miss
          </span>
          <h2 className="text-3xl lg:text-[2.5rem] font-bold mt-3 tracking-tight leading-[1.1] text-gray-900">
            Must-do experiences
          </h2>
          <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-md mx-auto">
            The five things you can't leave Victoria Falls without doing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {mustDo.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 hover:border-amber-200 transition-all duration-500"
            >
              {/* Rank badge */}
              <div className="absolute top-3 left-3 z-10 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-[#050816] text-sm font-black shadow-lg shadow-amber-500/30">
                {item.rank}
              </div>

              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                {/* Price */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-lg">
                  <span className="text-[10px] text-gray-500 block leading-none">{item.priceNote}</span>
                  <span className="text-lg font-black text-gray-900 leading-none">{item.price}</span>
                </div>

                {/* Rating */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-bold">{item.rating}</span>
                  <span className="text-white/50 text-[10px]">({item.reviews})</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-gray-900 font-bold text-sm tracking-tight line-clamp-1 group-hover:text-amber-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2 leading-relaxed">
                  {item.shortDesc}
                </p>
                <div className="flex items-center gap-2 mt-3 text-[10px] text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{item.duration}</span>
                </div>
                <a
                  href={item.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white text-xs font-semibold py-2.5 rounded-xl transition-all duration-200 border border-[#25D366]/20 mt-3"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  Book
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
