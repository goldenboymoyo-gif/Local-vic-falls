import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, Menu, X, Compass } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { pillarCategories, adventures, eatDrink } from '../../data/listings'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Explore', path: '/search' },
  { label: 'Adventures', path: '/adventures' },
  { label: 'Eat & Drink', path: '/eat-drink' },
  { label: 'Culture', path: '/culture' },
]

export default function PremiumNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const searchWrapRef = useRef(null)
  const searchInputRef = useRef(null)

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname === path
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchQuery('')
  }, [location])

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return }
    const q = searchQuery.toLowerCase()
    const matchedCats = pillarCategories
      .filter(c => c.name.toLowerCase().includes(q))
      .map(c => ({ type: 'category', name: c.name, slug: c.slug }))
    const matchedAdv = adventures
      .filter(a => a.name.toLowerCase().includes(q) || a.category.toLowerCase().includes(q))
      .map(a => ({ type: 'experience', name: a.name, slug: a.slug }))
    const matchedEat = eatDrink
      .filter(e => e.name.toLowerCase().includes(q) || e.category.toLowerCase().includes(q))
      .map(e => ({ type: 'experience', name: e.name, slug: e.slug }))
    setSearchResults([...matchedCats, ...matchedAdv, ...matchedEat].slice(0, 6))
  }, [searchQuery])

  useEffect(() => {
    function handleClick(e) {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchResults([])
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  useEffect(() => {
    if (searchInputRef.current) searchInputRef.current.focus()
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-[#050816]/95 backdrop-blur-2xl border-b border-white/[0.06]'
        : 'bg-[#050816]'
    }`}>
      <div className="max-w-[95%] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="flex items-center justify-between h-16 lg:h-18 gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:from-teal-400 group-hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-teal-500/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Local <span className="text-teal-400">Vic Falls</span>
            </span>
          </Link>

          {/* Center nav links */}
          <div className="hidden lg:flex items-center justify-center gap-1 flex-1 min-w-0">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isActive(link.path)
                    ? 'text-white bg-white/[0.08]'
                    : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search input — always open */}
            <div ref={searchWrapRef} className="relative hidden lg:block">
              <form onSubmit={handleSearch} className="flex items-center h-10 w-56 bg-white/[0.06] border border-white/[0.10] rounded-xl px-3 gap-2 focus-within:border-teal-500/40 transition-colors">
                <Search className="w-4 h-4 text-white/40 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search experiences..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-white/40 min-w-0"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="text-white/40 hover:text-white shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Results dropdown */}
              <AnimatePresence>
                {searchQuery.trim().length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-[#0a0f1e] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    {searchResults.length > 0 ? (
                      <div className="py-2">
                        {searchResults.map((r, i) => (
                          <Link
                            key={i}
                            to={r.type === 'category' ? `/${r.slug}` : `/search?q=${encodeURIComponent(r.name)}`}
                            onClick={() => setSearchQuery('')}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors"
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${r.type === 'category' ? 'bg-teal-500/20 text-teal-400' : 'bg-white/[0.06] text-white/60'}`}>
                              {r.name.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-white truncate">{r.name}</div>
                              <div className="text-xs text-white/30 capitalize mt-0.5">{r.type}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="py-5 text-center">
                        <p className="text-sm text-white/30">No results for &quot;{searchQuery}&quot;</p>
                      </div>
                    )}

                    <div className="border-t border-white/[0.06] px-4 py-2.5">
                      <button type="submit" className="text-xs font-medium text-teal-400 hover:text-teal-300">
                        Search all results →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/sign-in" className="hidden sm:inline-flex text-sm text-white/60 hover:text-white px-3 py-2 transition-colors">
              Login
            </Link>
            <Link to="/sign-up" className="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-5 py-2.5 rounded-xl hover:from-teal-400 hover:to-emerald-400 transition-all duration-300 shadow-lg shadow-teal-500/20">
              Become a Host
            </Link>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 -mr-2 text-white/70 hover:text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-[#050816]/95 backdrop-blur-2xl border-t border-white/[0.06]"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="flex items-center h-10 bg-white/[0.06] border border-white/[0.10] rounded-xl px-3 gap-2 mb-2 lg:hidden">
                <Search className="w-4 h-4 text-white/40 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search experiences..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-white/40 min-w-0"
                />
              </form>

              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive(link.path)
                      ? 'bg-white/[0.08] text-white'
                      : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/[0.06] my-2" />
              <Link to="/sign-in" className="px-4 py-3 text-sm text-white/60 hover:text-white rounded-xl hover:bg-white/[0.04]">
                Login
              </Link>
              <Link to="/sign-up" className="px-4 py-3 text-sm font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl text-center mt-1">
                Become a Host
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
