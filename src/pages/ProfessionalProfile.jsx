import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { Star, MapPin, Phone, Mail, Clock, Shield, Heart, Share2, ChevronLeft, Calendar, MessageCircle, Award, Briefcase, CheckCircle } from 'lucide-react'
import { popularProfessionals } from '../data/mockData'

const professionalServices = [
  { id: 1, name: 'Standard consultation', price: '$45', duration: '1 hour', popular: true },
  { id: 2, name: 'Emergency callout', price: '$120', duration: '1-2 hours', popular: false },
  { id: 3, name: 'Full project estimate', price: '$85', duration: '2-3 hours', popular: true },
  { id: 4, name: 'Weekend service', price: '$150', duration: 'Varies', popular: false },
]

const reviews = [
  { id: 1, name: 'Grace M.', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&q=80', rating: 5, date: '1 week ago', content: 'Fantastic work! Very professional and completed the job on time. Highly recommended.' },
  { id: 2, name: 'David K.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&q=80', rating: 5, date: '3 weeks ago', content: 'One of the best professionals I have worked with. Great communication and quality.' },
  { id: 3, name: 'Anna T.', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&q=80', rating: 4, date: '2 months ago', content: 'Good service overall. Arrived on time and did a thorough job. Will use again.' },
]

export default function ProfessionalProfile() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('services')

  const pro = popularProfessionals.find(p => p.id === Number(id)) || popularProfessionals[0]

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <Link to="/professionals" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to professionals
        </Link>
      </div>

      {/* Cover */}
      <div className="relative">
        <div className="h-48 lg:h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img src={pro.image} alt="" className="w-full h-full object-cover object-top" />
        </div>
      </div>

      {/* Profile Info — below cover image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start gap-5 pt-6">
          <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-2xl border-4 border-white bg-white shadow-lg overflow-hidden shrink-0 mx-auto sm:mx-0">
            <img src={pro.image} alt={pro.name} className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex-1 min-w-0 pt-2">
            <div className="flex items-start gap-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 break-words line-clamp-2 flex-1 min-w-0">{pro.name}</h1>
              <Shield className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="text-sm text-blue-600 font-medium">{pro.profession}</span>
              <span className="text-sm text-gray-400">·</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-gray-900">{pro.rating}</span>
              </div>
              <span className="text-sm text-gray-400">·</span>
              <span className="text-sm text-gray-500 flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {pro.jobs} jobs</span>
              {pro.available && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs font-medium rounded-full">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Available now
                </span>
              )}
              </div>
            </div>
            <div className="hidden lg:flex items-center gap-3 pt-2">
              <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"><Heart className="w-5 h-5 text-gray-600" /></button>
              <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"><Share2 className="w-5 h-5 text-gray-600" /></button>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                <Calendar className="w-4 h-4" /> Book now
              </button>
            </div>
          </div>
        </div>

      {/* Mobile CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-30 flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium">
          <Calendar className="w-4 h-4" /> Book now
        </button>
        <button className="p-3 border border-gray-200 rounded-xl"><MessageCircle className="w-5 h-5 text-gray-600" /></button>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="flex gap-6 border-b border-gray-200 mb-8">
              {['services', 'reviews', 'about'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-blue-600 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === 'services' && (
              <div className="space-y-3">
                {professionalServices.map((svc) => (
                  <div key={svc.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm">{svc.name}</h4>
                        {svc.popular && <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">Popular</span>}
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">{svc.duration}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">{svc.price}</span>
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700">Book</button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{pro.rating}</div>
                    <div className="flex items-center gap-0.5 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(pro.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{pro.jobs} reviews</div>
                  </div>
                </div>
                {reviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3 mb-3">
                      <img src={review.avatar} alt="" className="w-10 h-10 rounded-full object-cover object-top" />
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

            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">About {pro.name.split(' ')[0]}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {pro.name} is a trusted {pro.profession.toLowerCase()} based in Victoria Falls with {pro.experience} of hands-on experience. With {pro.jobs} completed jobs and a {pro.rating} rating, {pro.name.split(' ')[0]} is one of the most reliable professionals in the area.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Experience</div>
                    <div className="font-semibold">{pro.experience}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Jobs completed</div>
                    <div className="font-semibold">{pro.jobs}+</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Rating</div>
                    <div className="font-semibold flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /> {pro.rating}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Response time</div>
                    <div className="font-semibold">&lt; 2 hours</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Contact information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">Victoria Falls, Zimbabwe</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">+263 78 123 4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{pro.name.split(' ')[0].toLowerCase()}@connecthub.com</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Availability</h3>
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
