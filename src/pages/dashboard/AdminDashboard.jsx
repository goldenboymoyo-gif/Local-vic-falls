import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import {
  LayoutDashboard,
  Users,
  Building2,
  Briefcase,
  BookType,
  Star,
  TriangleAlert,
  BarChart3,
  Settings,
  LogOut,
  Activity,
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  TrendingUp,
  Search,
  Filter,
  DollarSign,
  CalendarDays,
} from 'lucide-react'

const stats = [
  { label: 'Total Users', value: '6,847', change: '+18%', color: 'bg-blue-500' },
  { label: 'Businesses', value: '542', change: '+12%', color: 'bg-green-500' },
  { label: 'Active Providers', value: '1,273', change: '+23', color: 'bg-purple-500' },
  { label: 'Monthly Bookings', value: '4,213', change: '+32', color: 'bg-blue-500' },
  { label: 'Platform Revenue', value: '$28,400', change: '+15%', color: 'bg-black' },
  { label: 'Avg Rating', value: '4.8', change: '+0.2', color: 'bg-red-500' },
]

const recentSignups = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'customer', date: '2 hours ago' },
  { id: 2, name: 'Vic Falls Elec', email: 'info@vfe.com', role: 'provider', date: '1 day ago' },
  { id: 3, name: 'Fresh & Clean Inc.', email: 'hello@fresh.com', role: 'provider', date: '2 days ago' },
  { id: 4, name: 'Mark Robinson', email: 'mark53@email.com', role: 'customer', date: '3 days ago' },
  { id: 5, name: 'Grace Okafor', email: 'grace.o@email.com', role: 'provider', date: '4 days ago' },
]

const allUsers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+263 78 234 5678', role: 'Customer', status: 'active', joined: 'Jul 19, 2026', bookings: 3 },
  { id: 2, name: 'John Doe', email: 'john@example.com', phone: '+263 77 345 6789', role: 'Customer', status: 'active', joined: 'Jul 18, 2026', bookings: 15 },
  { id: 3, name: 'Vic Falls Elec', email: 'info@vfe.com', phone: '+263 77 123 4567', role: 'Provider', status: 'active', joined: 'Jul 17, 2026', bookings: 0 },
  { id: 4, name: 'Mike Harrison', email: 'mike.h@email.com', phone: '+263 78 456 7890', role: 'Customer', status: 'active', joined: 'Jul 15, 2026', bookings: 7 },
  { id: 5, name: 'Fresh & Clean Inc.', email: 'hello@fresh.com', phone: '+263 77 567 8901', role: 'Provider', status: 'suspended', joined: 'Jul 14, 2026', bookings: 0 },
  { id: 6, name: 'Emily Chen', email: 'emily.c@email.com', phone: '+263 78 678 9012', role: 'Customer', status: 'active', joined: 'Jul 12, 2026', bookings: 5 },
  { id: 7, name: 'Mark Robinson', email: 'mark53@email.com', phone: '+263 77 789 0123', role: 'Customer', status: 'inactive', joined: 'Jul 10, 2026', bookings: 1 },
  { id: 8, name: 'Admin User', email: 'admin@connecthub.com', phone: '+263 77 000 0001', role: 'Admin', status: 'active', joined: 'Jan 1, 2026', bookings: 0 },
  { id: 9, name: 'Grace Okafor', email: 'grace.o@email.com', phone: '+263 78 890 1234', role: 'Provider', status: 'active', joined: 'Jul 8, 2026', bookings: 0 },
  { id: 10, name: 'David Moyo', email: 'david.m@email.com', phone: '+263 77 901 2345', role: 'Customer', status: 'active', joined: 'Jul 6, 2026', bookings: 9 },
]

