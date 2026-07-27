import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Tag, Clock, ArrowRight } from 'lucide-react'

export default function ExperienceCard({ image, title, category, price, duration, slug }) {
  const [saved, setSaved] = useState(false)

  return (
    <Link
      to={`/business/${slug}`}
      className="relative w-[260px] sm:w-[280px] shrink-0 rounded-2xl overflow-hidden group cursor-pointer block shadow-[0_4px_24px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.2)] transition-shadow duration-400"
    >
      {/* ── Photo area ──────────────────────────────────────────────────── */}
      <div className="relative h-[320px] sm:h-[340px]">
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Save / heart button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSaved(!saved) }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center hover:bg-black/35 transition-colors z-10"
          aria-label={saved ? 'Remove from saved' : 'Save experience'}
        >
          <Heart
            className={`w-4 h-4 transition-colors duration-200 ${
              saved ? 'fill-[var(--color-accent)] text-[var(--color-accent)]' : 'text-white'
            }`}
          />
        </button>

        {/* Dark gradient overlay — transparent top, solid bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        {/* ── Text content overlaid on photo ─────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col">
          <h3
            className="text-lg font-bold text-white leading-tight mb-0.5"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {title}
          </h3>
          <p className="text-[0.7rem] text-white/50 font-medium tracking-wide uppercase mb-3">
            {category}
          </p>

          {/* Detail row: price · duration */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className="flex items-center gap-1 text-xs text-white/65">
              <Tag className="w-3 h-3" />
              {price}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/25" />
            <span className="flex items-center gap-1 text-xs text-white/65">
              <Clock className="w-3 h-3" />
              {duration}
            </span>
          </div>

          {/* Book / View button */}
          <span className="btn btn-secondary w-full justify-center py-2.5 text-sm relative z-[2] pointer-events-none">
            View Experience
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform group-hover:translate-x-0.5 relative z-[2]" />
          </span>
        </div>
      </div>
    </Link>
  )
}
