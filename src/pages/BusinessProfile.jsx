import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { Star, MapPin, Phone, Mail, Globe, Clock, Shield, Heart, Share2, ChevronLeft, Calendar, MessageCircle, Star as StarIcon, ThumbsUp, Flag, CheckCircle, Camera, Scissors, Wrench, Sparkles } from 'lucide-react'
import { featuredBusinesses } from '../data/mockData'

const services = [
  { id: 1, name: 'Full electrical inspection', price: '$85', duration: '2 hours', popular: true },
  { id: 2, name: 'Wiring installation', price: '$150', duration: '4 hours', popular: false },
  { id: 3, name: 'Light fixture installation', price: '$45', duration: '1 hour', popular: false },
  { id: 4, name: 'Emergency electrical repair', price: '$200', duration: '1-2 hours', popular: false },
  { id: 5, name: 'Security system installation', price: '$350', duration: '6 hours', popular: true },
]

const reviews = [
  { id: 1, name: 'Sarah M.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&q=80', rating: 5, date: '2 weeks ago', content: 'Excellent service! The electrician was punctual, professional, and did a fantastic job. Will definitely use again.', photos: [] },
  { id: 2, name: 'John D.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&q=80', rating: 4, date: '1 month ago', content: 'Great work overall. Very knowledgeable and helpful. Slight delay but they communicated well.', photos: [] },
  { id: 3, name: 'Emily R.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&q=80', rating: 5, date: '2 months ago', content: 'Saved our holiday! Came on a Sunday for an emergency repair. Highly recommend!', photos: [] },
]

const gallery = [
  'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1621905251189-08b0d7a0b2c1?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop',
]

export default function BusinessProfile() {
  const { slug } = useParams()
  const [activeTab, setActiveTab] = useState('services')
  const [selectedImage, setSelectedImage] = useState(0)

  const business = featuredBusinesses.find(b => b.slug === slug) || featuredBusinesses[0]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 min-h-screen bg-white"
    >
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <Link to="/search" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          Back to results
        </Link>
      </div>

      {/* Cover Image & Logo */}
      <div className="relative">
        <div className="h-48 lg:h-72 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img src={business.image} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Profile Info — below cover image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start gap-5 pt-6">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl border-4 border-white bg-white shadow-lg overflow-hidden shrink-0 mx-auto sm:mx-0">
            <img src={business.image} alt={business.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0 pt-2">
            <div className="flex items-start gap-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words line-clamp-2 flex-1 min-w-0">{business.name}</h1>
              {business.verified && <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-1" />}
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="text-sm text-gray-500">{business.category}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-gray-900">{business.rating}</span>
                <span className="text-sm text-gray-400">({business.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="w-3.5 h-3.5" />
                {business.city}
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-3 pt-2">
            <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <Link
              to={`/booking/${business.slug}`}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Book now
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-30 flex gap-3">
        <Link
          to={`/booking/${business.slug}`}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium"
        >
          <Calendar className="w-4 h-4" />
          Book now
        </Link>
        <button className="p-3 border border-gray-200 rounded-xl">
          <MessageCircle className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200 mb-8">
              {['services', 'gallery', 'reviews', 'about'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab ? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-3">
                {services.map((svc) => (
                  <div key={svc.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{svc.name}</h4>
                        {svc.popular && (
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">Popular</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{svc.duration}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">{svc.price}</span>
                      <Link
                        to={`/booking/${business.slug}?service=${svc.id}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        Book
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <div>
                <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-4 bg-gray-100">
                  <img src={gallery[selectedImage]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-[4/3] rounded-xl overflow-hidden border-2 transition-colors ${
                        selectedImage === idx ? 'border-blue-600' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{business.rating}</div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`w-4 h-4 ${i < Math.floor(business.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{business.reviews} reviews</div>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct = star === 5 ? 68 : star === 4 ? 20 : star === 3 ? 8 : star === 2 ? 3 : 1
                      return (
                        <div key={star} className="flex items-center gap-2 text-sm">
                          <span className="text-gray-500 w-4">{star}</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-gray-400 text-xs w-6">{pct}%</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={review.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-sm">{review.name}</div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{review.content}</p>
                    <div className="flex items-center gap-4 mt-3">
                      <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
                        <ThumbsUp className="w-3.5 h-3.5" /> Helpful
                      </button>
                      <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
                        <Flag className="w-3.5 h-3.5" /> Report
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We are a trusted electrical services company based in Victoria Falls with over 12 years of experience serving the community. Our team of certified electricians is committed to providing safe, reliable, and high-quality electrical solutions for residential and commercial clients.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Experience</div>
                    <div className="font-semibold">12+ years</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Team size</div>
                    <div className="font-semibold">8 professionals</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Jobs completed</div>
                    <div className="font-semibold">1,200+</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Response time</div>
                    <div className="font-semibold">&lt; 2 hours</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Card */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Contact information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">123 Main St, Victoria Falls</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">+263 78 123 4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">info@vicelectrical.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-blue-600">www.vicelectrical.com</span>
                  </div>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Opening hours</h3>
                <div className="space-y-2 text-sm">
                  {['Mon - Fri', 'Saturday', 'Sunday'].map((day) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-gray-500">{day}</span>
                      <span className={day === 'Sunday' ? 'text-red-500' : 'text-gray-700'}>
                        {day === 'Sunday' ? 'Closed' : day === 'Saturday' ? '8:00 AM - 2:00 PM' : '7:00 AM - 6:00 PM'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map */}
              <div className="bg-gray-50 rounded-2xl overflow-hidden h-48">
                <iframe
                  title="Location map"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-22.13%2C25.83%2C-22.09%2C25.87&layer=mapnik&marker=-22.1167%2C25.85"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
