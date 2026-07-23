import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/home/Hero'
import ExploreByMood from '../components/home/ExploreByMood'
import FeaturedExperiences from '../components/home/FeaturedExperiences'
import LocalStories from '../components/home/LocalStories'
import CommunityImpact from '../components/home/CommunityImpact'
import BecomeHost from '../components/home/BecomeHost'
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
      <ExploreByMood />
      <FeaturedExperiences />
      <LocalStories />
      <CommunityImpact />
      <BecomeHost />
      <CTA />
    </motion.main>
  )
}
