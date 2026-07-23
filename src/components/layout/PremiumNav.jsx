import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, Menu, X, Compass } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { allPlaceholderBusinesses, categories } from '../../data/mockData'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Explore', path: '/search' },
  { label: 'Experiences', path: '/search?type=experiences' },
  { label: 'Stories', path: '/about' },
  { label: 'About', path: '/about' },
]

export default function PremiumNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const inputRef = useRef(null)
  const searchWrapRef = useRef(null)

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setSearchOpen(false)
    setSearchQuery('')
  }, [location])

  useEffect(() => {
    if (!searchQuery.trim()) { setSearchResults([]); return }
    const q = searchQuery.toLowerCase()
    const matchedCats = categories
      .filter(c => c.name.toLowerCase().includes(q))
      .map(c => ({ type: 'category', name: c.name, slug: c.slug }))
    const matchedBiz = allPlaceholderBusinesses
      .filter(b => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q))
      .map(b => ({ type: 'experience', name: b.name, slug: b.slug, category: b.category }))
    setSearchResults([...matchedCats, ...matchedBiz].slice(0, 6))
  }, [searchQuery])

  useEffect(() => {
    function handleClick(e) {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) {
        setSearchOpen(false)
      }
    }
    if (searchOpen) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [searchOpen])

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchOpen])

  function handleSearch(e) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
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
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0 group" onClick={(e) => { e.preventDefault(); window.location.href = '/' }}>
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:from-emerald-400 group-hover:to-teal-500 transition-all duration-300 shadow-lg shadow-emerald-500/20">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Local <span className="text-emerald-400">Vic Falls</span>
            </span>
          </a>

          {/* Center nav links */}
          <div className="hidden lg:flex items-center gap-1 flex-1 min-w-0 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
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
          <div className="flex items-center gap-2 shrink-0">
            {/* Inline expanding search */}
            <div ref={searchWrapRef} className="relative">
              <form
                onSubmit={handleSearch}
                className={`flex items-center h-10 rounded-xl border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  searchOpen
                    ? 'w-56 sm:w-64 bg-white/[0.06] border-white/[0.12]'
                    : 'w-10 bg-transparent border-transparent hover:bg-white/[0.06]'
                }`}
              >
                <button
                  type={searchOpen ? 'submit' : 'button'}
                  onClick={() => { if (!searchOpen) setSearchOpen(true) }}
                  className="shrink-0 w-10 h-10 flex items-center justify-center text-white/50 hover:text-white rounded-xl transition-colors"
                >
                  <Search className="w-4.5 h-4.5" />
                </button>
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search experiences, places..."
                  className={`flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-white/40 min-w-0 transition-all duration-300 ${
                    searchOpen ? 'opacity-100 pr-2' : 'opacity-0 w-0'
                  }`}
                />
                {searchOpen && (
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(''); setSearchResults([]) }}
                    className="shrink-0 p-2 text-white/40 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {/* Results dropdown */}
              <AnimatePresence>
                {searchOpen && (searchResults.length > 0 || searchQuery.trim().length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-[#0a0f1e] border border-white/[0.08] rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    {searchResults.length > 0 && (
                      <div className="py-2">
                        {searchResults.map((r, i) => (
                          <Link
                            key={i}
                            to={r.type === 'category' ? `/category/${r.slug}` : `/business/${r.slug}`}
                            onClick={() => { setSearchQuery(''); setSearchOpen(false) }}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] transition-colors"
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${r.type === 'category' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/[0.06] text-white/60'}`}>
                              {r.name.charAt(0)}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-white truncate">{r.name}</div>
                              <div className="text-xs text-white/30 capitalize mt-0.5">{r.type}{r.category ? ` · ${r.category}` : ''}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}

                    {searchQuery.trim().length > 0 && searchResults.length === 0 && (
                      <div className="py-6 text-center">
                        <p className="text-sm text-white/30">No results for &quot;{searchQuery}&quot;</p>
                      </div>
                    )}

                    {searchQuery.trim().length > 0 && (
                      <div className="border-t border-white/[0.06] px-4 py-2.5">
                        <button type="submit" className="text-xs font-medium text-emerald-400 hover:text-emerald-300">
                          Search all results →
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/sign-in" className="hidden sm:inline-flex text-sm text-white/60 hover:text-white px-3 py-2 transition-colors">
              Login
            </Link>
            <Link to="/sign-up" className="hidden lg:inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-lg shadow-emerald-500/20">
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
              <Link to="/sign-up" className="px-4 py-3 text-sm font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-center mt-1">
                Become a Host
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
