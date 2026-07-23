import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, User, ShieldCheck, Eye } from 'lucide-react'
import { placeholderAccounts } from '../../data/mockData'

const roleIcons = { Customer: User, 'Service Provider': ShieldCheck, Admin: Eye }

export default function DemoShowcase() {
  return (
    <section className="py-24 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.04)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">Quick Access</span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-3 tracking-tight">
            Explore the platform with pre-configured accounts
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            No registration needed. Click any account to see how Local Vic Falls works for visitors, hosts, and admins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {placeholderAccounts.map((acc, i) => {
            const Icon = roleIcons[acc.role] || User
            return (
              <motion.div
                key={acc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to={acc.dashboard}
                  className="group block bg-white rounded-2xl p-6 lg:p-8 border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1">{acc.name}</h3>
                  <span className="inline-block text-xs font-medium text-blue-600 bg-blue-50 px-3 py-0.5 rounded-full mb-3">{acc.role}</span>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4">{acc.description}</p>
                  <div className="text-xs text-gray-400 bg-gray-50 rounded-xl px-3 py-2">
                    <span className="font-medium text-gray-600">{acc.email}</span>
                    <br />
                    <span className="text-gray-500">{acc.password}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-1 text-sm font-medium text-blue-600 group-hover:gap-2 transition-all">
                    <LogIn className="w-4 h-4" />
                    Open dashboard
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            These are read-only preview accounts. No real data is stored.
          </p>
        </div>
      </div>
    </section>
  )
}
