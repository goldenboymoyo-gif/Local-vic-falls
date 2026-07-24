import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, User, ShieldCheck, Eye, Zap } from 'lucide-react'
import { placeholderAccounts } from '../../data/mockData'

const roleIcons = { Customer: User, 'Service Provider': ShieldCheck, Admin: Eye }

export default function DemoShowcase() {
  return (
    <section className="section bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(26,92,58,0.03)_0%,transparent_60%)]" />

      <div className="relative container-premium">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-label justify-center">
            <Zap className="w-3.5 h-3.5" />
            Quick Access
          </span>
          <h2 className="section-title">Explore the platform with pre-configured accounts</h2>
          <p className="section-subtitle mx-auto">
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
                  className="card group block p-6 lg:p-8 text-center"
                >
                  <div className="w-14 h-14 bg-[var(--color-primary)]/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-[var(--color-primary)]" />
                  </div>
                  <h3 className="text-lg font-semibold mb-1" style={{ fontFamily: 'var(--font-display)' }}>{acc.name}</h3>
                  <span className="inline-block badge badge-primary mb-3">{acc.role}</span>
                  <p className="text-sm text-[var(--color-ink-muted)] leading-relaxed mb-4">{acc.description}</p>
                  <div className="text-xs text-[var(--color-ink-muted)] bg-[var(--color-surface)] rounded-xl px-3 py-2">
                    <span className="font-medium text-[var(--color-ink)]">{acc.email}</span>
                    <br />
                    <span className="text-[var(--color-ink-light)]">{acc.password}</span>
                  </div>
                  <div className="mt-4 flex items-center justify-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2 transition-all">
                    <LogIn className="w-4 h-4" />
                    Open dashboard
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-xs text-[var(--color-ink-muted)]">
            These are read-only preview accounts. No real data is stored.
          </p>
        </div>
      </div>
    </section>
  )
}
