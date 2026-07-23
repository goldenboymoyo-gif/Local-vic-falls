import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle, Building2 } from 'lucide-react'

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'hello@localvicfalls.com', href: 'mailto:hello@localvicfalls.com' },
  { icon: Phone, label: 'Phone', value: '+263 78 123 4567', href: 'tel:+263781234567' },
  { icon: MapPin, label: 'Office', value: '123 Adamson Drive, Victoria Falls, Zimbabwe', href: null },
  { icon: Clock, label: 'Hours', value: 'Mon - Fri: 8:00 AM - 5:00 PM', href: null },
]

const faqs = [
  {
    q: 'How do I list my business on Local Vic Falls?',
    a: 'Click "Become a Host" and fill out the form. Our team will review your application and verify your credentials within 48 hours.',
  },
  {
    q: 'Is Local Vic Falls free for visitors?',
    a: 'Yes! Searching, browsing, and discovering experiences on Local Vic Falls is completely free. You only pay for the experiences you book.',
  },
  {
    q: 'How are hosts verified?',
    a: 'Every host goes through a thorough verification process including identity checks, business credential verification, and reference checks before being listed on our platform.',
  },
  {
    q: 'What if I\'m not satisfied with an experience?',
    a: 'Contact our support team within 24 hours of your experience. We\'ll work with you and the host to resolve any issues, and may offer a refund if appropriate.',
  },
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[350px] flex items-end overflow-hidden bg-slate-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=800&fit=crop"
            alt="Contact us"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/95" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16 w-full">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white mb-6 transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to home
          </Link>
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest block mb-3">Contact Us</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight max-w-2xl">
            We'd love to hear from you
          </h1>
          <p className="text-white/50 mt-3 text-base sm:text-lg max-w-xl leading-relaxed">
            Have a question, suggestion, or need help? Reach out and our team will get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold mb-2">Send us a message</h2>
              <p className="text-gray-500 text-sm mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

              {submitted ? (
                <div className="bg-gray-50 rounded-2xl p-12 text-center border border-gray-100">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-7 h-7 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Message sent!</h3>
                  <p className="text-gray-500 text-sm">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                      <input type="text" required placeholder="Your name" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                      <input type="email" required placeholder="you@example.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                    <select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-gray-400 transition-colors">
                      <option>General inquiry</option>
                      <option>Support</option>
                      <option>Business listing</option>
                      <option>Partnership</option>
                      <option>Feedback</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                    <textarea rows={5} required placeholder="How can we help?" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400 transition-colors resize-none" />
                  </div>
                  <button type="submit" className="bg-black text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
                    <Send className="w-4 h-4" /> Send message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-2">Get in touch</h2>
              <p className="text-gray-500 text-sm mb-8">Prefer to reach out directly? Here are our details.</p>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-0.5">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-medium hover:text-blue-600 transition-colors">{item.value}</a>
                      ) : (
                        <span className="text-sm font-medium">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Building2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-sm">Local Vic Falls HQ</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Located in the heart of Victoria Falls, our team is dedicated to connecting communities with trusted local services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-medium text-emerald-600 uppercase tracking-widest">FAQ</span>
            <h2 className="text-3xl font-bold mt-3 tracking-tight">Frequently asked questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start gap-3">
                    <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-sm mb-1.5">{faq.q}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
