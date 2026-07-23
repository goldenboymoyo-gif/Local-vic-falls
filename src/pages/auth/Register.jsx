import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Compass } from 'lucide-react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Register() {
  const navigate = useNavigate()
  const [role, setRole] = useState('customer')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Full name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!EMAIL_REGEX.test(form.email)) e.email = 'Enter a valid email address'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters'
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password'
    else if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      setTimeout(() => {
        const redirect = localStorage.getItem('redirectAfterAuth') || (role === 'host' ? '/dashboard/provider' : '/')
        localStorage.removeItem('redirectAfterAuth')
        navigate(redirect)
      }, 800)
    }, 1500)
  }

  const fieldClass = (field) =>
    `w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none transition-colors ${
      errors[field] ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-gray-400'
    }`

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-semibold">Local <span className="text-teal-400">Vic Falls</span></span>
          </Link>

          <h1 className="text-2xl font-bold mb-1">Create your account</h1>
          <p className="text-gray-500 text-sm mb-8">Join Local Vic Falls today</p>

          {/* Role Selection */}
          <div className="flex gap-2 mb-6 bg-gray-50 p-1 rounded-xl">
            {[
              { value: 'customer', label: 'Customer' },
              { value: 'host', label: 'Host' },
            ].map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                  role === r.value ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={fieldClass('name')}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1">{errors.name}</motion.p>
                )}
              </AnimatePresence>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={fieldClass('email')}
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1">{errors.email}</motion.p>
                )}
              </AnimatePresence>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={fieldClass('password')}
              />
              <AnimatePresence>
                {errors.password && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1">{errors.password}</motion.p>
                )}
              </AnimatePresence>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm password</label>
              <input
                type="password"
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className={fieldClass('confirmPassword')}
              />
              <AnimatePresence>
                {errors.confirmPassword && (
                  <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-red-500 text-xs mt-1">{errors.confirmPassword}</motion.p>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full bg-green-500 text-white py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Account created successfully
                </motion.div>
              ) : (
                <motion.button
                  key="submit"
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white py-2.5 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating account...
                    </>
                  ) : 'Create account'}
                </motion.button>
              )}
            </AnimatePresence>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200" /></div>
            <div className="relative flex justify-center text-sm"><span className="bg-white px-3 text-gray-500">or continue with</span></div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account? <Link to="/sign-in" className="text-blue-600 font-medium hover:text-blue-700">Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right - Visual */}
      <div className="hidden lg:block flex-1 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md text-center">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Join 2,500+ adventurers</h3>
              <p className="text-gray-500 text-sm mb-6">Discover real Victoria Falls experiences — from sunset cruises to cultural village tours.</p>
              <div className="flex items-center justify-center -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br ${
                    i % 3 === 0 ? 'from-purple-400 to-pink-500' : i % 2 === 0 ? 'from-blue-400 to-indigo-500' : 'from-blue-400 to-indigo-500'
                  }`} />
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">+2k</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
