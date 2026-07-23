import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import {
  LayoutDashboard,
  Briefcase,
  CalendarDays,
  MessageCircle,
  Star,
  DollarSign,
  Users,
  User,
  Settings,
  LogOut,
  Plus,
  Clock,
  ArrowUp,
  Bell,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Ban,
  CreditCard,
  UserPlus,
  StarIcon,
} from 'lucide-react'

const monthlyData = [
  { month: 'Jan', amount: 1800 },
  { month: 'Feb', amount: 2200 },
  { month: 'Mar', amount: 2800 },
  { month: 'Apr', amount: 2500 },
  { month: 'May', amount: 3200 },
  { month: 'Jun', amount: 3600 },
]

const upcomingJobs = [
  { id: 1, client: 'Sarah Johnson', service: 'Sunset Zambezi Cruise', date: 'Jul 25, 2026', time: '4:00 PM', price: 120, status: 'confirmed' },
  { id: 2, client: 'Mike Harrison', service: 'Victoria Falls Guided Walk', date: 'Jul 27, 2026', time: '8:30 AM', price: 85, status: 'confirmed' },
  { id: 3, client: 'Emily Chen', service: 'Boma Dinner & Drum Show', date: 'Jul 29, 2026', time: '6:30 PM', price: 65, status: 'pending' },
  { id: 4, client: 'David Moyo', service: 'Helicopter Flight of Angels', date: 'Jul 31, 2026', time: '10:00 AM', price: 180, status: 'confirmed' },
]

const pastJobs = [
  { id: 5, client: 'Anna Wilson', service: 'White Water Rafting', date: 'Jul 15, 2026', time: '7:00 AM', price: 150, status: 'completed' },
  { id: 6, client: 'Peter Nkomo', service: 'Elephant Sanctuary Visit', date: 'Jul 10, 2026', time: '9:00 AM', price: 95, status: 'completed' },
  { id: 7, client: 'Lisa Chuma', service: 'Cultural Village Tour', date: 'Jul 5, 2026', time: '10:00 AM', price: 45, status: 'cancelled' },
  { id: 8, client: 'James Banda', service: 'Bungee Jumping', date: 'Jun 28, 2026', time: '12:00 PM', price: 160, status: 'completed' },
]