const allBusinesses = [
  { id: 1, name: 'Vic Falls Electrical', owner: 'Joe Mwangi', category: 'Electrical', status: 'active', rating: 4.9, reviews: 127, listed: 'Jan 15, 2026' },
  { id: 2, name: 'Mosi Plumbers', owner: 'Peter Nkomo', category: 'Plumbing', status: 'active', rating: 4.7, reviews: 89, listed: 'Feb 3, 2026' },
  { id: 3, name: 'Wild Horizon Photo', owner: 'Anna Wilson', category: 'Photography', status: 'active', rating: 5.0, reviews: 214, listed: 'Mar 10, 2026' },
  { id: 4, name: 'Fresh & Clean Inc.', owner: 'Lisa Chuma', category: 'Cleaning', status: 'suspended', rating: 3.2, reviews: 41, listed: 'Apr 22, 2026' },
  { id: 5, name: 'Batau Medical Centre', owner: 'Dr. Banda', category: 'Healthcare', status: 'active', rating: 4.8, reviews: 156, listed: 'Feb 18, 2026' },
  { id: 6, name: 'Circuit City Repairs', owner: 'David Kimani', category: 'Electronics', status: 'pending', rating: 4.5, reviews: 48, listed: 'May 5, 2026' },
  { id: 7, name: 'Zambezi Cleaners', owner: 'Rose Mutasa', category: 'Cleaning', status: 'active', rating: 4.6, reviews: 73, listed: 'Mar 28, 2026' },
  { id: 8, name: 'Thunder Fitness', owner: 'Mike Harrison', category: 'Fitness', status: 'active', rating: 4.3, reviews: 36, listed: 'Jun 12, 2026' },
]

const allProviders = [
  { id: 1, name: 'Vic Falls Electrical', owner: 'Joe Mwangi', category: 'Electrical', status: 'active', rating: 4.9, jobs: 124, revenue: '$12,400' },
  { id: 2, name: 'Mosi Plumbers', owner: 'Peter Nkomo', category: 'Plumbing', status: 'active', rating: 4.7, jobs: 89, revenue: '$8,900' },
  { id: 3, name: 'Wild Horizon Photo', owner: 'Anna Wilson', category: 'Photography', status: 'active', rating: 5.0, jobs: 214, revenue: '$17,120' },
  { id: 4, name: 'Fresh & Clean Inc.', owner: 'Lisa Chuma', category: 'Cleaning', status: 'suspended', rating: 3.2, jobs: 41, revenue: '$2,460' },
  { id: 5, name: 'Batau Medical Centre', owner: 'Dr. Banda', category: 'Healthcare', status: 'active', rating: 4.8, jobs: 156, revenue: '$9,360' },
  { id: 6, name: 'Circuit City Repairs', owner: 'David Kimani', category: 'Electronics', status: 'pending', rating: 4.5, jobs: 48, revenue: '$2,880' },
]

const categories = [
  { id: 1, name: 'Electrical', businesses: 45, icon: '⚡' },
  { id: 2, name: 'Plumbing', businesses: 38, icon: '🔧' },
  { id: 3, name: 'Photography', businesses: 27, icon: '📸' },
  { id: 4, name: 'Cleaning', businesses: 64, icon: '🧹' },
  { id: 5, name: 'Healthcare', businesses: 19, icon: '🏥' },
  { id: 6, name: 'Electronics', businesses: 33, icon: '💻' },
  { id: 7, name: 'Fitness', businesses: 22, icon: '🏋️' },
  { id: 8, name: 'Automotive', businesses: 31, icon: '🚗' },
]

const platformReviews = [
  { id: 1, user: 'Sarah Johnson', business: 'Vic Falls Electrical', rating: 5, text: 'Excellent inspection service!', date: 'Jul 19, 2026', flagged: false },
  { id: 2, user: 'Mike Harrison', business: 'Mosi Plumbers', rating: 5, text: 'Quick and professional work.', date: 'Jul 17, 2026', flagged: false },
  { id: 3, user: 'Emily Chen', business: 'Fresh & Clean Inc.', rating: 1, text: 'Terrible service, they never showed up.', date: 'Jul 15, 2026', flagged: true },
  { id: 4, user: 'David Moyo', business: 'Wild Horizon Photo', rating: 5, text: 'Best photographer in Vic Falls!', date: 'Jul 12, 2026', flagged: false },
  { id: 5, user: 'Grace Okafor', business: 'Batau Medical Centre', rating: 4, text: 'Professional staff and clean facility.', date: 'Jul 10, 2026', flagged: false },
  { id: 6, user: 'Mark Robinson', business: 'Circuit City Repairs', rating: 2, text: 'Repair didn\'t fix the problem.', date: 'Jul 8, 2026', flagged: true },
]

