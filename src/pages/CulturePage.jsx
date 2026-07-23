import React from 'react'
import { Users } from 'lucide-react'
import Search from './Search'

export default function CulturePage() {
  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-[#050816] to-[#0a1628] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-rose-500/20 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-rose-400" />
            </div>
            <span className="text-sm font-medium text-rose-400 uppercase tracking-wider">Culture & Villages</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Meet the community
          </h1>
          <p className="text-white/50 text-base max-w-xl">
            Village visits, art markets, cultural shows, and heritage tours — connect with the real Victoria Falls.
          </p>
        </div>
      </div>
      <Search defaultPillar="culture" />
    </div>
  )
}
