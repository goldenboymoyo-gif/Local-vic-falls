import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Search as SearchIcon, SlidersHorizontal, Star, MapPin, Grid3X3, List, X,
  TrendingUp, Building2, Zap, Droplets, Camera, Sparkles, Stethoscope, Scissors, ChevronLeft,
} from 'lucide-react'
import { featuredBusinesses, categories } from '../data/mockData'

const allBusinesses = [
  ...featuredBusinesses,
  { id: 7, name: 'Green Valley Cleaning Co.', slug: 'green-valley-cleaning', category: 'Cleaning Services', rating: 4.7, reviews: 203, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop', logo: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop&q=80', city: 'Victoria Falls', verified: true, featured: false },
  { id: 8, name: 'Royal Beauty Salon', slug: 'royal-beauty', category: 'Salon', rating: 4.8, reviews: 312, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop', logo: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop&q=80', city: 'Victoria Falls', verified: true, featured: false },
  { id: 9, name: 'Zambezi Legal Partners', slug: 'zambezi-legal', category: 'Lawyer', rating: 4.9, reviews: 87, image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop', logo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&h=100&fit=crop&q=80', city: 'Victoria Falls', verified: true, featured: false },
  { id: 10, name: 'Elite Fitness Studio', slug: 'elite-fitness', category: 'Fitness Trainer', rating: 4.6, reviews: 145, image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&h=400&fit=crop', logo: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=100&h=100&fit=crop&q=80', city: 'Victoria Falls', verified: false, featured: false },
]

const trendingSearches = [
  { label: 'Electricians', icon: 'Zap' },
  { label: 'Plumbers', icon: 'Droplets' },
  { label: 'Photographers', icon: 'Camera' },
  { label: 'Cleaners', icon: 'Sparkles' },
  { label: 'Doctors', icon: 'Stethoscope' },
  { label: 'Salons', icon: 'Scissors' },
]

const iconMap = { Zap, Droplets, Camera, Sparkles, Stethoscope, Scissors }

