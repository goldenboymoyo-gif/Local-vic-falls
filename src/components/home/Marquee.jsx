import React from 'react'
import { marqueeQuotes, marqueeTags } from '../../data/listings'

// Two marquee strips: review quotes + category tags
export function QuoteMarquee() {
  const doubled = [...marqueeQuotes, ...marqueeQuotes]

  return (
    <div className="bg-[#050816] border-y border-white/[0.06] overflow-hidden py-4">
      <div className="marquee-track">
        {doubled.map((q, i) => (
          <div key={i} className="shrink-0 px-8 flex items-center gap-3">
            <span className="text-white/50 text-sm italic whitespace-nowrap">"{q.text}"</span>
            <span className="text-white/25 text-xs whitespace-nowrap">— {q.author}</span>
            <span className="text-teal-500/30 mx-4">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TagMarquee() {
  const doubled = [...marqueeTags, ...marqueeTags]

  return (
    <div className="bg-[#050816] overflow-hidden py-3">
      <div className="marquee-track-reverse">
        {doubled.map((tag, i) => (
          <span
            key={i}
            className="shrink-0 mx-2 px-4 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] text-white/30 border border-white/[0.06] whitespace-nowrap"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
