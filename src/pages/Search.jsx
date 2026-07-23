import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Search as SearchIcon, SlidersHorizontal, Star, MapPin, Grid3X3, List, X,
  ChevronLeft, Mountain, UtensilsCrossed, Users, Hotel, Music, Clock, MessageCircle,
} from 'lucide-react'
import { adventures, eatDrink, cultureListings, stayListings, pillarCategories } from '../data/listings'

const allListings = [
  ...adventures.map(a => ({ ...a, type: 'adventure' })),
  ...eatDrink.map(e => ({ ...e, type: 'eat-drink' })),
  ...cultureListings.map(c => ({ ...c, type: 'culture' })),
  ...stayListings.map(s => ({ ...s, type: 'stay' })),
]

const pillarIcons = { adventure: Mountain, 'eat-drink': UtensilsCrossed, culture: Users, stay: Hotel, nightlife: Music }

const pillarFilterOptions = [
  { slug: 'adventure', label: 'Adventures' },
  { slug: 'eat-drink', label: 'Eat & Drink' },
  { slug: 'culture', label: 'Culture' },
  { slug: 'stay', label: 'Stay' },
  { slug: 'nightlife', label: 'Nightlife' },
]

export default function Search() {
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialPillar = searchParams.get('pillar') || ''
  const [query, setQuery] = useState(initialQuery)
  const [pillar, setPillar] = useState(initialPillar)
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = allListings.filter((item) => {
    if (pillar && item.type !== pillar) return false
    if (query) {
      const q = query.toLowerCase()
      const searchable = `${item.name} ${item.category || ''} ${item.description || ''} ${item.pillar || ''}`.toLowerCase()
      if (!searchable.includes(q)) return false
    }
    return true
  })

  const noQuery = !query && !pillar

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>

      {/* Search bar + filters */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200 focus-within:border-gray-400 transition-colors">
              <SearchIcon className="w-5 h-5 text-gray-400" />
              <input
                type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search adventures, restaurants, tours, hotels..."
                className="flex-1 bg-transparent border-none outline-none text-sm" aria-label="Search"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-gray-400 hover:text-gray-600" aria-label="Clear search">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                showFilters || pillar ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
              {pillar && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
            </button>
            <div className="hidden sm:flex items-center border border-gray-200 rounded-xl overflow-hidden" role="group" aria-label="View mode">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                aria-pressed={viewMode === 'grid'} aria-label="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'bg-white text-gray-400 hover:bg-gray-50'}`}
                aria-pressed={viewMode === 'list'} aria-label="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden" role="region" aria-label="Filters"
            >
              <div className="py-4 flex flex-wrap gap-3 border-t border-gray-100 mt-4">
                <div className="flex flex-wrap gap-2">
                  {pillarFilterOptions.map((p) => {
                    const Icon = pillarIcons[p.slug]
                    return (
                      <button
                        key={p.slug}
                        onClick={() => setPillar(pillar === p.slug ? '' : p.slug)}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                          pillar === p.slug
                            ? 'bg-black text-white border-black'
                            : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {Icon && <Icon className="w-3.5 h-3.5" />}
                        {p.label}
                      </button>
                    )
                  })}
                </div>
                {pillar && (
                  <button
                    onClick={() => setPillar('')}
                    className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-50"
                    aria-label="Clear filter"
                  >
                    Clear
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {noQuery && (
          <>
            {/* Browse by pillar */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Grid3X3 className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Browse by Pillar</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {pillarCategories.map((p) => {
                  const Icon = pillarIcons[p.slug]
                  return (
                    <button
                      key={p.slug}
                      onClick={() => { setPillar(p.slug); window.scrollTo(0, 0) }}
                      className="flex flex-col items-center gap-2 p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                        {Icon && <Icon className="w-6 h-6 text-teal-600" />}
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">{p.name}</span>
                      <span className="text-xs text-gray-400">{p.count} listings</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Top rated */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Top Rated</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[...allListings].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 3).map((item) => (
                  <Link
                    key={item.id}
                    to={`/business/${item.slug}`}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-sm text-gray-900 group-hover:text-teal-600 transition-colors truncate">{item.name}</h3>
                      <span className="text-xs text-gray-500">{item.category}</span>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium">{item.rating}</span>
                        <span className="text-xs text-gray-400">({item.reviews})</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">All Listings</h3>
              <p className="text-sm text-gray-400">{filtered.length} available</p>
            </div>
          </>
        )}

        {query && filtered.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              {filtered.length} {filtered.length === 1 ? 'result' : 'results'} for "<strong className="text-gray-900">{query}</strong>"
            </p>
            {pillar && (
              <p className="text-sm text-gray-400">in {pillarFilterOptions.find(p => p.slug === pillar)?.label}</p>
            )}
          </div>
        )}

        {filtered.length > 0 && (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4'}>
            {filtered.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03, duration: 0.4 }}>
                <Link
                  to={`/business/${item.slug}`}
                  className={`group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''}`}
                >
                  <div className={viewMode === 'list' ? 'w-48 shrink-0' : ''}>
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'aspect-square' : 'aspect-[16/10]'}`}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {item.badges && item.badges[0] && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full">{item.badges[0]}</div>
                      )}
                    </div>
                  </div>
                  <div className="p-4 flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors break-words line-clamp-2">{item.name}</h3>
                        <span className="text-sm text-gray-500 mt-0.5 block">{item.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{item.rating}</span>
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
              </motion.div>
            ))}
          </div>
        )}

        {filtered.length === 0 && (query || pillar) && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20 max-w-lg mx-auto">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500 text-sm mb-8">
              {query
                ? `We couldn't find anything for "${query}". Try a different search term.`
                : 'No listings in this category yet.'
              }
            </p>
            <div className="flex items-center justify-center gap-3">
              {pillar && (
                <button onClick={() => setPillar('')} className="px-5 py-2.5 text-sm font-medium border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">Clear filter</button>
              )}
              {query && (
                <button onClick={() => setQuery('')} className="px-5 py-2.5 text-sm font-medium bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">Browse all</button>
              )}
            </div>
          </motion.div>
        )}

        {!query && !pillar && (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4'}>
            {allListings.map((item, i) => (
              <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03, duration: 0.4 }}>
                <Link
                  to={`/business/${item.slug}`}
                  className={`group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''}`}
                >
                  <div className={viewMode === 'list' ? 'w-48 shrink-0' : ''}>
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'aspect-square' : 'aspect-[16/10]'}`}>
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {item.badges && item.badges[0] && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full">{item.badges[0]}</div>
                      )}
                    </div>
                  </div>
                  <div className="p-4 flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors break-words line-clamp-2">{item.name}</h3>
                        <span className="text-sm text-gray-500 mt-0.5 block">{item.category}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{item.rating}</span>
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
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