const topRatedBusinesses = [...featuredBusinesses].sort((a, b) => b.rating - a.rating).slice(0, 3)

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)
  const filterPanelRef = useRef(null)
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minRating: '',
    city: searchParams.get('city') || '',
    sort: searchParams.get('sort') || 'relevance',
  })

  const filtered = allBusinesses.filter((b) => {
    if (query && !b.name.toLowerCase().includes(query.toLowerCase()) && !b.category.toLowerCase().includes(query.toLowerCase())) return false
    if (filters.category && b.category !== filters.category) return false
    if (filters.minRating && b.rating < parseFloat(filters.minRating)) return false
    if (filters.city && !b.city.toLowerCase().includes(filters.city.toLowerCase())) return false
    return true
  })

  const sorted = [...filtered].sort((a, b) => {
    if (filters.sort === 'rating') return b.rating - a.rating
    if (filters.sort === 'reviews') return b.reviews - a.reviews
    return 0
  })

  const filterSelectsRef = useRef([])

  function handleFilterKeyDown(e, index) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = index + 1
      if (next < filterSelectsRef.current.length) filterSelectsRef.current[next].focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prev = index - 1
      if (prev >= 0) filterSelectsRef.current[prev].focus()
    }
  }

  const hasActiveFilters = filters.category || filters.minRating || filters.city || filters.sort !== 'relevance'
  const noQuery = !query && sorted.length === allBusinesses.length

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>

      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-200 focus-within:border-gray-400 transition-colors">
              <SearchIcon className="w-5 h-5 text-gray-400" />
              <input
                type="text" value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services, businesses, professionals..."
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
                showFilters || hasActiveFilters ? 'bg-black text-white border-black' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
              {hasActiveFilters && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
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
              ref={filterPanelRef}
              initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden" role="region" aria-label="Filters"
            >
              <div className="py-4 flex flex-wrap gap-3 border-t border-gray-100 mt-4">
                <select
                  ref={el => filterSelectsRef.current[0] = el}
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  onKeyDown={(e) => handleFilterKeyDown(e, 0)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 text-gray-700"
                  aria-label="Filter by category"
                >
                  <option value="">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.name}>{c.name}</option>
                  ))}
                </select>
                <select
                  ref={el => filterSelectsRef.current[1] = el}
                  value={filters.minRating}
                  onChange={(e) => setFilters({ ...filters, minRating: e.target.value })}
                  onKeyDown={(e) => handleFilterKeyDown(e, 1)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 text-gray-700"
                  aria-label="Filter by minimum rating"
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+</option>
                  <option value="4">4.0+</option>
                  <option value="3.5">3.5+</option>
                </select>
                <input
                  type="text" placeholder="City..." value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none w-32 focus:border-gray-400 text-gray-700"
                  aria-label="Filter by city"
                />
                <select
                  ref={el => filterSelectsRef.current[2] = el}
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                  onKeyDown={(e) => handleFilterKeyDown(e, 2)}
                  className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-gray-400 text-gray-700"
                  aria-label="Sort by"
                >
                  <option value="relevance">Sort: Relevance</option>
                  <option value="rating">Sort: Rating</option>
                  <option value="reviews">Sort: Most Reviews</option>
                </select>
                {hasActiveFilters && (
                  <button
                    onClick={() => setFilters({ category: '', minRating: '', city: '', sort: 'relevance' })}
                    className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-50"
                    aria-label="Clear all filters"
                  >
                    Clear all
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
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Trending Searches</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {trendingSearches.map((item) => {
                  const Icon = iconMap[item.icon]
                  return (
                    <Link
                      key={item.label}
                      to={`/search?q=${item.label.toLowerCase()}`}
                      className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
                      onClick={() => { setQuery(item.label); window.scrollTo(0, 0) }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                        {Icon && <Icon className="w-5 h-5 text-gray-500" />}
                      </div>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">{item.label}</span>
                    </Link>
                  )
                })}
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Building2 className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Top Rated</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {topRatedBusinesses.map((biz) => (
                  <Link
                    key={biz.id}
                    to={`/business/${biz.slug}`}
                    className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all group"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                      <img src={biz.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-sm text-gray-900 group-hover:text-blue-600 transition-colors truncate">{biz.name}</h3>
                      <span className="text-xs text-gray-500">{biz.category}</span>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-medium">{biz.rating}</span>
                        <span className="text-xs text-gray-400">({biz.reviews})</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Grid3X3 className="w-5 h-5 text-gray-400" />
                <h2 className="text-lg font-semibold text-gray-900">Browse by Category</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.slice(0, 12).map((c) => (
                  <Link
                    key={c.slug}
                    to={`/category/${c.slug}`}
                    className="px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors text-gray-700"
                  >
                    {c.name}
                  </Link>
                ))}
                <Link to="/search" className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition-colors">
                  View all categories →
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900">All Businesses</h3>
              <p className="text-sm text-gray-400">{sorted.length} available</p>
            </div>
          </>
        )}

        {query && sorted.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              {sorted.length} {sorted.length === 1 ? 'result' : 'results'} for "<strong className="text-gray-900">{query}</strong>"
            </p>
            {(filters.category || filters.city) && (
              <p className="text-sm text-gray-400">
                {filters.category && `in ${filters.category}`}
                {filters.city && (filters.category ? `, ${filters.city}` : `in ${filters.city}`)}
              </p>
            )}
          </div>
        )}

        {sorted.length > 0 && (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'flex flex-col gap-4'}>
            {sorted.map((biz, i) => (
              <motion.div key={biz.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03, duration: 0.4 }}>
                <Link
                  to={`/business/${biz.slug}`}
                  className={`group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 ${viewMode === 'list' ? 'flex' : ''}`}
                >
                  <div className={viewMode === 'list' ? 'w-48 shrink-0' : ''}>
                    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'aspect-square' : 'aspect-[16/10]'}`}>
                      <img src={biz.image} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      {biz.featured && (
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-3 py-1 rounded-full">Featured</div>
                      )}
                    </div>
                  </div>
                  <div className="p-4 flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors break-words line-clamp-2">{biz.name}</h3>
                        <span className="text-sm text-gray-500 mt-0.5 block">{biz.category}</span>
                      </div>
                      {biz.verified && <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full shrink-0 mt-0.5">Verified</span>}
                    </div>
                    <div className="flex items-center gap-3 mt-3 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{biz.rating}</span>
                        <span className="text-gray-400">({biz.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {biz.city}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {sorted.length === 0 && (query || hasActiveFilters) && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center py-20 max-w-lg mx-auto">
            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <SearchIcon className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
            <p className="text-gray-500 text-sm mb-8">
              {query && hasActiveFilters
                ? `We couldn't find anything for "${query}" with the current filters.`
                : query
                  ? `We couldn't find anything for "${query}". Try a different search term.`
                  : `We couldn't find anything with the current filters. Try adjusting them.`
              }
            </p>
            <div className="space-y-3">
              {query && !hasActiveFilters && (
                <div>
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Suggestions</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {['Electrician', 'Plumber', 'Photographer', 'Cleaner', 'Mechanic'].map((s) => (
                      <Link key={s} to={`/search?q=${s.toLowerCase()}`} className="px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700" onClick={() => { setQuery(s.toLowerCase()); window.scrollTo(0, 0) }}>{s}</Link>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex items-center justify-center gap-3">
                {hasActiveFilters && (
                  <button onClick={() => setFilters({ category: '', minRating: '', city: '', sort: 'relevance' })} className="px-5 py-2.5 text-sm font-medium border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">Clear filters</button>
                )}
                {query && (
                  <button onClick={() => setQuery('')} className="px-5 py-2.5 text-sm font-medium bg-black text-white rounded-xl hover:bg-gray-800 transition-colors">Browse all businesses</button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