const reports = [
  { id: 1, type: 'Abuse', item: 'Offensive review on Vic Falls Electrical', reportedBy: 'Sarah Johnson', status: 'pending', date: 'Jul 19, 2026' },
  { id: 2, type: 'Spam', item: 'Fake reviews on Fresh & Clean Inc.', reportedBy: 'Mike Harrison', status: 'pending', date: 'Jul 18, 2026' },
  { id: 3, type: 'Fake Service', item: 'Provider listing with false credentials', reportedBy: 'System', status: 'investigating', date: 'Jul 16, 2026' },
  { id: 4, type: 'Fraud', item: 'Booking dispute — charged but no service', reportedBy: 'Emily Chen', status: 'pending', date: 'Jul 14, 2026' },
  { id: 5, type: 'Abuse', item: 'Harassment in messages', reportedBy: 'Grace Okafor', status: 'resolved', date: 'Jul 10, 2026' },
  { id: 6, type: 'Spam', item: 'Repeated duplicate listings', reportedBy: 'System', status: 'resolved', date: 'Jul 8, 2026' },
]

const revenueData = [
  { month: 'Jan', amount: 4200 },
  { month: 'Feb', amount: 5100 },
  { month: 'Mar', amount: 6800 },
  { month: 'Apr', amount: 5900 },
  { month: 'May', amount: 7400 },
  { month: 'Jun', amount: 8200 },
]

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', key: 'overview' },
  { icon: Users, label: 'Users', key: 'users' },
  { icon: Building2, label: 'Businesses', key: 'businesses' },
  { icon: Briefcase, label: 'Providers', key: 'providers' },
  { icon: BookType, label: 'Categories', key: 'categories' },
  { icon: Star, label: 'Reviews', key: 'reviews' },
  { icon: TriangleAlert, label: 'Reports', key: 'reports' },
  { icon: BarChart3, label: 'Analytics', key: 'analytics' },
  { icon: Settings, label: 'Settings', key: 'settings' },
]

