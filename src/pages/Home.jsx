import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/home/Hero'
import FeaturedBusinesses from '../components/home/FeaturedBusinesses'
import PopularProfessionals from '../components/home/PopularProfessionals'
import HowItWorks from '../components/home/HowItWorks'
import Testimonials from '../components/home/Testimonials'
import Cities from '../components/home/Cities'
import AboutUs from '../components/home/AboutUs'
import CTA from '../components/home/CTA'

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <FeaturedBusinesses />
      <PopularProfessionals />
      <HowItWorks />
      <Testimonials />
      <Cities />
      <AboutUs />
      <CTA />
    </motion.main>
  )
}