const teamMembers = [
  { name: 'Tendai Moyo', role: 'Lead Guide', rating: 4.9, jobs: 213, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80' },
  { name: 'Grace Ncube', role: 'Safari Guide', rating: 4.8, jobs: 178, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80' },
  { name: 'Blessing Mlambo', role: 'Adventure Guide', rating: 4.7, jobs: 95, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&q=80' },
  { name: 'Rutendo Chirara', role: 'Cultural Host', rating: 4.8, jobs: 134, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&q=80' },
]

const allServices = [
  { name: 'Sunset Zambezi Cruise', price: 120, duration: '3 hours', active: true, bookings: 89 },
  { name: 'Victoria Falls Guided Walk', price: 85, duration: '2 hours', active: true, bookings: 156 },
  { name: 'Boma Dinner & Drum Show', price: 65, duration: '3 hours', active: true, bookings: 203 },
  { name: 'Helicopter Flight of Angels', price: 180, duration: '15 mins', active: true, bookings: 67 },
  { name: 'Bungee Jumping', price: 160, duration: '30 mins', active: false, bookings: 45 },
]

const providerReviews = [
  { id: 1, client: 'Sarah Johnson', rating: 5, text: 'Incredible sunset cruise! The guide was knowledgeable and the views were breathtaking. A must-do in Vic Falls.', date: 'Jul 18, 2026', service: 'Sunset Zambezi Cruise' },
  { id: 2, client: 'Mike Harrison', rating: 5, text: 'The walking tour was fantastic — learned so much about the Falls and the local history. Highly recommend.', date: 'Jul 12, 2026', service: 'Victoria Falls Guided Walk' },
  { id: 3, client: 'Emily Chen', rating: 4, text: 'Great dinner experience with authentic Zimbabwean food and amazing drum performance. A bit crowded but still wonderful.', date: 'Jul 5, 2026', service: 'Boma Dinner & Drum Show' },
  { id: 4, client: 'David Moyo', rating: 5, text: 'The helicopter flight was the highlight of our trip! Stunning aerial views of the Falls. Worth every penny.', date: 'Jun 28, 2026', service: 'Helicopter Flight of Angels' },
]

const notifications = [
  { id: 1, icon: CheckCircle, color: 'text-green-600 bg-green-100', text: 'Booking confirmed — Sarah Johnson, Sunset Cruise Jul 25', time: '2 hours ago', read: false },
  { id: 2, icon: StarIcon, color: 'text-blue-600 bg-blue-100', text: 'New 5-star review from Sarah Johnson', time: '5 hours ago', read: false },
  { id: 3, icon: CreditCard, color: 'text-blue-600 bg-blue-100', text: 'Payment of $120 received from Sarah Johnson', time: '1 day ago', read: false },
  { id: 4, icon: UserPlus, color: 'text-purple-600 bg-purple-100', text: 'New booking request from Emily Chen — Boma Dinner', time: '2 days ago', read: true },
  { id: 5, icon: AlertCircle, color: 'text-blue-600 bg-blue-100', text: 'Emily Chen requested a dietary preference update', time: '3 days ago', read: true },
  { id: 6, icon: CheckCircle, color: 'text-green-600 bg-green-100', text: 'Booking confirmed — David Moyo, Helicopter Jul 31', time: '4 days ago', read: true },
]

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', key: 'overview' },
  { icon: Briefcase, label: 'Services', key: 'services' },
  { icon: CalendarDays, label: 'Jobs', key: 'jobs' },
  { icon: Users, label: 'Team', key: 'team' },
  { icon: DollarSign, label: 'Earnings', key: 'earnings' },
  { icon: Star, label: 'Reviews', key: 'reviews' },
  { icon: Bell, label: 'Notifications', key: 'notifications' },
  { icon: MessageCircle, label: 'Messages', key: 'messages' },
  { icon: User, label: 'Profile', key: 'profile' },
]

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

export default function ProviderDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [services, setServices] = useState(allServices)

  const toggleService = (index) => {
    setServices(prev => prev.map((s, i) => i === index ? { ...s, active: !s.active } : s))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <TabContent>
            <div className="space-y-10">
              <h1 className="text-2xl font-bold">Welcome back, Joe!</h1>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">$3,200</div>
                  <div className="text-sm text-gray-500 mt-1">Monthly Earnings</div>
                  <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
                    <ArrowUp className="w-3 h-3" /> 16% from last month
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                      <CalendarDays className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">15</div>
                  <div className="text-sm text-gray-500 mt-1">Active Experiences</div>
                  <div className="flex items-center gap-1 text-xs text-blue-600 mt-2">
                    <Clock className="w-3 h-3" /> 4 this week
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Star className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">4.9</div>
                  <div className="text-sm text-gray-500 mt-1">Rating</div>
                  <div className="flex items-center gap-1 text-xs text-blue-600 mt-2">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> 127 reviews
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-gray-500 mt-1">Experiences</div>
                  <div className="flex items-center gap-1 text-xs text-purple-600 mt-2">
                    <TrendingUp className="w-3 h-3" /> 4 active
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold">Earnings Overview</h2>
                      <span className="text-sm text-gray-400">Jan - Jun 2026</span>
                    </div>
                    <div className="h-48 flex items-end gap-3">
                      {monthlyData.map((d) => {
                        const height = (d.amount / 4000) * 100
                        return (
                          <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                            <span className="text-[10px] text-gray-400 font-medium">${d.amount.toLocaleString()}</span>
                            <div className="w-full rounded-lg overflow-hidden" style={{ height: `${Math.max(height, 6)}%` }}>
                              <div className="w-full h-full rounded-lg" style={{ background: 'linear-gradient(180deg, #22c55e, #4ade80)' }} />
                            </div>
                            <span className="text-[10px] text-gray-500">{d.month}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-2">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    {unreadCount > 0 && <span className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>}
                  </div>
                  <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
                    {notifications.slice(0, 4).map((n) => {
                      const Icon = n.icon
                      return (
                        <div key={n.id} className={`flex items-start gap-3 p-4 ${!n.read ? 'bg-blue-50/30' : ''}`}>
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${n.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium leading-relaxed">{n.text}</p>
                            <span className="text-[10px] text-gray-400 mt-0.5 block">{n.time}</span>
                          </div>
                          {!n.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1" />}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-lg font-semibold">Upcoming Jobs</h2>
                  <button onClick={() => setActiveTab('jobs')} className="text-sm text-blue-600 font-medium hover:underline">View all</button>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="hidden lg:grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <span>Client</span>
                    <span>Service</span>
                    <span>Date</span>
                    <span>Price</span>
                    <span>Status</span>
                  </div>
                  {upcomingJobs.map((job) => (
                    <div key={job.id} className="grid grid-cols-1 lg:grid-cols-5 gap-2 lg:gap-4 px-6 py-4 border-t border-gray-100 items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold">
                          {job.client.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-sm">{job.client}</span>
                      </div>
                      <span className="text-sm text-gray-600">{job.service}</span>
                      <span className="text-sm text-gray-600">{job.date}</span>
                      <span className="text-sm font-medium">${job.price}</span>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full border w-fit ${job.status === 'confirmed' ? 'text-green-700 bg-green-50 border-green-200' : 'text-blue-700 bg-blue-50 border-blue-200'}`}>{job.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-5">Team Roster</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {teamMembers.map((member) => (
                    <div key={member.name} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <img src={member.image} alt="" className="w-11 h-11 rounded-xl object-cover" />
                        <div>
                          <div className="font-medium text-sm">{member.name}</div>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {member.rating}</span>
                        <span>{member.jobs} jobs</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabContent>
        )

      case 'services':
        return (
          <TabContent>
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">My Services</h1>
                <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                  <Plus className="w-4 h-4" /> Add Service
                </button>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="hidden lg:grid grid-cols-6 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="col-span-2">Service</span>
                  <span>Price</span>
                  <span>Duration</span>
                  <span>Bookings</span>
                  <span>Status</span>
                </div>
                {services.map((svc, i) => (
                  <div key={svc.name} className="grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-4 px-6 py-4 border-t border-gray-100 items-center">
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="font-medium text-sm">{svc.name}</span>
                    </div>
                    <span className="text-sm font-semibold">${svc.price}</span>
                    <span className="text-sm text-gray-600 flex items-center gap-1"><Clock className="w-3 h-3" /> {svc.duration}</span>
                    <span className="text-sm text-gray-600">{svc.bookings}</span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleService(i)}
                        className={`relative w-10 h-5 rounded-full transition-colors ${svc.active ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${svc.active ? 'left-5' : 'left-0.5'}`} />
                      </button>
                      <span className={`text-xs font-medium ${svc.active ? 'text-green-600' : 'text-gray-400'}`}>
                        {svc.active ? 'Active' : 'Hidden'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabContent>
        )

      case 'jobs':
        return (
          <TabContent>
            <div className="space-y-10">
              <h1 className="text-2xl font-bold">All Jobs</h1>
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Upcoming</h2>
                <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
                  {upcomingJobs.map((job) => (
                    <div key={job.id} className="flex items-center gap-4 p-5 lg:p-6">
                      <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {job.client.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{job.service}</h3>
                        <p className="text-sm text-gray-500">{job.client}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{job.date} at {job.time}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-semibold">${job.price}</div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full border mt-1 inline-block ${job.status === 'confirmed' ? 'text-green-700 bg-green-50 border-green-200' : 'text-blue-700 bg-blue-50 border-blue-200'}`}>{job.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Past</h2>
                <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
                  {pastJobs.map((job) => (
                    <div key={job.id} className="flex items-center gap-4 p-5 lg:p-6 opacity-75">
                      <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {job.client.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{job.service}</h3>
                        <p className="text-sm text-gray-500">{job.client}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{job.date} at {job.time}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-semibold">${job.price}</div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full border mt-1 inline-block ${
                          job.status === 'completed' ? 'text-blue-700 bg-blue-50 border-blue-200' : 'text-red-700 bg-red-50 border-red-200'
                        }`}>{job.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabContent>
        )

      case 'team':
        return (
          <TabContent>
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Team</h1>
                <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                  <Plus className="w-4 h-4" /> Add Member
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {teamMembers.map((member) => (
                  <div key={member.name} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <img src={member.image} alt="" className="w-14 h-14 rounded-2xl object-cover" />
                      <div>
                        <div className="font-semibold">{member.name}</div>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-gray-100">
                      <div>
                        <div className="flex items-center gap-1 text-sm font-medium">
                          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                          {member.rating}
                        </div>
                        <div className="text-xs text-gray-500 mt-0.5">Rating</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium">{member.jobs}</div>
                        <div className="text-xs text-gray-500 mt-0.5">Jobs done</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-green-600">Active</div>
                        <div className="text-xs text-gray-500 mt-0.5">Status</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabContent>
        )

      case 'earnings':
        return (
          <TabContent>
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Earnings</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-7 text-white">
                  <div className="text-sm text-white/80">Total Earnings</div>
                  <div className="text-4xl font-bold mt-1">$28,500</div>
                  <div className="text-sm text-white/60 mt-2">All time</div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-7 text-white">
                  <div className="text-sm text-white/80">Pending Payout</div>
                  <div className="text-4xl font-bold mt-1">$400</div>
                  <div className="text-sm text-white/60 mt-2">Next payout: Aug 1, 2026</div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Monthly Breakdown</h2>
                  <span className="text-sm text-gray-400">Jan - Jun 2026</span>
                </div>
                <div className="h-56 flex items-end gap-3">
                  {monthlyData.map((d) => {
                    const height = (d.amount / 4000) * 100
                    return (
                      <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs font-medium text-gray-600">${d.amount.toLocaleString()}</span>
                        <div className="w-full rounded-lg overflow-hidden" style={{ height: `${Math.max(height, 6)}%` }}>
                          <div className="w-full h-full rounded-lg" style={{ background: 'linear-gradient(180deg, #22c55e, #4ade80)' }} />
                        </div>
                        <span className="text-xs text-gray-500">{d.month}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h3 className="font-semibold">Recent Transactions</h3>
                </div>
                <div className="divide-y divide-gray-100">
                                      {[
                    { desc: 'Sunset Zambezi Cruise — Sarah Johnson', amount: '$120', date: 'Jul 18, 2026', type: 'credit' },
                    { desc: 'Victoria Falls Walk — Anna Wilson', amount: '$85', date: 'Jul 15, 2026', type: 'credit' },
                    { desc: 'Boma Dinner — Peter Nkomo', amount: '$65', date: 'Jul 10, 2026', type: 'credit' },
                    { desc: 'Platform fee', amount: '-$15', date: 'Jul 10, 2026', type: 'debit' },
                    { desc: 'Helicopter Flight — James Banda', amount: '$180', date: 'Jun 28, 2026', type: 'credit' },
                    { desc: 'Platform fee', amount: '-$20', date: 'Jun 28, 2026', type: 'debit' },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between px-6 py-4">
                      <div>
                        <div className="text-sm font-medium">{tx.desc}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{tx.date}</div>
                      </div>
                      <span className={`text-sm font-semibold ${tx.type === 'credit' ? 'text-green-600' : 'text-red-500'}`}>{tx.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabContent>
        )

      case 'reviews':
        return (
          <TabContent>
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Customer Reviews</h1>
              <div className="space-y-5">
                {providerReviews.map((r) => (
                  <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold">
                          {r.client.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-sm">{r.client}</div>
                          <div className="text-xs text-gray-400">{r.service}</div>
                        </div>
                      </div>
                      <StarRating rating={r.rating} />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                    <span className="text-xs text-gray-400 mt-2 block">{r.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabContent>
        )

      case 'notifications':
        return (
          <TabContent>
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Notifications</h1>
                <button className="text-sm text-blue-600 font-medium hover:underline">Mark all read</button>
              </div>
              <div className="space-y-3">
                {notifications.map((n) => {
                  const Icon = n.icon
                  return (
                    <div key={n.id} className={`bg-white rounded-2xl border border-gray-100 p-5 flex items-start gap-4 hover:shadow-sm transition-shadow ${!n.read ? 'border-l-2 border-l-blue-500' : ''}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${n.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-relaxed">{n.text}</p>
                        <span className="text-xs text-gray-400 mt-1 block">{n.time}</span>
                      </div>
                      {!n.read && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0 mt-1" />}
                    </div>
                  )
                })}
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
                <p className="text-sm text-gray-500 max-w-sm mx-auto">Direct messaging with customers will be available soon. Communicate about bookings, share updates, and manage requests.</p>
              </div>
            </div>
          </TabContent>
        )

      case 'profile':
        return (
          <TabContent>
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Business Profile</h1>
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center text-2xl font-bold mb-4">
                        VF
                      </div>
                      <h3 className="font-semibold text-lg">Vic Falls Adventures</h3>
                      <p className="text-sm text-gray-500 mt-1">hello@vcfadventures.com</p>
                      <span className="text-xs text-green-600 font-medium mt-2">Verified Provider</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
                      <div className="text-center">
                        <div className="font-semibold">4.9</div>
                        <div className="text-xs text-gray-500">Rating</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">127</div>
                        <div className="text-xs text-gray-500">Reviews</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold">5</div>
                        <div className="text-xs text-gray-500">Services</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-3">
                  <form className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Business name</label>
                      <input type="text" defaultValue="Vic Falls Adventures" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                      <input type="email" defaultValue="hello@vcfadventures.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                      <input type="text" defaultValue="+263 77 123 4567" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Location</label>
                      <input type="text" defaultValue="Victoria Falls, Zimbabwe" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                      <textarea rows={3} defaultValue="Authentic Victoria Falls experiences — from sunset cruises on the Zambezi to cultural village tours and adrenaline adventures." className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-black/5" />
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
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
              </svg>
            </div>
            <span className="text-lg font-semibold">Local <span className="text-teal-400">Vic Falls</span></span>
          </Link>
            <div className="mt-5 flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">VF</div>
              <div>
                <div className="font-medium text-sm">Vic Falls Host</div>
                <div className="text-xs text-gray-500">Host account</div>
              </div>
            </div>
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
            <div className="w-7 h-7 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z" />
              </svg>
            </div>
          </Link>
          <div className="w-7 h-7 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">VF</div>
        </div>
        <div className="flex overflow-x-auto gap-2 mt-3 pb-2 no-scrollbar" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 mt-24 lg:mt-8">
          {renderContent()}
        </div>
      </div>
    </motion.div>
  )
}
