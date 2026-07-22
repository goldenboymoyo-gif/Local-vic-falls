import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { ChevronLeft, Calendar, Clock, Check, ChevronDown } from 'lucide-react'

const timeSlots = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
]

export default function BookingPage() {
  const { businessId } = useParams()
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const services = [
    { id: 1, name: 'Full electrical inspection', price: '$85', duration: '2 hours' },
    { id: 2, name: 'Wiring installation', price: '$150', duration: '4 hours' },
    { id: 3, name: 'Light fixture installation', price: '$45', duration: '1 hour' },
    { id: 4, name: 'Emergency repair', price: '$200', duration: '1-2 hours' },
  ]

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
    else {
      setConfirmed(true)
    }
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
          <p className="text-gray-500 text-sm mb-6">Your booking has been submitted. You'll receive a confirmation shortly.</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left text-sm">
            <div className="font-medium mb-2">Booking details</div>
            <p className="text-gray-700">{selectedService?.name}</p>
            <p className="text-gray-500">{selectedDate} at {selectedTime}</p>
          </div>
          <Link to="/dashboard/customer" className="block w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">Go to dashboard</Link>
        </div>
      </motion.div>
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
          <ChevronLeft className="w-4 h-4" /> Back to business
        </Link>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${step >= s ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
              <span className={`text-sm font-medium hidden sm:inline ${step >= s ? 'text-gray-900' : 'text-gray-400'}`}>
                {s === 1 ? 'Service' : s === 2 ? 'Date & Time' : 'Confirm'}
              </span>
              {s < 3 && <div className="w-8 h-px bg-gray-200" />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 lg:p-8 border border-gray-100">
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold mb-1">Choose a service</h2>
              <p className="text-sm text-gray-500 mb-6">Select the service you'd like to book.</p>
              <div className="space-y-3">
                {services.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => { setSelectedService(svc); nextStep() }}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all ${
                      selectedService?.id === svc.id
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div>
                      <h3 className="font-medium text-sm">{svc.name}</h3>
                      <p className="text-xs text-gray-500 mt-0.5">{svc.duration}</p>
                    </div>
                    <span className="font-semibold">{svc.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold mb-1">Select date & time</h2>
              <p className="text-sm text-gray-500 mb-6">Pick when you'd like this service.</p>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-gray-400"
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
                            ? 'bg-black text-white border-black'
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
                className="mt-8 w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
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
                  <span className="text-gray-500">Service</span>
                  <span className="font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Price</span>
                  <span className="font-medium">{selectedService?.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium">{selectedService?.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date</span>
                  <span className="font-medium">{selectedDate}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Time</span>
                  <span className="font-medium">{selectedTime}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 mt-3">
                  <div className="flex justify-between text-sm font-semibold">
                    <span>Total</span>
                    <span>{selectedService?.price}</span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Payment will be processed upon service completion</p>
                </div>
              </div>
              <button onClick={nextStep} className="w-full bg-black text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">Confirm booking</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
