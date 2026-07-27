import React from 'react'

const marqueeQuotes = [
  { text: 'Best rafting I have ever done', author: 'Sarah, UK' },
  { text: 'The helicopter flight was unreal', author: 'Marco, Italy' },
  { text: 'GOAT restaurant is a must', author: 'Aisha, Dubai' },
  { text: 'Devil\'s Pool changed my life', author: 'James, Australia' },
  { text: 'The town eats so well', author: 'Nomsa, Harare' },
  { text: 'Bungee was the biggest rush', author: 'Chipo, Bulawayo' },
]

const marqueeTags = [
  'White-Water Rafting', 'Bungee Jump', 'Helicopter Tour', 'Sunset Cruise',
  'Devil\'s Pool', 'Gorge Swing', 'Walking Safari', 'Village Tour',
  'GOAT Restaurant', 'Lola\'s Tapas', 'Lookout Cafe', 'The Boma',
  'Ilala Lodge', 'Safari Lodge', 'Explorers Village',
]

export function QuoteMarquee() {
  const doubled = [...marqueeQuotes, ...marqueeQuotes]

  return (
    <div className="bg-[#2D2420] border-y border-white/[0.06] overflow-hidden py-4">
      <div className="marquee-track">
        {doubled.map((q, i) => (
          <div key={i} className="shrink-0 px-8 flex items-center gap-3">
            <span className="text-white/50 text-sm italic whitespace-nowrap font-light">"{q.text}"</span>
            <span className="text-white/25 text-xs whitespace-nowrap">— {q.author}</span>
            <span className="text-[var(--color-primary)]/30 mx-4">•</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TagMarquee() {
  const doubled = [...marqueeTags, ...marqueeTags]

  return (
    <div className="bg-[#2D2420] overflow-hidden py-3">
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