function StatusBadge({ status }) {
  const styles = {
    active: 'text-green-700 bg-green-50 border-green-200',
    suspended: 'text-red-700 bg-red-50 border-red-200',
    inactive: 'text-gray-600 bg-gray-50 border-gray-200',
    pending: 'text-blue-700 bg-blue-50 border-blue-200',
    resolved: 'text-green-700 bg-green-50 border-green-200',
    investigating: 'text-blue-700 bg-blue-50 border-blue-200',
  }
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${styles[status] || styles.active}`}>
      {status}
    </span>
  )
}

function RoleBadge({ role }) {
  const styles = {
    Customer: 'text-blue-700 bg-blue-50 border-blue-200',
    Provider: 'text-purple-700 bg-purple-50 border-purple-200',
    Admin: 'text-red-700 bg-red-50 border-red-200',
  }
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${styles[role] || ''}`}>
      {role}
    </span>
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

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [reportList, setReportList] = useState(reports)
  const [userSearch, setUserSearch] = useState('')
  const [businessFilter, setBusinessFilter] = useState('all')

  const resolveReport = (id) => {
    setReportList(prev => prev.map(r => r.id === id ? { ...r, status: 'resolved' } : r))
  }

  const dismissReport = (id) => {
    setReportList(prev => prev.filter(r => r.id !== id))
  }

  const filteredUsers = allUsers.filter(u =>
    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  )

  const filteredBusinesses = allBusinesses.filter(b =>
    businessFilter === 'all' || b.status === businessFilter
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <TabContent>
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <span className="text-sm text-gray-500">Platform overview</span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                      <span className="text-xs text-green-600 font-medium">{stat.change}</span>
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                      <h2 className="font-semibold">Recent Signups</h2>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {recentSignups.map((u) => (
                        <div key={u.id} className="flex items-center gap-3 p-4">
                          <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold">
                            {u.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">{u.name}</div>
                            <div className="text-xs text-gray-500">{u.email}</div>
                          </div>
                          <RoleBadge role={u.role === 'customer' ? 'Customer' : 'Provider'} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <div className="bg-gradient-to-r from-black to-gray-800 rounded-2xl p-7 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h2 className="text-lg font-bold">Platform Health</h2>
                        <p className="text-white/60 text-sm mt-1">All systems operational</p>
                      </div>
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Activity className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div>
                        <div className="text-sm text-white/60">Uptime</div>
                        <div className="text-lg font-semibold">99.9%</div>
                      </div>
                      <div>
                        <div className="text-sm text-white/60">Response</div>
                        <div className="text-lg font-semibold">0.8s</div>
                      </div>
                      <div>
                        <div className="text-sm text-white/60">Support</div>
                        <div className="text-lg font-semibold">12 open</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold">Revenue Trend</h2>
                    <span className="text-sm text-gray-400">Jan - Jun 2026</span>
                  </div>
                  <div className="h-44 flex items-end gap-3">
                    {revenueData.map((d) => {
                      const height = (d.amount / 9000) * 100
                      return (
                        <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[10px] text-gray-400 font-medium">${(d.amount / 1000).toFixed(1)}k</span>
                          <div className="w-full rounded-lg overflow-hidden" style={{ height: `${Math.max(height, 6)}%` }}>
                            <div className="w-full h-full rounded-lg" style={{ background: 'linear-gradient(180deg, #111827, #4b5563)' }} />
                          </div>
                          <span className="text-[10px] text-gray-500">{d.month}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <h2 className="font-semibold">Pending Reports</h2>
                    <span className="w-5 h-5 bg-red-100 text-red-600 text-[10px] font-bold rounded-full flex items-center justify-center">{reportList.filter(r => r.status !== 'resolved').length}</span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {reportList.filter(r => r.status !== 'resolved').slice(0, 3).map((r) => (
                      <div key={r.id} className="flex items-center justify-between p-4">
                        <div>
                          <div className="text-sm font-medium">{r.type}</div>
                          <div className="text-xs text-gray-500">{r.item}</div>
                        </div>
                        <StatusBadge status={r.status} />
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveTab('reports')} className="w-full py-3 text-sm text-blue-600 font-medium hover:bg-gray-50 transition-colors rounded-b-2xl">
                    View all reports
                  </button>
                </div>
              </div>
            </div>
          </TabContent>
        )

      case 'users':
        return (
          <TabContent>
            <div className="space-y-8">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h1 className="text-2xl font-bold">Users</h1>
                <div className="relative">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm w-64 focus:outline-none focus:ring-2 focus:ring-black/5"
                  />
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="hidden lg:grid grid-cols-7 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="col-span-2">User</span>
                  <span>Phone</span>
                  <span>Role</span>
                  <span>Status</span>
                  <span>Bookings</span>
                  <span>Joined</span>
                </div>
                {filteredUsers.map((u) => (
                  <div key={u.id} className="grid grid-cols-1 lg:grid-cols-7 gap-2 lg:gap-4 px-6 py-4 border-t border-gray-100 items-center">
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {u.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{u.name}</div>
                        <div className="text-xs text-gray-500">{u.email}</div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{u.phone}</span>
                    <RoleBadge role={u.role} />
                    <StatusBadge status={u.status} />
                    <span className="text-sm text-gray-600">{u.bookings}</span>
                    <span className="text-sm text-gray-500">{u.joined}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabContent>
        )

      case 'businesses':
        return (
          <TabContent>
            <div className="space-y-8">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h1 className="text-2xl font-bold">Businesses</h1>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  {['all', 'active', 'suspended', 'pending'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setBusinessFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${businessFilter === f ? 'bg-black text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="hidden lg:grid grid-cols-7 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="col-span-2">Business</span>
                  <span>Category</span>
                  <span>Rating</span>
                  <span>Reviews</span>
                  <span>Listed</span>
                  <span>Status</span>
                </div>
                {filteredBusinesses.map((b) => (
                  <div key={b.id} className="grid grid-cols-1 lg:grid-cols-7 gap-2 lg:gap-4 px-6 py-4 border-t border-gray-100 items-center">
                    <div className="col-span-2 flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                        <Building2 className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm text-gray-900 truncate">{b.name}</div>
                        <div className="text-xs text-gray-500 truncate">{b.owner}</div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">{b.category}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{b.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">{b.reviews}</span>
                    <span className="text-sm text-gray-500">{b.listed}</span>
                    <StatusBadge status={b.status} />
                  </div>
                ))}
              </div>
            </div>
          </TabContent>
        )

      case 'providers':
        return (
          <TabContent>
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Providers</h1>
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="hidden lg:grid grid-cols-7 gap-4 px-6 py-3 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <span className="col-span-2">Provider</span>
                  <span>Category</span>
                  <span>Rating</span>
                  <span>Jobs</span>
                  <span>Revenue</span>
                  <span>Status</span>
                </div>
                {allProviders.map((p) => (
                  <div key={p.id} className="grid grid-cols-1 lg:grid-cols-7 gap-2 lg:gap-4 px-6 py-4 border-t border-gray-100 items-center">
                    <div className="col-span-2 flex items-center gap-3">
                      <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{p.name}</div>
                        <div className="text-xs text-gray-500">{p.owner}</div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">{p.category}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{p.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">{p.jobs}</span>
                    <span className="text-sm font-medium text-green-600">{p.revenue}</span>
                    <StatusBadge status={p.status} />
                  </div>
                ))}
              </div>
            </div>
          </TabContent>
        )

      case 'categories':
        return (
          <TabContent>
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Categories</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {categories.map((cat) => (
                  <div key={cat.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                    <div className="text-3xl mb-3">{cat.icon}</div>
                    <h3 className="font-semibold">{cat.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{cat.businesses} businesses</p>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button className="text-xs text-blue-600 font-medium hover:underline">Manage</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabContent>
        )

      case 'reviews':
        return (
          <TabContent>
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Reviews</h1>
              <div className="space-y-4">
                {platformReviews.map((r) => (
                  <div key={r.id} className={`bg-white rounded-2xl border p-5 ${r.flagged ? 'border-red-200 bg-red-50/20' : 'border-gray-100'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-sm">{r.user}</span>
                          <span className="text-xs text-gray-400">reviewed</span>
                          <span className="font-medium text-sm">{r.business}</span>
                          {r.flagged && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">flagged</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className={`w-3.5 h-3.5 ${s <= r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                          ))}
                          <span className="text-xs text-gray-400">{r.date}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-3 leading-relaxed">{r.text}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors" title="View">
                          <Eye className="w-4 h-4 text-gray-500" />
                        </button>
                        {r.flagged && (
                          <>
                            <button className="p-2 rounded-lg hover:bg-green-100 transition-colors" title="Approve">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </button>
                            <button className="p-2 rounded-lg hover:bg-red-100 transition-colors" title="Remove">
                              <XCircle className="w-4 h-4 text-red-600" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabContent>
        )

      case 'reports':
        return (
          <TabContent>
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Reports & Moderation</h1>
              <div className="space-y-4">
                {reportList.map((r) => (
                  <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          r.type === 'Abuse' ? 'bg-red-100' : r.type === 'Spam' ? 'bg-blue-100' : r.type === 'Fraud' ? 'bg-purple-100' : 'bg-blue-100'
                        }`}>
                          <Shield className={`w-5 h-5 ${
                            r.type === 'Abuse' ? 'text-red-600' : r.type === 'Spam' ? 'text-blue-600' : r.type === 'Fraud' ? 'text-purple-600' : 'text-blue-600'
                          }`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm">{r.type}</span>
                            <StatusBadge status={r.status} />
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{r.item}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                            <span>Reported by: {r.reportedBy}</span>
                            <span>{r.date}</span>
                          </div>
                        </div>
                      </div>
                      {r.status !== 'resolved' && (
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <button
                            onClick={() => resolveReport(r.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-medium hover:bg-green-100 transition-colors"
                          >
                            <CheckCircle className="w-3 h-3" /> Resolve
                          </button>
                          <button
                            onClick={() => dismissReport(r.id)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors"
                          >
                            <XCircle className="w-3 h-3" /> Dismiss
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabContent>
        )

      case 'analytics':
        return (
          <TabContent>
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Analytics</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold">Revenue by Month</h2>
                    <span className="text-sm text-gray-400">Jan - Jun 2026</span>
                  </div>
                  <div className="h-48 flex items-end gap-3">
                    {revenueData.map((d) => {
                      const height = (d.amount / 9000) * 100
                      return (
                        <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[10px] text-gray-400 font-medium">${(d.amount / 1000).toFixed(1)}k</span>
                          <div className="w-full rounded-lg overflow-hidden" style={{ height: `${Math.max(height, 6)}%` }}>
                            <div className="w-full h-full rounded-lg" style={{ background: 'linear-gradient(180deg, #6366f1, #818cf8)' }} />
                          </div>
                          <span className="text-[10px] text-gray-500">{d.month}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold">User Growth</h2>
                    <span className="text-sm text-gray-400">Jan - Jun 2026</span>
                  </div>
                  <div className="h-48 flex items-end gap-3">
                    {[
                      { month: 'Jan', amount: 3200 },
                      { month: 'Feb', amount: 3800 },
                      { month: 'Mar', amount: 4500 },
                      { month: 'Apr', amount: 5100 },
                      { month: 'May', amount: 5900 },
                      { month: 'Jun', amount: 6847 },
                    ].map((d) => {
                      const height = (d.amount / 8000) * 100
                      return (
                        <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                          <span className="text-[10px] text-gray-400 font-medium">{(d.amount / 1000).toFixed(1)}k</span>
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

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="text-2xl font-bold">$28,400</div>
                  <div className="text-sm text-gray-500 mt-1">Total Revenue</div>
                  <div className="text-xs text-green-600 mt-2">+15% growth</div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="text-2xl font-bold">4,213</div>
                  <div className="text-sm text-gray-500 mt-1">Monthly Bookings</div>
                  <div className="text-xs text-green-600 mt-2">+32 from last month</div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="text-2xl font-bold">6.7%</div>
                  <div className="text-sm text-gray-500 mt-1">Booking Rate</div>
                  <div className="text-xs text-green-600 mt-2">+0.5% improvement</div>
                </div>
                <div className="bg-white rounded-2xl p-6 border border-gray-100">
                  <div className="text-2xl font-bold">$6.74</div>
                  <div className="text-sm text-gray-500 mt-1">Revenue per User</div>
                  <div className="text-xs text-blue-600 mt-2">-0.12 from last month</div>
                </div>
              </div>
            </div>
          </TabContent>
        )

      case 'settings':
        return (
          <TabContent>
            <div className="space-y-8">
              <h1 className="text-2xl font-bold">Platform Settings</h1>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                  <h2 className="font-semibold">General</h2>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Platform name</label>
                    <input type="text" defaultValue="ConnectHub" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Support email</label>
                    <input type="email" defaultValue="support@connecthub.com" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Platform fee (%)</label>
                    <input type="number" defaultValue="5" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black/5" />
                  </div>
                  <button className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                    Save changes
                  </button>
                </div>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
                  <h2 className="font-semibold">Notifications</h2>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Email notifications</div>
                      <div className="text-xs text-gray-500">Send email for new signups</div>
                    </div>
                    <div className="relative w-10 h-5 bg-green-500 rounded-full">
                      <div className="absolute top-0.5 left-5 w-4 h-4 bg-white rounded-full shadow" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Report alerts</div>
                      <div className="text-xs text-gray-500">Notify on new reports</div>
                    </div>
                    <div className="relative w-10 h-5 bg-green-500 rounded-full">
                      <div className="absolute top-0.5 left-5 w-4 h-4 bg-white rounded-full shadow" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium">Weekly digest</div>
                      <div className="text-xs text-gray-500">Weekly platform summary</div>
                    </div>
                    <div className="relative w-10 h-5 bg-gray-300 rounded-full">
                      <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow" />
                    </div>
                  </div>
                  <button className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors">
                    Save changes
                  </button>
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
          <div className="mt-5 flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white text-xs font-bold">AD</div>
            <div>
              <div className="font-medium text-sm">Admin</div>
              <div className="text-xs text-gray-500">Platform management</div>
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
          </Link>
          <div className="w-7 h-7 bg-black rounded-lg flex items-center justify-center text-white text-xs font-bold">AD</div>
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
