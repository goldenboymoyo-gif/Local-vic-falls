import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { Star, MapPin, Phone, Clock, Shield, Heart, Share2, ChevronLeft, Calendar, MessageCircle, CheckCircle } from 'lucide-react'
import { adventures, eatDrink, cultureListings, stayListings } from '../data/listings'

const allListings = [...adventures, ...eatDrink, ...cultureListings, ...stayListings]

const mockReviews = [
  { id: 1, name: 'Sarah M.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&q=80', rating: 5, date: '2 weeks ago', content: 'Absolutely incredible experience! The guide was knowledgeable and made the whole trip unforgettable.' },
  { id: 2, name: 'John D.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&q=80', rating: 4, date: '1 month ago', content: 'Great value for money. Well organised, safe, and genuinely fun. Would recommend to anyone visiting Vic Falls.' },
  { id: 3, name: 'Emily R.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&q=80', rating: 5, date: '2 months ago', content: 'The highlight of our Zimbabwe trip. Everything was seamless from booking to the actual experience.' },
]

export default function BusinessProfile() {
  const { slug } = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  const listing = allListings.find(l => l.slug === slug)

  useEffect(() => { window.scrollTo(0, 0) }, [slug])

  if (!listing) {
    return (
      <div className="pt-32 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-6 h-6 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Listing not found</h2>
        <p className="text-gray-500 text-sm mb-4">This listing doesn't exist or has been removed.</p>
        <Link to="/search" className="text-teal-600 text-sm font-medium">Browse all &rarr;</Link>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <Link to="/search" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to results
        </Link>
      </div>

      {/* Cover Image */}
      <div className="relative">
        <div className="h-48 lg:h-72 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img src={listing.image} alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Profile Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start gap-5 pt-6">
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-2xl border-4 border-white bg-white shadow-lg overflow-hidden shrink-0 mx-auto sm:mx-0">
            <img src={listing.image} alt={listing.name} className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0 pt-2">
            <div className="flex items-start gap-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words line-clamp-2 flex-1 min-w-0">{listing.name}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="text-sm text-gray-500">{listing.category}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-gray-900">{listing.rating}</span>
                <span className="text-sm text-gray-400">({listing.reviews} reviews)</span>
              </div>
              {listing.price && (
                <span className="text-sm font-semibold text-teal-600">{listing.price} {listing.priceNote || ''}</span>
              )}
              {listing.duration && (
                <span className="text-sm text-gray-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {listing.duration}</span>
              )}
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
              to={`/booking/${listing.slug}`}
              className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              <Calendar className="w-4 h-4" /> Book now
            </Link>
          </div>
        </div>
      </div>

      {/* Badges */}
      {listing.badges && listing.badges.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="flex flex-wrap gap-2">
            {listing.badges.map((badge) => (
              <span key={badge} className="inline-flex items-center gap-1 px-3 py-1 bg-teal-50 text-teal-700 text-xs font-medium rounded-full">
                <CheckCircle className="w-3 h-3" /> {badge}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-30 flex gap-3">
        <Link
          to={`/booking/${listing.slug}`}
          className="flex-1 flex items-center justify-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-xl text-sm font-medium"
        >
          <Calendar className="w-4 h-4" /> Book now
        </Link>
        {listing.whatsapp && (
          <a href={listing.whatsapp} target="_blank" rel="noopener noreferrer" className="p-3 border border-gray-200 rounded-xl">
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
          </a>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-200 mb-8">
              {['overview', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab ? 'border-teal-600 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{listing.description}</p>
                </div>
                {listing.operator && (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Operated by</div>
                    <div className="font-medium text-sm">{listing.operator}</div>
                  </div>
                )}
                {listing.hours && (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Hours</div>
                    <div className="font-medium text-sm">{listing.hours}</div>
                  </div>
                )}
                {listing.address && (
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Address</div>
                    <div className="font-medium text-sm flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {listing.address}</div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{listing.rating}</div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(listing.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{listing.reviews} reviews</div>
                  </div>
                </div>
                {mockReviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={review.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="font-medium text-sm">{review.name}</div>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-gray-400">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{review.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Quick info</h3>
                <div className="space-y-3 text-sm">
                  {listing.price && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Price</span>
                      <span className="font-semibold text-teal-600">{listing.price} {listing.priceNote || ''}</span>
                    </div>
                  )}
                  {listing.duration && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Duration</span>
                      <span className="font-medium">{listing.duration}</span>
                    </div>
                  )}
                  {listing.category && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Category</span>
                      <span className="font-medium">{listing.category}</span>
                    </div>
                  )}
                  {listing.operator && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500">Operator</span>
                      <span className="font-medium">{listing.operator}</span>
                    </div>
                  )}
                </div>
              </div>

              {listing.whatsapp && (
                <a
                  href={listing.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25D366] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#20BA5C] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
              )}

              {listing.phone && (
                <a
                  href={`tel:${listing.phone}`}
                  className="flex items-center justify-center gap-2 w-full border border-gray-200 text-gray-700 px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call {listing.phone}
                </a>
              )}

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
