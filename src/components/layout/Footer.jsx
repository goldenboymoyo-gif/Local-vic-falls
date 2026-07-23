import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Compass, MessageCircle, MapPin, Globe, Heart, Share2 } from 'lucide-react'

const footerLinks = {
  discover: [
    { label: 'Adventures', href: '/search?pillar=adventure' },
    { label: 'Eat & Drink', href: '/search?pillar=eat-drink' },
    { label: 'Culture & Villages', href: '/search?pillar=culture' },
    { label: 'Stay', href: '/search?pillar=stay' },
    { label: 'Nightlife', href: '/search?pillar=nightlife' },
  ],
  forHosts: [
    { label: 'Become a Host', href: '/sign-up' },
    { label: 'Host Dashboard', href: '/dashboard/host' },
    { label: 'Success Stories', href: '#' },
    { label: 'Pricing', href: '#' },
  ],
  community: [
    { label: 'Local Stories', href: '/about' },
    { label: 'Community Projects', href: '#' },
    { label: 'Events', href: '#' },
    { label: 'Volunteer', href: '#' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Safety Tips', href: '#' },
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
    <footer className="bg-[#050816] text-white relative overflow-hidden">
      {/* Giant masked typography */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <span className="block text-[8rem] sm:text-[12rem] lg:text-[18rem] font-black text-white/[0.02] leading-none text-center -mb-10 sm:-mb-16 lg:-mb-24">
          LOCAL VIC FALLS
        </span>
      </div>

      {/* WhatsApp CTA bar */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Book on WhatsApp</h3>
                <p className="text-white/40 text-sm">Quick answers, instant booking — it's how Zimbabwe communicates.</p>
              </div>
            </div>
            <a
              href="https://wa.me/263781234567?text=Hi!%20I'd%20like%20to%20know%20more%20about%20Local%20Vic%20Falls."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5C] text-white px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with us
            </a>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-md">
              <h3 className="text-lg font-semibold mb-1">Stay in the loop</h3>
              <p className="text-gray-400 text-sm">New experiences, local events, and stories from the town.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 lg:w-72 px-4 py-2.5 bg-white/[0.06] border border-white/[0.08] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-teal-400/50 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-medium rounded-xl hover:from-teal-400 hover:to-emerald-400 transition-all duration-300 shrink-0 flex items-center gap-2"
              >
                {subscribed ? <><Check className="w-4 h-4" /> Subscribed</> : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold">
                Local <span className="text-teal-400">Vic Falls</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 mb-5 leading-relaxed">
              The falls are just the start. Here's the whole town.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400 mb-5">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Victoria Falls, Zimbabwe</span>
              <span>hello@localvicfalls.com</span>
              <span>+263 78 123 4567</span>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.1] transition-colors">
                <Globe className="w-4 h-4 text-white/50" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.1] transition-colors">
                <Heart className="w-4 h-4 text-white/50" />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center hover:bg-white/[0.1] transition-colors">
                <Share2 className="w-4 h-4 text-white/50" />
              </a>
            </div>
          </div>

          {/* Link columns */}
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

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">&copy; 2026 Local Vic Falls. All rights reserved.</p>
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
