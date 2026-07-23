import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Compass } from 'lucide-react'

const footerLinks = {
  discover: [
    { label: 'Explore Victoria Falls', href: '/search' },
    { label: 'Adventures', href: '/search?type=adventures' },
    { label: 'Restaurants & Cafés', href: '/search?category=restaurants' },
    { label: 'Hotels & Lodges', href: '/search?category=hotels' },
    { label: 'Hidden Gems', href: '/search?category=hidden-gems' },
  ],
  forHosts: [
    { label: 'Become a Host', href: '/sign-up' },
    { label: 'Host Dashboard', href: '/dashboard/provider' },
    { label: 'Success Stories', href: '#' },
    { label: 'Host Resources', href: '#' },
    { label: 'Pricing', href: '#' },
  ],
  community: [
    { label: 'Local Stories', href: '/about' },
    { label: 'Community Projects', href: '/search?category=community' },
    { label: 'Cultural Experiences', href: '/search?category=cultural-tours' },
    { label: 'Events', href: '/search?category=events' },
    { label: 'Volunteer', href: '#' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Safety Tips', href: '#' },
    { label: 'Community Guidelines', href: '#' },
    { label: 'Report Abuse', href: '#' },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-[#0a0a0a] text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-md">
              <h3 className="text-lg font-semibold mb-1">Stay in the loop</h3>
              <p className="text-gray-400 text-sm">Get updates on new experiences, events, and local news from Victoria Falls.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 lg:w-72 px-4 py-2.5 bg-white/10 border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-medium rounded-xl hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shrink-0 flex items-center gap-2"
              >
                {subscribed ? <><Check className="w-4 h-4" /> Subscribed</> : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold">
                Local <span className="text-emerald-400">Vic Falls</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              The digital heartbeat of Victoria Falls. Discover, explore, and book authentic local experiences.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <span>Victoria Falls, Zimbabwe</span>
              <span>hello@localvicfalls.com</span>
              <span>+263 78 123 4567</span>
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-gray-300">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group">
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 Local Vic Falls. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy</Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-white transition-colors">Terms</Link>
            <Link to="#" className="text-sm text-gray-500 hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
