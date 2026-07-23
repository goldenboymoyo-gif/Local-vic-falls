import React, { useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { ArrowRight, Search, Star, CheckCircle, ChevronLeft, Clock, MessageCircle } from 'lucide-react'
import { gsap } from 'gsap'
import { adventures, eatDrink, cultureListings, stayListings, pillarCategories } from '../data/listings'

const pillarIcons = {
  adventure: adventures,
  'eat-drink': eatDrink,
  culture: cultureListings,
  stay: stayListings,
}

const pillarDescriptions = {
  adventure: 'Grade 5 rapids, 111m bungee drops, gorge swings, helicopter tours — the Zambezi doesn\'t do half measures.',
  'eat-drink': 'Oxtail at GOAT, tapas at Lola\'s, sundowners above the gorge — the town eats well.',
  culture: 'Monde Village, Chinotimba Township, Jafuta Heritage Centre — the real Vic Falls.',
  stay: 'From backpacker dorms to riverside lodges — where you rest shapes how you explore.',
  nightlife: 'Rooftop bars, drum shows, township pubs — when the sun drops, Vic Falls wakes up.',
}

export default function CategoryPage() {
  const { slug } = useParams()
  const category = pillarCategories.find(c => c.slug === slug)
  const listings = pillarIcons[slug] || []
  const description = pillarDescriptions[slug] || category?.description || ''

  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, stagger: 0.08, ease: 'power3.out',
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [slug, listings])

  if (!category) {
    return (
      <div className="pt-32 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-6 h-6 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Category not found</h2>
        <p className="text-gray-500 text-sm mb-4">This category doesn't exist yet.</p>
        <Link to="/search" className="text-teal-600 text-sm font-medium">Browse all categories &rarr;</Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero banner */}
      <section className="relative h-[340px] lg:h-[420px] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16 w-full">
            <Link to="/search" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white mb-6 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to browse
            </Link>
            <span className="inline-block text-xs font-medium text-white/70 uppercase tracking-[0.2em] mb-3">
              Category
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              {category.name}
            </h1>
            <p className="text-white/70 text-base lg:text-lg mt-2 max-w-xl">
              {description}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>{listings.length} listings available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Listings */}
        <div ref={sectionRef}>
          {listings.length > 0 && (
            <div className="mb-14">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em]">
                    Featured
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold mt-1 text-gray-900">
                    {category.name}
                  </h2>
                </div>
                <Link to="/search" className="hidden sm:flex items-center gap-1 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((item, i) => (
                  <div
                    key={item.id}
                    ref={(el) => (cardsRef.current[i] = el)}
                  >
                    <Link
                      to={`/business/${item.slug}`}
                      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
                    >
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        {item.badges && item.badges[0] && (
                          <span className="absolute top-3 left-3 bg-teal-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> {item.badges[0]}
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors break-words line-clamp-2">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                        <div className="flex items-center gap-3 mt-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                            <span className="font-medium text-gray-800">{item.rating}</span>
                            <span className="text-gray-400">({item.reviews})</span>
                          </div>
                          {item.price && (
                            <span className="text-teal-600 font-semibold">{item.price}</span>
                          )}
                        </div>
                        {item.duration && (
                          <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            {item.duration}
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-6 sm:hidden">
                <Link to="/search" className="inline-flex items-center gap-1 text-sm font-medium text-teal-600">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {listings.length === 0 && (
            <div className="text-center py-20 mb-14">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-gray-500">No listings in this category yet.</p>
              <Link to="/search" className="inline-flex items-center gap-1 text-teal-600 text-sm font-medium mt-3">
                Browse all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
