import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, MapPin, Star, MessageCircle } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cultureListings } from '../../data/listings'

gsap.registerPlugin(ScrollTrigger)

export default function CultureSection() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.cul-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0, duration: 0.7, delay: i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const featured = cultureListings[0]
  const rest = cultureListings.slice(1)

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-[#fafafa] relative overflow-hidden">
      {/* Subtle texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0d9488 1px, transparent 0)', backgroundSize: '24px 24px' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="cul-header text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] font-medium text-amber-600 uppercase tracking-[0.2em]">
            Culture, Schools & Villages
          </span>
          <h2 className="text-3xl lg:text-[2.5rem] font-bold mt-3 tracking-tight leading-[1.1] text-gray-900">
            The version tourists rarely see
          </h2>
          <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-lg mx-auto">
            Monde Village, Chinotimba Township, heritage centres. More than a waterfall.
          </p>
        </div>

        {/* Featured story — large */}
        <div
          ref={(el) => { cardsRef.current[0] = el }}
          className="group relative rounded-2xl overflow-hidden h-[400px] lg:h-[480px] mb-6 cursor-pointer"
        >
          <img
            src={featured.image}
            alt={featured.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute inset-0 p-8 lg:p-12 flex flex-col justify-end max-w-2xl">
            <span className="inline-flex items-center gap-1.5 self-start text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 mb-4">
              {featured.type}
            </span>
            <h3 className="text-2xl lg:text-3xl font-bold text-white tracking-tight mb-3">{featured.name}</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">{featured.description}</p>
            <div className="flex items-center gap-4 mb-5 text-white/40 text-xs">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.duration}</span>
              <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />{featured.rating} ({featured.reviews})</span>
              <span className="font-bold text-white">{featured.price} {featured.priceNote}</span>
            </div>
            <a
              href={featured.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5C] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 w-fit"
            >
              <MessageCircle className="w-4 h-4" />
              Book on WhatsApp
            </a>
          </div>
        </div>

        {/* Other culture listings */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {rest.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => { cardsRef.current[i + 1] = el }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500"
            >
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-gray-800">
                  {item.type}
                </span>
                <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white text-xs font-bold">{item.rating}</span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-gray-900 font-bold text-sm tracking-tight mb-1.5 group-hover:text-amber-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-3">{item.shortDesc}</p>
                <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-3">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{item.duration}</span>
                  <span className="font-semibold text-gray-900">{item.price} {item.priceNote}</span>
                </div>
                {item.whatsapp && (
                  <a
                    href={item.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white text-xs font-semibold py-2.5 rounded-xl transition-all duration-200 border border-[#25D366]/20"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Book on WhatsApp
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
