import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Compass, MapPin, Heart } from 'lucide-react'

const footerLinks = {
  discover: [
    { label: 'Adventures', href: '/adventures' },
    { label: 'Eat & Drink', href: '/eat-drink' },
    { label: 'Culture & Villages', href: '/culture' },
    { label: 'Stay', href: '/search?pillar=stay' },
    { label: 'Nightlife', href: '/search?pillar=nightlife' },
  ],
  forHosts: [
    { label: 'Become a Host', href: '/sign-up' },
  ],
  company: [
    { label: 'Contact', href: '/contact' },
  ],
  support: [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Help Center', href: '/contact' },
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
    <footer className="bg-[#2D2420] text-white relative overflow-hidden">
      {/* Giant masked typography */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none select-none overflow-hidden">
        <span className="block text-[8rem] sm:text-[12rem] lg:text-[18rem] font-black text-white/[0.02] leading-none text-center -mb-10 sm:-mb-16 lg:-mb-24" style={{ fontFamily: 'var(--font-display)' }}>
          LOCAL VIC FALLS
        </span>
      </div>

      {/* Newsletter */}
      <div className="border-b border-white/[0.06]">
        <div className="container-premium py-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-md">
              <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: 'var(--font-display)' }}>Stay in the loop</h3>
              <p className="text-[#C4B8AA] text-sm">New experiences, local events, and stories from the town.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex w-full lg:w-auto gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 lg:w-72 px-4 py-2.5 bg-white/[0.06] border border-white/[0.1] rounded-xl text-sm text-white placeholder-[#7A6E64] focus:outline-none focus:border-[var(--color-primary)]/50 focus:ring-2 focus:ring-[var(--color-primary)]/10 transition-all"
              />
              <button
                type="submit"
                className="btn btn-accent shrink-0"
              >
                {subscribed ? <><Check className="w-4 h-4" /> Subscribed</> : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-premium py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--color-primary)] rounded-xl flex items-center justify-center">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>
                Local <span className="text-[var(--color-primary-light)]">Vic Falls</span>
              </span>
            </Link>
            <p className="text-sm text-[#9B8E84] mb-5 leading-relaxed">
              The falls are just the start. Here's the whole town.
            </p>
            <div className="flex flex-col gap-2 text-sm text-[#9B8E84] mb-5">
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Victoria Falls, Zimbabwe</span>
              <span>hello@localvicfalls.com</span>
              <span>+263 78 123 4567</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([key, links]) => (
            <div key={key}>
              <h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-[#C4B8AA]">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-[#9B8E84] hover:text-white transition-colors flex items-center gap-1 group">
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
        <div className="container-premium py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#7A6E64]">&copy; 2026 Local Vic Falls. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="text-sm text-[#7A6E64] hover:text-white transition-colors">Privacy</Link>
            <Link to="/contact" className="text-sm text-[#7A6E64] hover:text-white transition-colors">Terms</Link>
            <Link to="/contact" className="text-sm text-[#7A6E64] hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
