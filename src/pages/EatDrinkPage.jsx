import React from 'react'
import { UtensilsCrossed } from 'lucide-react'
import Search from './Search'

export default function EatDrinkPage() {
  return (
    <div className="pt-16">
      <div className="bg-gradient-to-br from-[#050816] to-[#0a1628] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-amber-400" />
            </div>
            <span className="text-sm font-medium text-amber-400 uppercase tracking-wider">Eat & Drink</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Taste the town
          </h1>
          <p className="text-white/50 text-base max-w-xl">
            From street-side sadza to sundowner cocktails on the Zambezi — find where the locals eat and drink.
          </p>
        </div>
      </div>
      <Search defaultPillar="eat-drink" />
    </div>
  )
}
