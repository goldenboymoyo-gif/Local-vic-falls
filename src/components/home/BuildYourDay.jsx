import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Sparkles, RotateCcw } from 'lucide-react'
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

  return (
    <section id="build-your-day" ref={sectionRef} className="section bg-white relative overflow-hidden">
      <div className="container-premium max-w-4xl relative z-10">
        {/* Header */}
        <div className="byd-header text-center mb-12">
          <span className="section-label justify-center">
            <Sparkles className="w-3.5 h-3.5" />
            Build Your Day
          </span>
          <h2 className="section-title">Plan your perfect Vic Falls day</h2>
          <p className="section-subtitle mx-auto">
            Pick a vibe, pick a time. We'll build your day.
          </p>
        </div>

        {/* Steps */}
        <div className="byd-steps space-y-8">
          {/* Step 1: Pick a vibe */}
          <div className="byd-step">
            <h3 className="text-[var(--color-ink-muted)] text-xs font-semibold uppercase tracking-wider mb-4">1. Pick your vibe</h3>
            <div className="flex flex-wrap gap-3">
              {vibeOptions.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setVibe(v.id)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                    vibe === v.id
                      ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-[var(--color-primary)]/15'
                      : 'bg-[var(--color-surface)] text-[var(--color-ink-light)] border-[var(--color-border)] hover:bg-[var(--color-surface-warm)] hover:border-[var(--color-border)]'
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
              <h3 className="text-[var(--color-ink-muted)] text-xs font-semibold uppercase tracking-wider mb-4">2. How much time?</h3>
              <div className="flex flex-wrap gap-3">
                {timeBudgets.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTimeBudget(t.id)}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 border ${
                      timeBudget === t.id
                        ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)] shadow-md shadow-[var(--color-primary)]/15'
                        : 'bg-[var(--color-surface)] text-[var(--color-ink-light)] border-[var(--color-border)] hover:bg-[var(--color-surface-warm)] hover:border-[var(--color-border)]'
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
              <h3 className="text-[var(--color-ink-muted)] text-xs font-semibold uppercase tracking-wider mb-4">Your day</h3>
              <div className="space-y-3">
                {itinerary.map((item, i) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 bg-[var(--color-surface)] border border-[var(--color-border-light)] rounded-xl p-4 hover:bg-white hover:shadow-sm transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[var(--color-ink)] font-semibold text-sm truncate">{item.name}</h4>
                      <p className="text-[var(--color-ink-muted)] text-xs truncate">{item.shortDesc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[var(--color-ink)] font-bold text-sm">{item.price}</span>
                      <span className="text-[var(--color-ink-muted)] text-[10px] block">{item.priceNote}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 mt-6">
                <Link
                  to="/booking"
                  className="btn btn-primary"
                >
                  Book Now
                </Link>
                <button
                  onClick={() => { setVibe(null); setTimeBudget(null); setItinerary([]) }}
                  className="btn btn-ghost text-[var(--color-ink-muted)]"
                >
                  <RotateCcw className="w-4 h-4" />
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
