import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, Search, CalendarDays, MessageCircle, FileText, Shield, CheckCircle, ArrowRight } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: 'Search & Discover',
    description: 'Browse categories, search for specific services, and discover trusted local businesses. Every provider on ConnectHub is verified and reviewed by real customers.',
    details: [
      'Search by service type, location, or business name',
      'Filter by ratings, price range, and availability',
      'Read verified reviews from real customers',
      'View detailed profiles with photos and portfolios',
    ],
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: CalendarDays,
    title: 'Book Instantly',
    description: 'Choose your preferred service, select a convenient date and time, and confirm your booking in seconds. No phone calls or back-and-forth needed.',
    details: [
      'Real-time availability from providers',
      'Instant booking confirmation',
      'Flexible scheduling options',
      'Automatic reminders before your appointment',
    ],
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: MessageCircle,
    title: 'Stay Connected',
    description: 'Communicate directly with your provider through our built-in messaging system. Share details, ask questions, and get real-time updates on your service.',
    details: [
      'Direct messaging with providers',
      'Share photos and documents',
      'Real-time notifications',
      'Service status updates',
    ],
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: FileText,
    title: 'Get Invoiced & Review',
    description: 'Receive professional invoices upon service completion. Leave honest reviews to help other customers and support great local businesses.',
    details: [
      'Digital invoices and receipts',
      'Secure payment processing',
      'Rate and review your experience',
      'Build your trusted provider network',
    ],
    color: 'bg-amber-50 text-amber-600',
  },
]

const forCustomers = [
  { title: 'Find trusted providers', description: 'Every professional is background-checked and verified before listing.' },
  { title: 'Book in seconds', description: 'Choose a service, pick a time, and confirm — no phone calls needed.' },
  { title: 'Manage everything', description: 'Track bookings, message providers, and manage invoices from your dashboard.' },
  { title: 'Pay securely', description: 'Multiple payment options with secure, encrypted transactions.' },
]

const forProviders = [
  { title: 'Get discovered', description: 'Reach thousands of local customers looking for your services.' },
  { title: 'Manage your calendar', description: 'Accept bookings, set availability, and manage your schedule.' },
  { title: 'Grow your business', description: 'Build your reputation with reviews and expand your client base.' },
  { title: 'Get paid fast', description: 'Receive payments directly with transparent, low fees.' },
]

export default function HowItWorks() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[350px] flex items-end overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=800&fit=crop"
            alt="Team working together"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/95" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16 w-full">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to home
          </Link>
          <span className="text-xs font-medium text-blue-400 uppercase tracking-widest block mb-3">How It Works</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-2xl">
            Getting started is simple
          </h1>
          <p className="text-white/50 mt-3 text-base sm:text-lg max-w-xl leading-relaxed">
            From search to service completion — here's how ConnectHub helps you get things done.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 lg:space-y-24">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isEven = i % 2 === 0
              return (
                <div key={step.title} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 lg:gap-16`}>
                  <div className="flex-1 max-w-lg">
                    <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-6`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Step {i + 1}</span>
                    <h2 className="text-2xl lg:text-3xl font-bold mt-2 tracking-tight">{step.title}</h2>
                    <p className="text-gray-500 mt-4 leading-relaxed">{step.description}</p>
                    <ul className="mt-6 space-y-3">
                      {step.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2.5 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1 max-w-lg w-full">
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                      <img
                        src={[
                          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop',
                          'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=450&fit=crop',
                          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=450&fit=crop',
                          'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=450&fit=crop',
                        ][i]}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* For Customers & Providers */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">Who is it for?</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-3 tracking-tight">Built for everyone</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Customers */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold mb-6">For Customers</h3>
              <div className="space-y-5">
                {forCustomers.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* For Providers */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold mb-6">For Providers</h3>
              <div className="space-y-5">
                {forProviders.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Ready to get started?</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Join thousands of happy customers and trusted providers on ConnectHub.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/search" className="bg-black text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
              Find a service <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/sign-up" className="border border-gray-200 text-gray-700 px-8 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
              Join as a provider
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
