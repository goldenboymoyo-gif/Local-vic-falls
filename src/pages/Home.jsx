import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/home/Hero'
import FeaturedSection from '../components/home/FeaturedSection'
import MustDoSection from '../components/home/MustDoSection'
import CategoryGrid from '../components/home/CategoryGrid'
import AdventureSection from '../components/home/AdventureSection'
import EatDrinkSection from '../components/home/EatDrinkSection'
import CultureSection from '../components/home/CultureSection'
import BuildYourDay from '../components/home/BuildYourDay'
import LocalVoices from '../components/home/LocalVoices'
import StaySection from '../components/home/StaySection'
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
      <FeaturedSection />
      <MustDoSection />
      <CategoryGrid />
      <AdventureSection />
      <EatDrinkSection />
      <CultureSection />
      <BuildYourDay />
      <LocalVoices />
      <StaySection />
      <CTA />
    </motion.main>
  )
}
