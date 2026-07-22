import React, { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import PremiumNav from './components/layout/PremiumNav'
import Footer from './components/layout/Footer'
import LoadingScreen from './components/ui/LoadingScreen'

const Home = lazy(() => import('./pages/Home'))
const Search = lazy(() => import('./pages/Search'))
const BusinessProfile = lazy(() => import('./pages/BusinessProfile'))
const CategoryPage = lazy(() => import('./pages/CategoryPage'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const CustomerDashboard = lazy(() => import('./pages/dashboard/CustomerDashboard'))
const ProviderDashboard = lazy(() => import('./pages/dashboard/ProviderDashboard'))
const AdminDashboard = lazy(() => import('./pages/dashboard/AdminDashboard'))
const BookingPage = lazy(() => import('./pages/BookingPage'))
const Messages = lazy(() => import('./pages/Messages'))
const Professionals = lazy(() => import('./pages/Professionals'))
const ProfessionalProfile = lazy(() => import('./pages/ProfessionalProfile'))
const About = lazy(() => import('./pages/About'))
const HowItWorks = lazy(() => import('./pages/HowItWorks'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function AppContent() {
  const location = useLocation()
  const isAuthPage = location.pathname.startsWith('/sign-in') || location.pathname.startsWith('/sign-up')
  const isDashboard = location.pathname.startsWith('/dashboard')

  return (
    <div className="min-h-screen overflow-x-hidden">
      {!isAuthPage && !isDashboard && <PremiumNav />}
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingScreen />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/business/:slug" element={<BusinessProfile />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/sign-in/*" element={<Login />} />
            <Route path="/sign-up/*" element={<Register />} />
            <Route path="/dashboard/customer/*" element={<CustomerDashboard />} />
            <Route path="/dashboard/provider/*" element={<ProviderDashboard />} />
            <Route path="/dashboard/admin/*" element={<AdminDashboard />} />
            <Route path="/booking/:businessId" element={<BookingPage />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:conversationId" element={<Messages />} />
            <Route path="/professionals" element={<Professionals />} />
            <Route path="/professional/:id" element={<ProfessionalProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      {!isAuthPage && !isDashboard && <Footer />}
    </div>
  )
}

export default function App() {
  const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (CLERK_PUBLISHABLE_KEY) {
    const ClerkProvider = React.lazy(() =>
      import('@clerk/clerk-react').then((mod) => ({
        default: ({ children }) => (
          <mod.ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
            {children}
          </mod.ClerkProvider>
        ),
      }))
    )
    return (
      <React.Suspense fallback={<LoadingScreen />}>
        <ClerkProvider>
          <AppContent />
        </ClerkProvider>
      </React.Suspense>
    )
  }

  return <AppContent />
}
