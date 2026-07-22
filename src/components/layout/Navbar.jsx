import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { allPlaceholderBusinesses, categories as mockCategories } from '../../data/mockData'
import Logo from '../ui/Logo'

const categories = [
  { name: 'Electricians', slug: 'electricians' },
  { name: 'Plumbers', slug: 'plumbers' },
  { name: 'Carpenters', slug: 'carpenters' },
  { name: 'Mechanics', slug: 'mechanics' },
  { name: 'Cleaners', slug: 'cleaning-services' },
  { name: 'Photographers', slug: 'photographers' },
  { name: 'Doctors', slug: 'doctors' },
  { name: 'Salons', slug: 'salons' },
  { name: 'Lawyers', slug: 'lawyers' },
  { name: 'Tutors', slug: 'tutors' },
  { name: 'Architects', slug: 'architects' },
  { name: 'Restaurants', slug: 'restaurants' },
]

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const searchRef = useRef(null)
  const inputRef = useRef(null)

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
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchFocused(false)
      }
    }
    if (searchFocused) {
      document.addEventListener('mousedown', handleClick)
      return () => document.removeEventListener('mousedown', handleClick)
    }
  }, [searchFocused])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      return
    }
    const q = searchQuery.toLowerCase()
    const matchedCats = categories.filter(c => c.name.toLowerCase().includes(q)).map(c => ({ type: 'category', name: c.name, slug: c.slug }))
    const matchedBiz = allPlaceholderBusinesses.filter(b => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)).map(b => ({ type: 'business', name: b.name, slug: b.slug, category: b.category }))
    setSearchResults([...matchedCats, ...matchedBiz].slice(0, 6))
  }, [searchQuery])

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Browse', path: '/search' },
    { label: 'About', path: '/about' },
  ]

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-2xl border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.05)]' : 'bg-white/80 backdrop-blur-sm border-b border-white/10'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
              <Logo />
              <span className="text-lg font-bold tracking-tight">ConnectHub</span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1 px-5">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-black bg-gray-100/80'
                      : 'text-gray-500 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.span
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-blue-600 rounded-full"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              {/* Categories dropdown */}
              <div className="relative">
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className={`flex items-center gap-1 text-sm font-medium px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive('/category') || categoriesOpen
                      ? 'text-black bg-gray-100/80'
                      : 'text-gray-500 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  Categories
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Desktop search - inline input */}
            <div className="hidden md:flex items-center gap-3" ref={searchRef}>
              <div className="relative">
                <div className={`flex items-center gap-2 bg-gray-50 border rounded-full px-4 py-2 transition-all duration-300 ${searchFocused ? 'border-blue-300 bg-white shadow-lg shadow-blue-500/5 w-80' : 'border-gray-200 w-60 hover:border-gray-300'}`}>
                  <Search className="w-4 h-4 text-gray-400 shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
                      }
                      if (e.key === 'Escape') {
                        setSearchFocused(false)
                        inputRef.current?.blur()
                      }
                    }}
                    placeholder="Search services..."
                    className="flex-1 bg-transparent border-none outline-none text-sm placeholder-gray-400 min-w-0"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Search dropdown results */}
                <AnimatePresence>
                  {searchFocused && (searchResults.length > 0 || searchQuery.trim().length > 0) && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                    >
                      {searchResults.length > 0 ? (
                        <div className="py-2">
                          {searchResults.map((r, i) => (
                            <Link
                              key={i}
                              to={r.type === 'category' ? `/category/${r.slug}` : `/business/${r.slug}`}
                              onClick={() => { setSearchQuery(''); setSearchFocused(false) }}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                            >
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${r.type === 'category' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                {r.name.charAt(0)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium text-gray-800 truncate">{r.name}</div>
                                <div className="text-xs text-gray-400 capitalize mt-0.5">{r.type}{r.category ? ` · ${r.category}` : ''}</div>
                              </div>
                              <ArrowRight className="w-3.5 h-3.5 text-gray-300 ml-auto shrink-0" />
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="py-8 text-center">
                          <p className="text-sm text-gray-400">No results for "{searchQuery}"</p>
                          <Link
                            to={`/search?q=${encodeURIComponent(searchQuery)}`}
                            onClick={() => { setSearchQuery(''); setSearchFocused(false) }}
                            className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-1 inline-block"
                          >
                            Search all results
                          </Link>
                        </div>
                      )}

                      {searchQuery.trim().length > 0 && searchResults.length > 0 && (
                        <div className="border-t border-gray-100 px-4 py-2.5">
                          <Link
                            to={`/search?q=${encodeURIComponent(searchQuery)}`}
                            onClick={() => { setSearchQuery(''); setSearchFocused(false) }}
                            className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
                          >
                            View all results <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/sign-in" className="text-sm font-medium text-gray-600 hover:text-black px-3 py-2 transition-colors">Sign in</Link>
              <Link to="/sign-up" className="text-sm font-medium bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all duration-200 hover:shadow-lg hover:shadow-black/10">Get started</Link>
            </div>

            {/* Mobile toggle */}
            <button className="md:hidden p-2 -mr-2" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Categories dropdown */}
      <AnimatePresence>
        {categoriesOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setCategoriesOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="fixed top-18 left-1/2 -translate-x-1/2 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 grid grid-cols-2 gap-0.5"
            >
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/category/${cat.slug}`}
                  className="px-3 py-2.5 text-sm text-gray-600 hover:text-black hover:bg-gray-50 rounded-xl transition-colors flex items-center gap-2"
                  onClick={() => setCategoriesOpen(false)}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  {cat.name}
                </Link>
              ))}
              <Link to="/search" className="col-span-2 px-3 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl mt-1 border-t border-gray-100 pt-3 flex items-center gap-1" onClick={() => setCategoriesOpen(false)}>
                View all categories <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 top-16 bg-white z-40 md:hidden overflow-y-auto"
          >
            <div className="p-4 flex flex-col gap-1">
              {/* Mobile search */}
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 mb-3">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
                      setMobileOpen(false)
                    }
                  }}
                  placeholder="Search services..."
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                />
              </div>

              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive(link.path) ? 'bg-gray-100 text-black' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <button className="flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl hover:bg-gray-50" onClick={() => setCategoriesOpen(!categoriesOpen)}>
                Categories
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${categoriesOpen ? 'rotate-180' : ''}`} />
              </button>

              {categoriesOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="pl-4 flex flex-col gap-1 overflow-hidden"
                >
                  {categories.map(cat => (
                    <Link key={cat.slug} to={`/category/${cat.slug}`} className="px-4 py-2 text-sm text-gray-600 hover:text-black rounded-lg hover:bg-gray-50" onClick={() => setMobileOpen(false)}>
                      {cat.name}
                    </Link>
                  ))}
                </motion.div>
              )}

              <div className="border-t border-gray-100 my-3" />
              <p className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Quick Access</p>
              <Link to="/dashboard/customer" className="px-4 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors" onClick={() => setMobileOpen(false)}>
                <div className="font-medium">Customer Portal</div>
                <div className="text-xs text-gray-500">customer@connecthub.com</div>
              </Link>
              <Link to="/dashboard/provider" className="px-4 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors" onClick={() => setMobileOpen(false)}>
                <div className="font-medium">Service Provider</div>
                <div className="text-xs text-gray-500">electrician@connecthub.com</div>
              </Link>
              <Link to="/dashboard/admin" className="px-4 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition-colors" onClick={() => setMobileOpen(false)}>
                <div className="font-medium">Admin Portal</div>
                <div className="text-xs text-gray-500">admin@connecthub.com</div>
              </Link>

              <div className="border-t border-gray-100 my-3" />
              <Link to="/sign-in" className="px-4 py-3 text-sm font-medium rounded-xl hover:bg-gray-50" onClick={() => setMobileOpen(false)}>Sign in</Link>
              <Link to="/sign-up" className="px-4 py-3 text-sm font-medium bg-black text-white rounded-xl mt-1 text-center" onClick={() => setMobileOpen(false)}>Get started</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
