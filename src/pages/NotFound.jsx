import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, Search, Grid3X3, MessageCircle, ArrowRight } from 'lucide-react'

const quickLinks = [
  { label: 'Browse Experiences', to: '/search', icon: Grid3X3 },
  { label: 'Search Adventures', to: '/search?pillar=adventure', icon: Search },
  { label: 'Contact Support', to: '/contact', icon: MessageCircle },
]

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-[#f8f9fa] relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(59,130,246,0.08), transparent 70%)',
        }}
      />

      <div className="relative text-center max-w-lg px-4">
        <div className="text-[10rem] font-black leading-none text-gray-100 select-none mb-2">404</div>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 -mt-8">Page not found</h1>
        <p className="text-gray-500 text-sm sm:text-base mb-10 leading-relaxed max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-black text-white px-7 py-3.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors mb-12"
        >
          <Home className="w-4 h-4" />
          Go Home
        </Link>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {quickLinks.map(({ label, to, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-2 px-5 py-2.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-full hover:border-gray-300 hover:shadow-sm transition-all"
            >
              <Icon className="w-4 h-4" />
              {label}
              <ArrowRight className="w-3.5 h-3.5 opacity-40" />
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
