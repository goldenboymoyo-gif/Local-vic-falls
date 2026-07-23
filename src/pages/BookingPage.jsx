import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Calendar, Clock, Check, Users, MessageCircle, Star } from 'lucide-react'
import { adventures, eatDrink, cultureListings, stayListings } from '../data/listings'

const allListings = [...adventures, ...eatDrink, ...cultureListings, ...stayListings]

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
]

export default function BookingPage() {
  const { businessId } = useParams()
  const [step, setStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [partySize, setPartySize] = useState(2)
  const [confirmed, setConfirmed] = useState(false)

  const listing = allListings.find(l => l.slug === businessId)

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
    else setConfirmed(true)
  }

  if (confirmed) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gray-50"
      >
        <div className="bg-white rounded-3xl p-8 lg:p-12 max-w-md text-center shadow-lg border border-gray-100">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Booking confirmed!</h2>
          <p className="text-gray-500 text-sm mb-6">Your booking request has been sent. You'll receive a confirmation via WhatsApp shortly.</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left text-sm">
            <div className="font-medium mb-2">Booking details</div>
            <p className="text-gray-700 font-medium">{listing?.name || 'Experience'}</p>
            <p className="text-gray-500">{selectedDate} at {selectedTime}</p>
            <p className="text-gray-500">{partySize} {partySize === 1 ? 'person' : 'people'}</p>
          </div>
          {listing?.whatsapp && (
            <a
              href={listing.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#25D366] text-white py-3 rounded-xl text-sm font-medium hover:bg-[#20BA5C] transition-colors text-center mb-3"
            >
              Confirm on WhatsApp
            </a>
          )}
          <Link to="/" className="block w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">Back to home</Link>
        </div>
      </motion.div>
    )
  }

  if (!listing) {
    return (
      <div className="pt-32 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-6 h-6 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Listing not found</h2>
        <p className="text-gray-500 text-sm mb-4">This experience doesn't exist or has been removed.</p>
        <Link to="/search" className="text-teal-600 text-sm font-medium">Browse all experiences &rarr;</Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 pt-24 pb-16"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <Link to={`/business/${businessId}`} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Back to listing
        </Link>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= s ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
              <span className={`text-sm font-medium hidden sm:inline ${step >= s ? 'text-gray-900' : 'text-gray-400'}`}>
                {s === 1 ? 'Details' : s === 2 ? 'Date & Time' : 'Confirm'}
              </span>
              {s < 3 && <div className="w-8 h-px bg-gray-200" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-1">Booking details</h2>
              <p className="text-sm text-gray-500 mb-6">Review and confirm your booking for {listing.name}.</p>

              {/* Listing preview */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  <img src={listing.image} alt={listing.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 truncate">{listing.name}</h3>
                  <p className="text-sm text-gray-500">{listing.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-medium">{listing.rating}</span>
                    <span className="text-xs text-gray-400">({listing.reviews})</span>
                  </div>
                </div>
                {listing.price && (
                  <div className="text-right shrink-0">
                    <span className="text-lg font-bold text-teal-600">{listing.price}</span>
                    {listing.priceNote && <p className="text-xs text-gray-400">{listing.priceNote}</p>}
                  </div>
                )}
              </div>

              {/* Party size */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Party size</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPartySize(Math.max(1, partySize - 1))}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-medium"
                  >
                    -
                  </button>
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="font-medium">{partySize}</span>
                    <span className="text-sm text-gray-500">{partySize === 1 ? 'person' : 'people'}</span>
                  </div>
                  <button
                    onClick={() => setPartySize(Math.min(20, partySize + 1))}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-lg font-medium"
                  >
                    +
                  </button>
                </div>
              </div>

              {listing.duration && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                  <Clock className="w-4 h-4" />
                  <span>Duration: {listing.duration}</span>
                </div>
              )}

              <button
                onClick={nextStep}
                className="w-full bg-teal-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-1">Select date & time</h2>
              <p className="text-sm text-gray-500 mb-6">Pick when you'd like to book.</p>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-teal-400"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {timeSlots.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                          selectedTime === t
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'border-gray-200 text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <button
                onClick={nextStep}
                disabled={!selectedDate || !selectedTime}
                className="mt-8 w-full bg-teal-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Continue
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold mb-1">Confirm booking</h2>
              <p className="text-sm text-gray-500 mb-6">Review your booking details.</p>
              <div className="bg-gray-50 rounded-xl p-5 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Experience</span>
                  <span className="font-medium">{listing.name}</span>
                </div>
                {listing.price && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price</span>
                    <span className="font-medium">{listing.price} {listing.priceNote}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Party size</span>
                  <span className="font-medium">{partySize} {partySize === 1 ? 'person' : 'people'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Time</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                {listing.duration && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium">{listing.duration}</span>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <p className="text-xs text-gray-400">You'll receive a confirmation via WhatsApp after booking.</p>
                </div>
              </div>
              <button onClick={nextStep} className="w-full bg-teal-600 text-white py-3 rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors">Confirm booking</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
