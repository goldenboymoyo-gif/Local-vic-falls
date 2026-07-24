import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, Menu, X, Compass, ChevronDown } from 'lucide-react'
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
  const [searchFocused, setSearchFocused] = useState(false)
  const searchWrapRef = useRef(null)
  const searchInputRef = useRef(null)

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname === path
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
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
        setSearchFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setSearchFocused(false)
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled
        ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.05)] border-b border-[var(--color-border-light)]'
        : 'bg-transparent'
    }`}>
      <div className="container-premium">
        <div className="flex items-center justify-between h-16 lg:h-[4.5rem] gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
              scrolled ? 'bg-[var(--color-primary)]' : 'bg-white/10 backdrop-blur-sm'
            }`}>
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? 'text-[var(--color-ink)]' : 'text-white'
            }`}>
              Local <span className={scrolled ? 'text-[var(--color-primary)]' : 'text-white/80'}>Vic Falls</span>
            </span>
          </Link>

          {/* Center nav links */}
          <div className="hidden lg:flex items-center justify-center gap-1 flex-1 min-w-0">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isActive(link.path)
                    ? scrolled
                      ? 'text-[var(--color-primary)] bg-[var(--color-primary)]/5'
                      : 'text-white bg-white/10'
                    : scrolled
                      ? 'text-[var(--color-ink-light)] hover:text-[var(--color-ink)] hover:bg-black/[0.03]'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 rounded-full ${
                      scrolled ? 'bg-[var(--color-primary)]' : 'bg-white'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search */}
            <div ref={searchWrapRef} className="relative hidden lg:block">
              <form onSubmit={handleSearch} className={`flex items-center h-10 rounded-xl px-3.5 gap-2 transition-all duration-300 ${
                searchFocused
                  ? 'w-72 bg-white shadow-lg ring-1 ring-[var(--color-primary)]/20'
                  : scrolled
                    ? 'w-56 bg-[var(--color-surface)] border border-[var(--color-border)]'
                    : 'w-56 bg-white/10 backdrop-blur-sm border border-white/15'
              }`}>
                <Search className={`w-4 h-4 shrink-0 transition-colors ${
                  searchFocused
                    ? 'text-[var(--color-primary)]'
                    : scrolled ? 'text-[var(--color-ink-muted)]' : 'text-white/50'
                }`} />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  placeholder="Search experiences..."
                  className={`flex-1 bg-transparent border-none outline-none text-sm min-w-0 transition-colors ${
                    searchFocused
                      ? 'text-[var(--color-ink)] placeholder-[var(--color-ink-muted)]'
                      : scrolled
                        ? 'text-[var(--color-ink)] placeholder-[var(--color-ink-muted)]'
                        : 'text-white placeholder-white/50'
                  }`}
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className={`shrink-0 transition-colors ${
                    scrolled ? 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]' : 'text-white/40 hover:text-white'
                  }`}>
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Results dropdown */}
              <AnimatePresence>
                {searchQuery.trim().length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-[var(--color-border-light)] overflow-hidden z-50"
                  >
                    {searchResults.length > 0 ? (
                      <div className="py-2">
                        {searchResults.map((r, i) => (
                          <Link
                            key={i}
                            to={r.type === 'category' ? `/${r.slug}` : `/search?q=${encodeURIComponent(r.name)}`}
                            onClick={() => { setSearchQuery(''); setSearchFocused(false) }}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-surface)] transition-colors"
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                              r.type === 'category' ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : 'bg-[var(--color-surface-warm)] text-[var(--color-ink-light)]'
                            }`}>
                              {r.name.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-[var(--color-ink)] truncate">{r.name}</div>
                              <div className="text-xs text-[var(--color-ink-muted)] capitalize mt-0.5">{r.type}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center">
                        <p className="text-sm text-[var(--color-ink-muted)]">No results for &quot;{searchQuery}&quot;</p>
                      </div>
                    )}

                    <div className="border-t border-[var(--color-border-light)] px-4 py-2.5">
                      <button type="submit" className="text-xs font-medium text-[var(--color-primary)] hover:text-[var(--color-primary-dark)]">
                        Search all results →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/sign-in" className={`hidden sm:inline-flex text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
              scrolled ? 'text-[var(--color-ink-light)] hover:text-[var(--color-ink)] hover:bg-black/[0.03]' : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}>
              Login
            </Link>
            <Link to="/sign-up" className={`hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 ${
              scrolled
                ? 'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-dark)] shadow-sm hover:shadow-md'
                : 'bg-white/10 backdrop-blur-sm text-white border border-white/15 hover:bg-white/15'
            }`}>
              Become a Host
            </Link>

            {/* Mobile toggle */}
            <button
              className={`lg:hidden p-2 -mr-2 rounded-lg transition-colors ${
                scrolled ? 'text-[var(--color-ink)] hover:bg-black/[0.03]' : 'text-white hover:bg-white/10'
              }`}
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
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden bg-white border-t border-[var(--color-border-light)]"
          >
            <div className="container-premium py-4 flex flex-col gap-1">
              {/* Mobile search */}
              <form onSubmit={handleSearch} className="flex items-center h-11 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl px-3.5 gap-2 mb-2">
                <Search className="w-4 h-4 text-[var(--color-ink-muted)] shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search experiences..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--color-ink)] placeholder-[var(--color-ink-muted)] min-w-0"
                />
              </form>

              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive(link.path)
                      ? 'bg-[var(--color-primary)]/5 text-[var(--color-primary)]'
                      : 'text-[var(--color-ink-light)] hover:text-[var(--color-ink)] hover:bg-[var(--color-surface)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-px bg-[var(--color-border-light)] my-2" />
              <Link to="/sign-in" className="px-4 py-3 text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] rounded-xl hover:bg-[var(--color-surface)]">
                Login
              </Link>
              <Link to="/sign-up" className="btn btn-primary w-full justify-center mt-1">
                Become a Host
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
