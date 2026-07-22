import React, { useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useParams, Link } from 'react-router-dom'
import { ArrowRight, Search, Star, CheckCircle, ChevronLeft } from 'lucide-react'
import { gsap } from 'gsap'
import { categories } from '../data/mockData'
import { featuredBusinesses } from '../data/mockData'

const categoryMockData = {
  electricians: [
    { id: 'e1', name: 'Zim Electric Solutions', slug: 'zim-electric', category: 'Electrician', rating: 4.8, reviews: 145, image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'e2', name: 'Thunderbolt Electrical', slug: 'thunderbolt-electrical', category: 'Electrician', rating: 4.6, reviews: 89, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'e3', name: 'PowerLine Services', slug: 'powerline-services', category: 'Electrician', rating: 4.7, reviews: 112, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'e4', name: 'Copper Wire Electricians', slug: 'copper-wire', category: 'Electrician', rating: 4.9, reviews: 201, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'e5', name: 'LightUp Victoria', slug: 'lightup-vic', category: 'Electrician', rating: 4.5, reviews: 67, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'e6', name: 'SparkSafe Electrical Co', slug: 'sparksafe', category: 'Electrician', rating: 4.8, reviews: 178, image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  plumbers: [
    { id: 'p1', name: 'FlowRight Plumbing', slug: 'flowright-plumbing', category: 'Plumber', rating: 4.7, reviews: 134, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'p2', name: 'AquaFlow Solutions', slug: 'aquaflow-solutions', category: 'Plumber', rating: 4.5, reviews: 78, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'p3', name: 'Zambezi Pipe & Drain', slug: 'zambezi-pipe', category: 'Plumber', rating: 4.8, reviews: 156, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'p4', name: 'ClearDrain Plumbers', slug: 'cleardrain', category: 'Plumber', rating: 4.6, reviews: 92, image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'p5', name: 'WaterWorks Victoria', slug: 'waterworks-vic', category: 'Plumber', rating: 4.9, reviews: 211, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'p6', name: 'Rapid Fix Plumbing', slug: 'rapid-fix-plumbing', category: 'Plumber', rating: 4.4, reviews: 54, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  carpenters: [
    { id: 'cn1', name: 'TimberCraft Zimbabwe', slug: 'timbercraft-zim', category: 'Carpenter', rating: 4.9, reviews: 187, image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'cn2', name: 'WoodNook Joinery', slug: 'woodnook-joinery', category: 'Carpenter', rating: 4.7, reviews: 112, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'cn3', name: 'Chisel & Grain', slug: 'chisel-grain', category: 'Carpenter', rating: 4.8, reviews: 145, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'cn4', name: 'OakFrame Carpentry', slug: 'oakframe-carpentry', category: 'Carpenter', rating: 4.6, reviews: 78, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'cn5', name: 'Baobab Woodworks', slug: 'baobab-woodworks', category: 'Carpenter', rating: 4.9, reviews: 223, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'cn6', name: 'Fine Edge Furniture', slug: 'fine-edge', category: 'Carpenter', rating: 4.5, reviews: 63, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  mechanics: [
    { id: 'm1', name: 'Safari Auto Garage', slug: 'safari-auto-garage', category: 'Mechanic', rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'm2', name: 'Vic Falls Tyre & Auto', slug: 'vicfalls-tyre-auto', category: 'Mechanic', rating: 4.5, reviews: 89, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'm3', name: 'EnginePro Zimbabwe', slug: 'enginepro-zim', category: 'Mechanic', rating: 4.8, reviews: 203, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'm4', name: 'Rapid Repair Motors', slug: 'rapid-repair-motors', category: 'Mechanic', rating: 4.6, reviews: 112, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'm5', name: 'Crown Auto Works', slug: 'crown-auto-works', category: 'Mechanic', rating: 4.9, reviews: 245, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'm6', name: 'ZimWrench Mechanics', slug: 'zimwrench', category: 'Mechanic', rating: 4.4, reviews: 67, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  'cleaning-services': [
    { id: 'cl1', name: 'Sparkle House Cleaning', slug: 'sparkle-house', category: 'Cleaning Services', rating: 4.8, reviews: 198, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'cl2', name: 'FreshStart Cleaners', slug: 'freshstart-cleaners', category: 'Cleaning Services', rating: 4.6, reviews: 123, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'cl3', name: 'Pristine Spaces', slug: 'pristine-spaces', category: 'Cleaning Services', rating: 4.9, reviews: 234, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'cl4', name: 'Victoria Clean Co', slug: 'victoria-clean-co', category: 'Cleaning Services', rating: 4.7, reviews: 145, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'cl5', name: 'MaidIn Africa', slug: 'maidin-africa', category: 'Cleaning Services', rating: 4.5, reviews: 87, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'cl6', name: 'ShineBright Services', slug: 'shinebright', category: 'Cleaning Services', rating: 4.8, reviews: 176, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  photographers: [
    { id: 'ph1', name: 'CaptureMoments Studio', slug: 'capturemoments', category: 'Photographer', rating: 4.9, reviews: 267, image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'ph2', name: 'Falls Photography Co', slug: 'falls-photo-co', category: 'Photographer', rating: 4.7, reviews: 145, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'ph3', name: 'Lens & Light Zimbabwe', slug: 'lens-light-zim', category: 'Photographer', rating: 4.8, reviews: 189, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'ph4', name: 'FramePerfect Studios', slug: 'frameperfect', category: 'Photographer', rating: 4.6, reviews: 98, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'ph5', name: 'Savannah Shots', slug: 'savannah-shots', category: 'Photographer', rating: 4.9, reviews: 312, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'ph6', name: 'SnapVic Photography', slug: 'snapvic', category: 'Photographer', rating: 4.5, reviews: 76, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  doctors: [
    { id: 'd1', name: 'Vic Falls Medical Centre', slug: 'vicfalls-medical', category: 'Doctor', rating: 4.9, reviews: 345, image: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'd2', name: 'Zambezi Health Clinic', slug: 'zambezi-health', category: 'Doctor', rating: 4.7, reviews: 178, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'd3', name: 'Sunrise Health Practice', slug: 'sunrise-health', category: 'Doctor', rating: 4.8, reviews: 212, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'd4', name: 'Rainbow Medical Centre', slug: 'rainbow-medical', category: 'Doctor', rating: 4.6, reviews: 134, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'd5', name: 'Dr Moyo & Partners', slug: 'drmoyo-partners', category: 'Doctor', rating: 4.9, reviews: 289, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'd6', name: 'CareFirst Clinic', slug: 'carefirst-clinic', category: 'Doctor', rating: 4.5, reviews: 89, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  salons: [
    { id: 's1', name: 'Glow Beauty Salon', slug: 'glow-beauty', category: 'Salon', rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 's2', name: 'Royal Hair Studio', slug: 'royal-hair', category: 'Salon', rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 's3', name: 'Crown & Glory Spa', slug: 'crown-glory', category: 'Salon', rating: 4.9, reviews: 289, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 's4', name: 'Vic Falls Hair Lounge', slug: 'vicfalls-hair-lounge', category: 'Salon', rating: 4.6, reviews: 112, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 's5', name: 'Bloom Beauty Bar', slug: 'bloom-beauty-bar', category: 'Salon', rating: 4.8, reviews: 198, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 's6', name: 'Nail & Style Victoria', slug: 'nail-style-vic', category: 'Salon', rating: 4.5, reviews: 78, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  lawyers: [
    { id: 'l1', name: 'Zambezi Legal Associates', slug: 'zambezi-legal', category: 'Lawyer', rating: 4.9, reviews: 167, image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'l2', name: 'Moyo & Ndlovu Attorneys', slug: 'moyo-ndlovu', category: 'Lawyer', rating: 4.7, reviews: 123, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'l3', name: 'Justice Partners Zimbabwe', slug: 'justice-partners', category: 'Lawyer', rating: 4.8, reviews: 198, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'l4', name: 'Vic Falls Law Centre', slug: 'vicfalls-law', category: 'Lawyer', rating: 4.6, reviews: 89, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'l5', name: 'Liberty Legal Practice', slug: 'liberty-legal', category: 'Lawyer', rating: 4.9, reviews: 234, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'l6', name: 'Cape Town & Associates', slug: 'cape-town-assoc', category: 'Lawyer', rating: 4.5, reviews: 67, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  tutors: [
    { id: 't1', name: 'BrightMinds Tutoring', slug: 'brightminds', category: 'Tutor', rating: 4.9, reviews: 256, image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 't2', name: 'EduPlus Victoria', slug: 'eduplus-vic', category: 'Tutor', rating: 4.7, reviews: 134, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 't3', name: 'SmartStep Academy', slug: 'smartstep-academy', category: 'Tutor', rating: 4.8, reviews: 189, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 't4', name: 'LearnRight Tutoring', slug: 'learnright', category: 'Tutor', rating: 4.6, reviews: 98, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 't5', name: 'Victory Prep School', slug: 'victory-prep', category: 'Tutor', rating: 4.9, reviews: 312, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 't6', name: 'ZimEd Learning Hub', slug: 'zimed-learning', category: 'Tutor', rating: 4.5, reviews: 76, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  restaurants: [
    { id: 'r1', name: 'Rainforest Bistro', slug: 'rainforest-bistro', category: 'Restaurant', rating: 4.8, reviews: 345, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'r2', name: 'Crocodile Cage Restaurant', slug: 'crocodile-cage', category: 'Restaurant', rating: 4.7, reviews: 212, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'r3', name: 'The Lookout Cafe', slug: 'lookout-cafe', category: 'Restaurant', rating: 4.9, reviews: 456, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'r4', name: 'Mama Africa Kitchen', slug: 'mama-africa-kitchen', category: 'Restaurant', rating: 4.6, reviews: 167, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'r5', name: 'Zambezi River Lodge', slug: 'zambezi-river-lodge', category: 'Restaurant', rating: 4.8, reviews: 289, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'r6', name: 'Bush Cafe Victoria', slug: 'bush-cafe-vic', category: 'Restaurant', rating: 4.5, reviews: 98, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  'fitness-trainers': [
    { id: 'ft1', name: 'IronGym Fitness Centre', slug: 'irongym', category: 'Fitness Trainer', rating: 4.8, reviews: 198, image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'ft2', name: 'FitZone Victoria', slug: 'fitzone-vic', category: 'Fitness Trainer', rating: 4.6, reviews: 112, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'ft3', name: 'SweatBox Gym', slug: 'sweatbox-gym', category: 'Fitness Trainer', rating: 4.7, reviews: 145, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'ft4', name: 'Vic Falls Personal Training', slug: 'vicfalls-pt', category: 'Fitness Trainer', rating: 4.9, reviews: 234, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'ft5', name: 'Peak Performance Gym', slug: 'peak-performance', category: 'Fitness Trainer', rating: 4.5, reviews: 78, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'ft6', name: 'BodyShape Zimbabwe', slug: 'bodyshape-zim', category: 'Fitness Trainer', rating: 4.8, reviews: 167, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  'event-planners': [
    { id: 'ep1', name: 'Savannah Events Co', slug: 'savannah-events', category: 'Event Planner', rating: 4.9, reviews: 234, image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'ep2', name: 'Zambezi Celebrations', slug: 'zambezi-celebrations', category: 'Event Planner', rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'ep3', name: 'Crown Events Zimbabwe', slug: 'crown-events', category: 'Event Planner', rating: 4.8, reviews: 189, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'ep4', name: 'Falls & Plains Events', slug: 'falls-plains', category: 'Event Planner', rating: 4.6, reviews: 98, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'ep5', name: 'Golden Hour Events', slug: 'golden-hour-events', category: 'Event Planner', rating: 4.9, reviews: 312, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'ep6', name: 'AfroChic Planners', slug: 'afrochic', category: 'Event Planner', rating: 4.5, reviews: 76, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  architects: [
    { id: 'a1', name: 'ZimArch Design Studio', slug: 'zimarch', category: 'Architect', rating: 4.9, reviews: 178, image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'a2', name: 'Horizon Architects', slug: 'horizon-architects', category: 'Architect', rating: 4.7, reviews: 123, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'a3', name: 'Baobab Design Partners', slug: 'baobab-design', category: 'Architect', rating: 4.8, reviews: 156, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'a4', name: 'Savannah Structures', slug: 'savannah-structures', category: 'Architect', rating: 4.6, reviews: 89, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'a5', name: 'Vic Falls Architecture Co', slug: 'vicfalls-arch', category: 'Architect', rating: 4.9, reviews: 245, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'a6', name: 'ModernEdge Design', slug: 'modernedge', category: 'Architect', rating: 4.5, reviews: 67, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  hotels: [
    { id: 'h1', name: 'Elephant Hills Resort', slug: 'elephant-hills', category: 'Hotel', rating: 4.8, reviews: 456, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'h2', name: 'Victoria Falls Hotel', slug: 'vic-falls-hotel', category: 'Hotel', rating: 4.9, reviews: 567, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'h3', name: 'Ilala Lodge Hotel', slug: 'ilala-lodge', category: 'Hotel', rating: 4.7, reviews: 234, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'h4', name: 'The Kingdom Hotel', slug: 'kingdom-hotel', category: 'Hotel', rating: 4.6, reviews: 189, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'h5', name: 'Stanley Safari Lodge', slug: 'stanley-safari', category: 'Hotel', rating: 4.9, reviews: 345, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'h6', name: 'Bayete Guest Lodge', slug: 'bayete-lodge', category: 'Hotel', rating: 4.5, reviews: 98, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  florists: [
    { id: 'fl1', name: 'Zambezi Bouquet Co', slug: 'zambezi-bouquet', category: 'Florist', rating: 4.8, reviews: 134, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'fl2', name: 'Wildflower Studio', slug: 'wildflower-studio', category: 'Florist', rating: 4.7, reviews: 89, image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'fl3', name: 'Petal & Stem', slug: 'petal-stem', category: 'Florist', rating: 4.9, reviews: 212, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'fl4', name: 'Falls Floral Design', slug: 'falls-floral', category: 'Florist', rating: 4.6, reviews: 78, image: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'fl5', name: 'Bloom & Blossom', slug: 'bloom-blossom', category: 'Florist', rating: 4.8, reviews: 167, image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'fl6', name: 'Savannah Bloom Florists', slug: 'savannah-bloom', category: 'Florist', rating: 4.5, reviews: 56, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  'market-vendors': [
    { id: 'mv1', name: 'Victoria Falls Market', slug: 'vic-falls-market', category: 'Market Vendor', rating: 4.7, reviews: 234, image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'mv2', name: 'Craft & Curio Market', slug: 'craft-curio', category: 'Market Vendor', rating: 4.8, reviews: 189, image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'mv3', name: 'Zambezi Trading Post', slug: 'zambezi-trading', category: 'Market Vendor', rating: 4.6, reviews: 145, image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'mv4', name: 'Rainbow Market Stall', slug: 'rainbow-market', category: 'Market Vendor', rating: 4.9, reviews: 298, image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'mv5', name: 'Falls Craft Village', slug: 'falls-craft', category: 'Market Vendor', rating: 4.5, reviews: 112, image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'mv6', name: 'Sunset Bazaar', slug: 'sunset-bazaar', category: 'Market Vendor', rating: 4.7, reviews: 167, image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  'clothes-fashion': [
    { id: 'cf1', name: 'ThreadZ Fashion House', slug: 'threadz-fashion', category: 'Clothes & Fashion', rating: 4.8, reviews: 198, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'cf2', name: 'Urban Style Zimbabwe', slug: 'urban-style-zim', category: 'Clothes & Fashion', rating: 4.6, reviews: 134, image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'cf3', name: 'Vic Falls Boutique', slug: 'vic-falls-boutique', category: 'Clothes & Fashion', rating: 4.9, reviews: 267, image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'cf4', name: 'AfroChic Clothing', slug: 'afrochic-clothing', category: 'Clothes & Fashion', rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'cf5', name: 'Zim Threads Co', slug: 'zim-threads', category: 'Clothes & Fashion', rating: 4.5, reviews: 89, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'cf6', name: 'Savannah Wear', slug: 'savannah-wear', category: 'Clothes & Fashion', rating: 4.8, reviews: 212, image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  'shoes-footwear': [
    { id: 'sf1', name: 'Sole mates Victoria', slug: 'sole-mates', category: 'Shoes & Footwear', rating: 4.7, reviews: 167, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'sf2', name: 'Kickz & More', slug: 'kickz-more', category: 'Shoes & Footwear', rating: 4.8, reviews: 212, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'sf3', name: 'Step Right Footwear', slug: 'step-right', category: 'Shoes & Footwear', rating: 4.6, reviews: 123, image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'sf4', name: 'Vic Falls Shoe Outlet', slug: 'vic-falls-shoes', category: 'Shoes & Footwear', rating: 4.5, reviews: 98, image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'sf5', name: 'Crown Sole Store', slug: 'crown-sole', category: 'Shoes & Footwear', rating: 4.9, reviews: 245, image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'sf6', name: 'WalkEasy Footwear', slug: 'walkeasy', category: 'Shoes & Footwear', rating: 4.7, reviews: 178, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  'phones-gadgets': [
    { id: 'pg1', name: 'ZimPhone Hub', slug: 'zimphone-hub', category: 'Phones & Gadgets', rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'pg2', name: 'TechZone Victoria', slug: 'techzone-vic', category: 'Phones & Gadgets', rating: 4.7, reviews: 189, image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'pg3', name: 'Mobile City VF', slug: 'mobile-city', category: 'Phones & Gadgets', rating: 4.6, reviews: 145, image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'pg4', name: 'Gadget Galaxy', slug: 'gadget-galaxy', category: 'Phones & Gadgets', rating: 4.9, reviews: 298, image: 'https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'pg5', name: 'SmartDeal Phones', slug: 'smartdeal', category: 'Phones & Gadgets', rating: 4.5, reviews: 112, image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'pg6', name: 'iConnect Store', slug: 'iconnect-store', category: 'Phones & Gadgets', rating: 4.8, reviews: 212, image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  'laptops-computers': [
    { id: 'lc1', name: 'Vic Tech Solutions', slug: 'vic-tech', category: 'Laptops & Computers', rating: 4.8, reviews: 198, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'lc2', name: 'PC World Zimbabwe', slug: 'pc-world-zim', category: 'Laptops & Computers', rating: 4.7, reviews: 167, image: 'https://images.unsplash.com/photo-1517430816045-df4b7de01234?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'lc3', name: 'ByteShop Computing', slug: 'byteshop', category: 'Laptops & Computers', rating: 4.6, reviews: 134, image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'lc4', name: 'Falls Computer Centre', slug: 'falls-computer', category: 'Laptops & Computers', rating: 4.9, reviews: 256, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'lc5', name: 'Digital Hub VF', slug: 'digital-hub', category: 'Laptops & Computers', rating: 4.5, reviews: 89, image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'lc6', name: 'Tech Mart Victoria', slug: 'tech-mart', category: 'Laptops & Computers', rating: 4.7, reviews: 178, image: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
  'speakers-audio': [
    { id: 'sa1', name: 'SoundHub Victoria', slug: 'soundhub-vic', category: 'Speakers & Audio', rating: 4.8, reviews: 189, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'sa2', name: 'Bass & Beats Store', slug: 'bass-beats', category: 'Speakers & Audio', rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'sa3', name: 'Audio World VF', slug: 'audio-world', category: 'Speakers & Audio', rating: 4.6, reviews: 123, image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: false },
    { id: 'sa4', name: 'Echo Sound Shop', slug: 'echo-sound', category: 'Speakers & Audio', rating: 4.9, reviews: 234, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'sa5', name: 'Zim Audio Centre', slug: 'zim-audio', category: 'Speakers & Audio', rating: 4.5, reviews: 98, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
    { id: 'sa6', name: 'SoundStage Electronics', slug: 'soundstage', category: 'Speakers & Audio', rating: 4.8, reviews: 212, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop', city: 'Victoria Falls', verified: true },
  ],
}

const categoryServices = {
  electricians: [
    { name: 'Full electrical inspection', price: '$85', popular: true },
    { name: 'Wiring installation', price: '$150', popular: false },
    { name: 'Circuit breaker replacement', price: '$120', popular: true },
    { name: 'Ceiling fan installation', price: '$95', popular: false },
    { name: 'Emergency fault repair', price: '$180', popular: false },
  ],
  plumbers: [
    { name: 'Pipe repair & replacement', price: '$95', popular: true },
    { name: 'Drain cleaning', price: '$75', popular: false },
    { name: 'Water heater installation', price: '$200', popular: true },
    { name: 'Toilet repair', price: '$85', popular: false },
    { name: 'Leak detection service', price: '$110', popular: false },
  ],
  carpenters: [
    { name: 'Custom furniture building', price: '$250', popular: true },
    { name: 'Cabinet installation', price: '$180', popular: false },
    { name: 'Door repair & hanging', price: '$90', popular: true },
    { name: 'Deck construction', price: '$350', popular: false },
    { name: 'Shelving installation', price: '$70', popular: false },
  ],
  mechanics: [
    { name: 'Full engine diagnostic', price: '$60', popular: true },
    { name: 'Oil change service', price: '$45', popular: false },
    { name: 'Brake pad replacement', price: '$120', popular: true },
    { name: 'Tyre rotation & balancing', price: '$35', popular: false },
    { name: 'AC recharge service', price: '$95', popular: false },
  ],
  'cleaning-services': [
    { name: 'Deep house cleaning', price: '$120', popular: true },
    { name: 'Carpet steam cleaning', price: '$80', popular: false },
    { name: 'Office sanitisation', price: '$150', popular: true },
    { name: 'Window cleaning', price: '$60', popular: false },
    { name: 'Move-out clean', price: '$180', popular: false },
  ],
  photographers: [
    { name: 'Wedding photography', price: '$450', popular: true },
    { name: 'Portrait session', price: '$120', popular: false },
    { name: 'Event coverage', price: '$350', popular: true },
    { name: 'Product photography', price: '$90', popular: false },
    { name: 'Aerial drone shoot', price: '$280', popular: false },
  ],
  doctors: [
    { name: 'General check-up', price: '$55', popular: true },
    { name: 'Blood panel testing', price: '$85', popular: false },
    { name: 'Minor surgical procedure', price: '$200', popular: false },
    { name: 'Chronic disease management', price: '$70', popular: true },
    { name: 'Vaccination & immunisation', price: '$40', popular: false },
  ],
  salons: [
    { name: 'Haircut & styling', price: '$35', popular: true },
    { name: 'Manicure & pedicure', price: '$45', popular: false },
    { name: 'Full colour treatment', price: '$80', popular: true },
    { name: 'Bridal makeup package', price: '$120', popular: false },
    { name: 'Facial & skincare', price: '$55', popular: false },
  ],
  lawyers: [
    { name: 'Legal consultation', price: '$95', popular: true },
    { name: 'Contract review', price: '$150', popular: false },
    { name: 'Will & estate planning', price: '$200', popular: true },
    { name: 'Property transfer', price: '$350', popular: false },
    { name: 'Litigation representation', price: '$400', popular: false },
  ],
  tutors: [
    { name: 'Maths tutoring (1 hour)', price: '$30', popular: true },
    { name: 'English literature', price: '$35', popular: false },
    { name: 'Science exam prep', price: '$40', popular: true },
    { name: 'University application help', price: '$60', popular: false },
    { name: 'Computer programming', price: '$45', popular: false },
  ],
  restaurants: [
    { name: 'Fine dining experience', price: '$65', popular: true },
    { name: 'Sunday brunch buffet', price: '$25', popular: false },
    { name: 'Private chef catering', price: '$120', popular: true },
    { name: 'Wine tasting session', price: '$40', popular: false },
    { name: 'Takeaway family meal', price: '$35', popular: false },
  ],
  'fitness-trainers': [
    { name: 'Personal training session', price: '$40', popular: true },
    { name: 'Group fitness class', price: '$15', popular: false },
    { name: 'Nutritional planning', price: '$55', popular: true },
    { name: 'Yoga & meditation', price: '$25', popular: false },
    { name: 'Strength & conditioning', price: '$45', popular: false },
  ],
  'event-planners': [
    { name: 'Full event coordination', price: '$500', popular: true },
    { name: 'Venue sourcing', price: '$150', popular: false },
    { name: 'Catering management', price: '$200', popular: true },
    { name: 'Decor & styling', price: '$250', popular: false },
    { name: 'DJ & entertainment booking', price: '$180', popular: false },
  ],
  architects: [
    { name: 'Residential design plan', price: '$350', popular: true },
    { name: '3D rendering', price: '$180', popular: false },
    { name: 'Structural assessment', price: '$250', popular: true },
    { name: 'Interior space planning', price: '$120', popular: false },
    { name: 'Permit drawing preparation', price: '$200', popular: false },
  ],
  hotels: [
    { name: 'Standard room (per night)', price: '$85', popular: true },
    { name: 'Luxury suite (per night)', price: '$220', popular: false },
    { name: 'Safari package (3 nights)', price: '$650', popular: true },
    { name: 'Spa & wellness add-on', price: '$60', popular: false },
    { name: 'Airport transfer service', price: '$30', popular: false },
  ],
  florists: [
    { name: 'Bridal bouquet', price: '$75', popular: true },
    { name: 'Seasonal arrangement', price: '$45', popular: false },
    { name: 'Event floral decor', price: '$200', popular: true },
    { name: 'Sympathy wreath', price: '$55', popular: false },
    { name: 'Subscription weekly blooms', price: '$35', popular: false },
  ],
  'market-vendors': [
    { name: 'Handcrafted curio set', price: '$35', popular: true },
    { name: 'Carved wooden animal', price: '$20', popular: true },
    { name: 'Beaded jewellery set', price: '$25', popular: false },
    { name: 'Woven basket', price: '$40', popular: false },
    { name: 'Stone sculpture piece', price: '$60', popular: true },
  ],
  'clothes-fashion': [
    { name: 'Casual dress', price: '$30', popular: true },
    { name: 'Denim jeans', price: '$25', popular: true },
    { name: 'Printed t-shirt', price: '$15', popular: false },
    { name: 'Winter jacket', price: '$55', popular: false },
    { name: 'Traditional print fabric', price: '$20', popular: true },
  ],
  'shoes-footwear': [
    { name: 'Running sneakers', price: '$65', popular: true },
    { name: 'Casual loafers', price: '$40', popular: true },
    { name: 'Leather sandals', price: '$25', popular: false },
    { name: 'Formal dress shoes', price: '$55', popular: false },
    { name: 'Kids school shoes', price: '$20', popular: true },
  ],
  'phones-gadgets': [
    { name: 'Smartphone (latest model)', price: '$350', popular: true },
    { name: 'Phone case & screen protector', price: '$15', popular: true },
    { name: 'Wireless earbuds', price: '$45', popular: false },
    { name: 'Power bank 10000mAh', price: '$25', popular: false },
    { name: 'Phone repair service', price: '$35', popular: true },
  ],
  'laptops-computers': [
    { name: 'Laptop (new)', price: '$550', popular: true },
    { name: 'Desktop PC build', price: '$450', popular: true },
    { name: 'RAM upgrade (8GB)', price: '$35', popular: false },
    { name: 'SSD installation (256GB)', price: '$45', popular: false },
    { name: 'Virus & malware removal', price: '$25', popular: true },
  ],
  'speakers-audio': [
    { name: 'Portable Bluetooth speaker', price: '$45', popular: true },
    { name: 'Over-ear headphones', price: '$65', popular: true },
    { name: 'Home theatre soundbar', price: '$120', popular: false },
    { name: 'DJ speaker set', price: '$200', popular: false },
    { name: 'Car audio system install', price: '$80', popular: true },
  ],
}

export default function CategoryPage() {
  const { slug } = useParams()
  const category = categories.find(c => c.slug === slug)
  const categoryBiz = featuredBusinesses.filter(b => b.category.toLowerCase().replace(/\s+/g, '-') === slug)

  const displayBiz = categoryBiz.length > 0 ? categoryBiz : (categoryMockData[slug] || [])

  const displayServices = category ? categoryServices[slug] || [] : []

  const relatedCategories = useMemo(() => {
    if (!category) return []
    return categories.filter(c => c.slug !== slug).sort(() => Math.random() - 0.5).slice(0, 4)
  }, [slug])

  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const servicesRef = useRef(null)
  const serviceCardsRef = useRef([])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.6, stagger: 0.08, ease: 'power3.out',
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [slug, displayBiz])

  useEffect(() => {
    if (!servicesRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        serviceCardsRef.current.filter(Boolean),
        { opacity: 0, x: -20 },
        {
          opacity: 1, x: 0,
          duration: 0.5, stagger: 0.06, ease: 'power2.out',
        }
      )
    }, servicesRef)
    return () => ctx.revert()
  }, [slug, displayServices])

  if (!category) {
    return (
      <div className="pt-32 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="w-6 h-6 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Category not found</h2>
        <p className="text-gray-500 text-sm mb-4">This category doesn't exist yet.</p>
        <Link to="/search" className="text-blue-600 text-sm font-medium">Browse all categories &rarr;</Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Hero banner */}
      <section className="relative h-[340px] lg:h-[420px] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
        <div className="relative z-10 h-full flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16 w-full">
            <Link to="/search" className="inline-flex items-center gap-1 text-sm text-white/70 hover:text-white mb-6 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Back to browse
            </Link>
            <span className="inline-block text-xs font-medium text-white/70 uppercase tracking-[0.2em] mb-3">
              Category
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              {category.name}
            </h1>
            <p className="text-white/70 text-base lg:text-lg mt-2 max-w-xl">
              Find trusted {category.name.toLowerCase()} in and around Victoria Falls. Book with confidence.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>{category.count} providers available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Featured Providers */}
        <div ref={sectionRef}>
          {displayBiz.length > 0 && (
            <div className="mb-14">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em]">
                    Featured Providers
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold mt-1 text-gray-900">
                    Top {category.name}
                  </h2>
                </div>
                <Link to="/search" className="hidden sm:flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayBiz.map((biz, i) => (
                  <div
                    key={biz.id}
                    ref={(el) => (cardsRef.current[i] = el)}
                  >
                    <Link
                      to={`/business/${biz.slug}`}
                      className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
                    >
                      <div className="aspect-[16/10] overflow-hidden relative">
                        <img src={biz.image} alt={biz.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        {biz.verified && (
                          <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" /> Verified
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors break-words line-clamp-2">{biz.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{biz.city}</p>
                        <div className="flex items-center gap-2 mt-3 text-sm">
                          <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                          <span className="font-medium text-gray-800">{biz.rating}</span>
                          <span className="text-gray-400">({biz.reviews} reviews)</span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <div className="mt-6 sm:hidden">
                <Link to="/search" className="inline-flex items-center gap-1 text-sm font-medium text-blue-600">
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {displayBiz.length === 0 && (
            <div className="text-center py-20 mb-14">
              <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-gray-300" />
              </div>
              <p className="text-gray-500">No providers listed in this category yet.</p>
              <Link to="/search" className="inline-flex items-center gap-1 text-blue-600 text-sm font-medium mt-3">
                Browse all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </div>

        {/* Popular Services */}
        {displayServices.length > 0 && (
          <div ref={servicesRef} className="mb-14">
            <div className="mb-6">
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em]">
                Popular Services
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold mt-1 text-gray-900">
                Common {category.name} Services
              </h2>
              <p className="text-gray-400 text-sm mt-1">Average prices in Victoria Falls</p>
            </div>
            <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 divide-y divide-gray-100">
              {displayServices.map((svc, i) => (
                <div
                  key={i}
                  ref={(el) => (serviceCardsRef.current[i] = el)}
                  className="flex items-center justify-between px-6 py-4 hover:bg-white transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {svc.popular && (
                      <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Popular
                      </span>
                    )}
                    <span className="text-sm font-medium text-gray-800">{svc.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{svc.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Categories */}
        {relatedCategories.length > 0 && (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.2em]">
                Explore More
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold mt-1 text-gray-900">
                Related Categories
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {relatedCategories.map((rc, i) => (
                <Link
                  key={rc.id}
                  to={`/category/${rc.slug}`}
                  className="group relative h-32 rounded-xl overflow-hidden"
                >
                  <img
                    src={rc.image}
                    alt={rc.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
                  <div className="relative z-10 h-full flex flex-col justify-end p-4">
                    <h3 className="text-white font-semibold text-sm">{rc.name}</h3>
                    <span className="text-white/60 text-xs mt-0.5">{rc.count} providers</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
