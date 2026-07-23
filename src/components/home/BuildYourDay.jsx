import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Share2, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { vibeOptions, timeBudgets, buildItinerary } from '../../data/listings'

gsap.registerPlugin(ScrollTrigger)

export default function BuildYourDay() {
  const sectionRef = useRef(null)
  const [vibe, setVibe] = useState(null)
  const [timeBudget, setTimeBudget] = useState(null)
  const [itinerary, setItinerary] = useState([])
  const resultRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.byd-header', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', toggleActions: 'play none none none' }
      })
      gsap.from('.byd-step', {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.byd-steps', start: 'top 85%', once: true }
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (vibe && timeBudget) {
      const result = buildItinerary(vibe, timeBudget)
      setItinerary(result)
      if (resultRef.current) {
        gsap.fromTo(resultRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
        )
      }
    }
  }, [vibe, timeBudget])

  function shareWhatsApp() {
    const text = itinerary.map((item, i) => `${i + 1}. ${item.name} — ${item.price}`).join('\n')
    window.open(`https://wa.me/?text=${encodeURIComponent(`My Vic Falls Day:\n\n${text}\n\nBuilt with Local Vic Falls`)}`, '_blank')
  }

  return (
    <section id="build-your-day" ref={sectionRef} className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="byd-header text-center mb-14">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-teal-600 uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5" />
            Build Your Day
          </span>
          <h2 className="text-3xl lg:text-[2.5rem] font-bold mt-3 tracking-tight leading-[1.1] text-gray-900">
            Plan your perfect Vic Falls day
          </h2>
          <p className="text-gray-400 mt-3 text-sm leading-relaxed max-w-md mx-auto">
            Pick a vibe, pick a time. We'll build your day.
          </p>
        </div>

        {/* Steps */}
        <div className="byd-steps space-y-8">
          {/* Step 1: Pick a vibe */}
          <div className="byd-step">
            <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">1. Pick your vibe</h3>
            <div className="flex flex-wrap gap-3">
              {vibeOptions.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVibe(v.id)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                    vibe === v.id
                      ? `bg-gradient-to-r ${v.color} text-white border-transparent shadow-lg`
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                  }`}
                >
                  <span className="text-lg">{v.emoji}</span>
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Time budget */}
          {vibe && (
            <div className="byd-step">
              <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">2. How much time?</h3>
              <div className="flex flex-wrap gap-3">
                {timeBudgets.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTimeBudget(t.id)}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                      timeBudget === t.id
                        ? 'bg-teal-500 text-white border-transparent shadow-lg shadow-teal-500/20'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300'
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result */}
          {itinerary.length > 0 && (
            <div ref={resultRef} className="byd-step">
              <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-4">Your day</h3>
              <div className="space-y-3">
                {itinerary.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-teal-500/15 flex items-center justify-center text-teal-600 text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-gray-900 font-semibold text-sm truncate">{item.name}</h4>
                      <p className="text-gray-500 text-xs truncate">{item.shortDesc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-gray-900 font-bold text-sm">{item.price}</span>
                      <span className="text-gray-400 text-[10px] block">{item.priceNote}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={shareWhatsApp}
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5C] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200"
                >
                  <Share2 className="w-4 h-4" />
                  Share on WhatsApp
                </button>
                <button
                  onClick={() => { setVibe(null); setTimeBudget(null); setItinerary([]) }}
                  className="text-gray-400 text-sm hover:text-gray-600 transition-colors"
                >
                  Start over
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
