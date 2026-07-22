import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, Shield, Users, Target, Heart, CheckCircle, Star, MapPin, ArrowRight } from 'lucide-react'

const values = [
  { icon: Shield, title: 'Trust & Safety', description: 'Every provider is verified and background-checked before listing on our platform.' },
  { icon: Users, title: 'Community First', description: 'Built for local communities, supporting small businesses and skilled professionals.' },
  { icon: Target, title: 'Quality Assurance', description: 'Real reviews and ratings ensure you always get the best service available.' },
  { icon: Heart, title: 'Customer Care', description: 'Dedicated support team ready to help with any booking or service issue.' },
]

const stats = [
  { value: '2,500+', label: 'Verified Providers' },
  { value: '15,000+', label: 'Happy Customers' },
  { value: '50+', label: 'Service Categories' },
  { value: '4.8', label: 'Average Rating' },
]

const team = [
  { name: 'Tendai Moyo', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&q=80' },
  { name: 'Chiedza Nkomo', role: 'Head of Operations', image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=300&fit=crop&q=80' },
  { name: 'Kundai Dube', role: 'Lead Developer', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop&q=80' },
]

export default function About() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=800&fit=crop"
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/95" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16 w-full">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to home
          </Link>
          <span className="text-xs font-medium text-blue-400 uppercase tracking-widest block mb-3">About Us</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-2xl">
            Connecting communities with trusted local services
          </h1>
          <p className="text-white/50 mt-3 text-base sm:text-lg max-w-xl leading-relaxed">
            We are building the most trusted platform for finding and booking local services in Zimbabwe.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">Our Mission</span>
              <h2 className="text-3xl lg:text-4xl font-bold mt-3 tracking-tight">
                Making quality services accessible to everyone
              </h2>
              <p className="text-gray-500 mt-4 leading-relaxed">
                ConnectHub was founded with a simple goal: make it easy for people to find reliable, trusted service providers in their local area. We believe everyone deserves access to quality home services, professional help, and skilled tradespeople.
              </p>
              <p className="text-gray-500 mt-4 leading-relaxed">
                Starting in Victoria Falls, we are connecting the community with verified electricians, plumbers, cleaners, photographers, and hundreds of other professionals — all at the click of a button.
              </p>
              <div className="mt-8">
                <Link
                  to="/search"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Explore services <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop"
                  alt="Team working"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 max-w-[240px]">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-2xl font-bold">4.8</span>
                </div>
                <p className="text-sm text-gray-500">Average provider rating across all categories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">Our Values</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-3 tracking-tight">What drives us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-blue-600">{s.value}</div>
                <div className="text-sm text-gray-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-medium text-blue-600 uppercase tracking-widest">Our Team</span>
            <h2 className="text-3xl lg:text-4xl font-bold mt-3 tracking-tight">Meet the people behind ConnectHub</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 bg-gray-100">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover object-top" />
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight">Ready to find a service provider?</h2>
          <p className="text-gray-500 mt-3 max-w-lg mx-auto">
            Browse thousands of verified professionals in your area.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/search" className="bg-black text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
              Get started
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
