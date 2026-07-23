import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { Star, MapPin, Heart, Share2, ChevronLeft, Calendar, MessageCircle, Briefcase } from 'lucide-react'
import { localVoices, adventures, eatDrink, cultureListings, stayListings } from '../data/listings'

const allListings = [...adventures, ...eatDrink, ...cultureListings, ...stayListings]

export default function ProfessionalProfile() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('about')

  const person = localVoices.find(p => p.id === id) || localVoices[0]
  const linkedExperience = person?.linkedExperience ? allListings.find(l => l.id === person.linkedExperience) : null

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!person) {
    return (
      <div className="pt-32 text-center">
        <h2 className="text-xl font-semibold mb-2">Person not found</h2>
        <Link to="/" className="text-teal-600 text-sm font-medium">Back to home &rarr;</Link>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to home
        </Link>
      </div>

      {/* Cover */}
      <div className="relative">
        <div className="h-48 lg:h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <img src={person.image} alt="" className="w-full h-full object-cover object-top" />
        </div>
      </div>

      {/* Profile Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start gap-5 pt-6">
          <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-2xl border-4 border-white bg-white shadow-lg overflow-hidden shrink-0 mx-auto sm:mx-0">
            <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top" />
          </div>
          <div className="flex-1 min-w-0 pt-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{person.name}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="text-sm text-teal-600 font-medium">{person.role}</span>
            </div>
            <p className="text-sm text-gray-500 mt-3 leading-relaxed max-w-xl">{person.bio}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="flex gap-6 border-b border-gray-200 mb-8">
              {['about', 'linked'].map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-teal-600 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                  {tab === 'about' ? 'About' : 'Linked Experience'}
                </button>
              ))}
            </div>

            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">About {person.name.split(' ')[0]}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{person.bio}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Role</div>
                  <div className="font-medium text-sm">{person.role}</div>
                </div>
              </div>
            )}

            {activeTab === 'linked' && (
              <div className="space-y-6">
                {linkedExperience ? (
                  <Link
                    to={`/business/${linkedExperience.slug}`}
                    className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={linkedExperience.image} alt={linkedExperience.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">{linkedExperience.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{linkedExperience.category}</p>
                      <div className="flex items-center gap-3 mt-3 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="font-medium">{linkedExperience.rating}</span>
                          <span className="text-gray-400">({linkedExperience.reviews})</span>
                        </div>
                        {linkedExperience.price && (
                          <span className="text-teal-600 font-semibold">{linkedExperience.price}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ) : (
                  <p className="text-gray-500 text-sm">No linked experience found.</p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {linkedExperience && (
                <Link
                  to={`/booking/${linkedExperience.slug}`}
                  className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
                >
                  <Calendar className="w-4 h-4" /> Book linked experience
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
