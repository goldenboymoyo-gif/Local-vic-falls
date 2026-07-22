import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import {
  LayoutDashboard,
  CalendarDays,
  Heart,
  MessageCircle,
  Star,
  User,
  Settings,
  LogOut,
  Bell,
  Clock,
  MapPin,
  ChevronRight,
  Sparkles,
  Sun,
  Moon,
  Sunrise,
} from 'lucide-react'

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', key: 'overview' },
  { icon: CalendarDays, label: 'My Bookings', key: 'bookings' },
  { icon: Heart, label: 'Favourites', key: 'favourites' },
  { icon: MessageCircle, label: 'Messages', key: 'messages' },
  { icon: Star, label: 'Reviews', key: 'reviews' },
  { icon: User, label: 'Profile', key: 'profile' },
]

const upcomingBookings = [
  { id: 1, provider: 'Vic Falls Electrical', service: 'Full electrical inspection', date: 'Jul 25, 2026', time: '10:00 AM', status: 'confirmed', price: '$85', image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=100&h=100&fit=crop' },
  { id: 2, provider: 'Mosi Plumbers', service: 'Pipe repair', date: 'Jul 28, 2026', time: '2:00 PM', status: 'pending', price: '$120', image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=100&h=100&fit=crop' },
  { id: 3, provider: 'Wild Horizon Photo', service: 'Wedding photography', date: 'Aug 5, 2026', time: '8:00 AM', status: 'confirmed', price: '$850', image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=100&h=100&fit=crop' },
]

const pastBookings = [
  { id: 4, provider: 'Batau Medical Centre', service: 'General checkup', date: 'Jun 15, 2026', time: '9:30 AM', status: 'completed', price: '$60', image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=100&h=100&fit=crop' },
  { id: 5, provider: 'Batau Medical Centre', service: 'Follow-up appointment', date: 'Apr 10, 2026', time: '11:00 AM', status: 'cancelled', price: 'Free', image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=100&h=100&fit=crop' },
]

const allBookings = [...upcomingBookings, ...pastBookings]

const favourites = [
  { id: 1, name: 'Vic Falls Electrical', category: 'Electrical', rating: 4.9, reviews: 127, image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=300&fit=crop' },
  { id: 2, name: 'Mosi Plumbers', category: 'Plumbing', rating: 4.7, reviews: 89, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=400&h=300&fit=crop' },
  { id: 3, name: 'Wild Horizon Photo', category: 'Photography', rating: 5.0, reviews: 214, image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=400&h=300&fit=crop' },
  { id: 4, name: 'Batau Medical Centre', category: 'Healthcare', rating: 4.8, reviews: 156, image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=400&h=300&fit=crop' },
  { id: 5, name: 'Zambezi Cleaners', category: 'Cleaning', rating: 4.6, reviews: 73, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop' },
  { id: 6, name: 'Circuit City Repairs', category: 'Electronics', rating: 4.5, reviews: 48, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop' },
]

const myReviews = [
  { id: 1, business: 'Vic Falls Electrical', rating: 5, text: 'Excellent service! The electrician arrived on time and fixed our wiring issue quickly. Very professional and reasonably priced.', date: 'Jun 20, 2026' },
  { id: 2, business: 'Mosi Plumbers', rating: 4, text: 'Good work on the pipe repair. They were a bit late but the quality of work was solid. Would use again.', date: 'May 15, 2026' },
  { id: 3, business: 'Wild Horizon Photo', rating: 5, text: 'Absolutely stunning wedding photos! Captured every moment perfectly. Highly recommend for any event.', date: 'Apr 22, 2026' },
  { id: 4, business: 'Batau Medical Centre', rating: 4, text: 'Professional and caring staff. The doctor was thorough and explained everything clearly. Short wait time.', date: 'Mar 10, 2026' },
]

const notifications = [
  { id: 1, text: 'Your booking with Vic Falls Electrical is confirmed for Jul 25', time: '2 hours ago', read: false },
  { id: 2, text: 'Mosi Plumbers sent a message about your pipe repair', time: '1 day ago', read: false },
  { id: 3, text: 'Wild Horizon Photo is available for Aug 5', time: '3 days ago', read: true },
  { id: 4, text: 'Your review for Batau Medical Centre was published', time: '1 week ago', read: true },
]

const spendingData = [
  { month: 'Feb', amount: 120 },
  { month: 'Mar', amount: 280 },
  { month: 'Apr', amount: 180 },
  { month: 'May', amount: 90 },
  { month: 'Jun', amount: 340 },
  { month: 'Jul', amount: 85 },
]

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return { text: 'Good morning', icon: Sunrise }
  if (hour < 17) return { text: 'Good afternoon', icon: Sun }
  return { text: 'Good evening', icon: Moon }
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
        />
      ))}
    </div>
  )
}

function TabContent({ children }) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(ref.current.children, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' })
    }
  }, [])
  return <div ref={ref}>{children}</div>
}

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const greeting = getGreeting()
  const GreetingIcon = greeting.icon

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <TabContent>
            <div className="space-y-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center text-xl font-bold flex-shrink-0">
                  JD
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <GreetingIcon className="w-5 h-5 text-blue-500" />
                    <h1 className="text-2xl font-bold">{greeting.text}, John!</h1>
                  </div>
                  <p className="text-gray-500 text-sm mt-0.5">Here's what's happening with your bookings.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold">15</div>
                  <div className="text-sm text-gray-500 mt-2">Total Bookings</div>
                  <div className="text-xs text-green-600 mt-1">3 this month</div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold">3</div>
                  <div className="text-sm text-gray-500 mt-2">Upcoming</div>
                  <div className="text-xs text-blue-600 mt-1">1 pending</div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold">6</div>
                  <div className="text-sm text-gray-500 mt-2">Favourites</div>
                  <div className="text-xs text-blue-600 mt-1">2 new</div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-3xl font-bold">4</div>
                  <div className="text-sm text-gray-500 mt-2">Reviews Given</div>
                  <div className="text-xs text-purple-600 mt-1">Avg 4.5 stars</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold">Booking Timeline</h2>
                    <button onClick={() => setActiveTab('bookings')} className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:underline">
                      View all <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 p-5 relative">
                    <div className="absolute left-[37px] top-8 bottom-8 w-0.5 bg-gray-100" />
                    <div className="space-y-1">
                      {upcomingBookings.map((b) => (
                        <div key={b.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors relative">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                            b.status === 'confirmed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            <Clock className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{b.service}</span>
                              <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                                b.status === 'confirmed' ? 'text-green-700 bg-green-50 border-green-200' : 'text-blue-700 bg-blue-50 border-blue-200'
                              }`}>{b.status}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5">{b.provider} &middot; {b.date} at {b.time}</p>
                          </div>
                          <span className="text-sm font-medium text-gray-600">{b.price}</span>
                        </div>
                      ))}
                      {pastBookings.filter(b => b.status === 'completed').map((b) => (
                        <div key={b.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors relative">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 z-10">
                            <Clock className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm text-gray-500">{b.service}</span>
                              <span className="text-xs font-medium px-2 py-0.5 rounded-full border text-blue-700 bg-blue-50 border-blue-200">completed</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5">{b.provider} &middot; {b.date}</p>
                          </div>
                          <span className="text-sm font-medium text-gray-400">{b.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold">Spending</h2>
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="h-44 flex items-end gap-2">
                      {spendingData.map((d) => {
                        const max = Math.max(...spendingData.map(s => s.amount))
                        const height = (d.amount / max) * 100
                        return (
                          <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                            <span className="text-[10px] text-gray-400 font-medium">${d.amount}</span>
                            <div className="w-full rounded-lg overflow-hidden" style={{ height: `${Math.max(height, 6)}%` }}>
                              <div className="w-full h-full rounded-lg" style={{ background: 'linear-gradient(180deg, #6366f1, #818cf8)' }} />
                            </div>
                            <span className="text-[10px] text-gray-500">{d.month}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold">Your Favourites</h2>
                  <button onClick={() => setActiveTab('favourites')} className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:underline">
                    View all <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  {favourites.slice(0, 4).map((f) => (
                    <div key={f.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                      <img src={f.image} alt={f.name} className="w-full h-28 object-cover" />
                      <div className="p-3.5">
                        <div className="font-medium text-sm truncate">{f.name}</div>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium">{f.rating}</span>
                          <span className="text-xs text-gray-400">({f.reviews})</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold">Recent Reviews</h2>
                  <button onClick={() => setActiveTab('reviews')} className="text-sm text-blue-600 font-medium flex items-center gap-1 hover:underline">
                    View all <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {myReviews.slice(0, 2).map((r) => (
                    <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-sm">{r.business}</span>
                        <StarRating rating={r.rating} />
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{r.text}</p>
                      <span className="text-xs text-gray-400 mt-2 block">{r.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabContent>
        )

      case 'bookings':
        return (
          <TabContent>
            <div className="space-y-10">
              <h1 className="text-2xl font-bold">My Bookings</h1>
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Upcoming</h2>
                <div className="space-y-4">
                  {upcomingBookings.map((b) => (
                    <div key={b.id} className="bg-white rounded-2xl border border-gray-100 p-5 lg:p-6 flex items-center gap-5 hover:shadow-md transition-shadow">
                      <img src={b.image} alt="" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold">{b.service}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{b.provider}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Victoria Falls</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {b.date} at {b.time}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-semibold">{b.price}</div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border mt-2 inline-block ${
                          b.status === 'confirmed' ? 'text-green-700 bg-green-50 border-green-200' : 'text-blue-700 bg-blue-50 border-blue-200'
                        }`}>{b.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Past</h2>
                <div className="space-y-4">
                  {pastBookings.map((b) => (
                    <div key={b.id} className="bg-white rounded-2xl border border-gray-100 p-5 lg:p-6 flex items-center gap-5 opacity-75">
                      <img src={b.image} alt="" className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold">{b.service}</h3>
                        <p className="text-sm text-gray-500 mt-0.5">{b.provider}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mt-2">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {b.date} at {b.time}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-semibold">{b.price}</div>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border mt-2 inline-block ${
                          b.status === 'completed' ? 'text-blue-700 bg-blue-50 border-blue-200' : 'text-red-700 bg-red-50 border-red-200'
                        }`}>{b.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabContent>
        )

      case 'favourites':
        return (
          <TabContent>
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Favourites</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favourites.map((f) => (
                  <div key={f.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                    <div className="relative">
                      <img src={f.image} alt={f.name} className="w-full h-44 object-cover" />
                      <button className="absolute top-3 right-3 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </button>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold">{f.name}</h3>
                          <p className="text-sm text-gray-500 mt-0.5">{f.category}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{f.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-5">
                        <span className="text-xs text-gray-400">{f.reviews} reviews</span>
                        <button className="px-5 py-2 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors">
                          Quick Book
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabContent>
        )

      case 'messages':
        return (
          <TabContent>
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Messages</h1>
              <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
                <MessageCircle className="w-16 h-16 text-gray-200 mx-auto mb-5" />
                <h2 className="text-lg font-semibold mb-2">Coming Soon</h2>
                <p className="text-sm text-gray-500 max-w-sm mx-auto">Direct messaging with businesses will be available soon. You'll be able to chat with providers, ask questions, and share details about your bookings.</p>
              </div>
            </div>
          </TabContent>
        )

      case 'reviews':
        return (
          <TabContent>
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Reviews</h1>
                <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                  <Sparkles className="w-4 h-4" /> Write a Review
                </button>
              </div>
              <div className="space-y-5">
                {myReviews.map((r) => (
                  <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                          <Star className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{r.business}</div>
                          <div className="text-xs text-gray-400">{r.date}</div>
                        </div>
                      </div>
                      <StarRating rating={r.rating} />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabContent>
        )

      case 'profile':
        return (
          <TabContent>
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Profile</h1>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-2xl bg-black text-white flex items-center justify-center text-3xl font-bold mb-4">
                        JD
                      </div>
                      <h3 className="font-semibold text-lg">John Doe</h3>
                      <p className="text-sm text-gray-500 mt-1">john@example.com</p>
                      <span className="text-xs text-green-600 font-medium mt-2">Verified</span>
                      <button className="mt-4 px-5 py-2 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
                        Change photo
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                      <div className="text-center">
                        <div className="font-semibold">15</div>
                        <div className="text-xs text-gray-500">Bookings</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">6</div>
                        <div className="text-xs text-gray-500">Favourites</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">4</div>
                        <div className="text-xs text-gray-500">Reviews</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <form className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
                      <input type="text" defaultValue="John Doe" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                      <input type="email" defaultValue="john@example.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                      <input type="text" placeholder="+263 78 000 0000" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                      <input type="text" defaultValue="Victoria Falls, Zimbabwe" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                    </div>
                    <button className="w-full bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                      Update profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </TabContent>
        )

      default:
        return <div className="text-center py-20 text-gray-500">Coming soon</div>
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gray-50 flex"
    >
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 min-h-screen">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">CH</span>
            </div>
            <span className="text-lg font-semibold">ConnectHub</span>
          </Link>
        </div>
        <div className="px-3 flex-1 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.key}
                  onClick={() => setActiveTab(item.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${activeTab === item.key ? 'bg-black text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              )
            })}
          </div>
          <div className="border-t border-gray-100 mt-6 pt-6">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <Settings className="w-4 h-4" /> Settings
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
              <LogOut className="w-4 h-4" /> Log out
            </button>
          </div>
        </div>
      </aside>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white text-xxs font-bold">CH</span>
            </div>
            <span className="text-sm font-semibold" />
          </Link>
          <div className="flex gap-2">
            <Bell className="w-5 h-5 text-gray-600" />
            <button className="w-7 h-7 bg-black text-white rounded-full text-xs font-semibold flex items-center justify-center">
              JD
            </button>
          </div>
        </div>
        <div className="flex overflow-x-auto gap-2 mt-3 pb-2 scrollbar-none max-w-full overflow-scroll no-scrollbar" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex-shrink-0 flex items-center gap-1 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${activeTab === item.key ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <Icon className="w-3 h-3" />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 mt-24 lg:mt-8">
          {renderContent()}
        </div>
      </div>
    </motion.div>
  )
}
