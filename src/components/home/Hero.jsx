import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import gsap from 'gsap'

const headlineWords = ['Grow', 'Your', 'Business.', 'Connect', 'With', 'More', 'Customers.']

const categoryCards = [
  {
    title: 'Restaurants',
    desc: 'Discover top-rated dining experiences and local favourites.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
    slug: 'restaurants',
  },
  {
    title: 'Home Services',
    desc: 'Electricians, plumbers, cleaners and more.',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=500&fit=crop',
    slug: 'electricians',
  },
  {
    title: 'Market Vendors',
    desc: 'Clothes, shoes, phones, laptops, speakers and more.',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=500&fit=crop',
    slug: 'market-vendors',
  },
  {
    title: 'Automotive',
    desc: 'Mechanics, body shops and car detailing services.',
    image: 'https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=800&h=500&fit=crop',
    slug: 'mechanics',
  },
]

const particles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 3 + 1,
  duration: Math.random() * 20 + 15,
  delay: Math.random() * 10,
  opacity: Math.random() * 0.3 + 0.05,
}))

export default function Hero() {
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)
  const cardsRef = useRef([])
  const videoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline word-by-word
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.hw')
        gsap.fromTo(words,
          { opacity: 0, y: 40, rotationX: -40 },
          {
            opacity: 1, y: 0, rotationX: 0,
            duration: 0.8, stagger: 0.12, delay: 0.3, ease: 'power3.out',
          }
        )
      }

      // Subtitle
      if (subtitleRef.current) {
        gsap.fromTo(subtitleRef.current, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, delay: 1.5, ease: 'power3.out',
        })
      }

      // Buttons
      if (buttonsRef.current) {
        gsap.fromTo(buttonsRef.current.children, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 1.9, ease: 'power3.out',
        })
      }

      // Cards stagger in
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, delay: 2.3 + i * 0.15, ease: 'power3.out',
          }
        )
        // Idle floating
        gsap.to(card, {
          y: `+=${4 + i * 1.5}`,
          duration: 3 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        })
      })

      // Video slow zoom
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scale: 1.08,
          duration: 30,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={heroRef} className="relative bg-[#050816] overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[160px]" />
        <div className="absolute bottom-[-15%] right-[-5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-[40%] left-[30%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]" />

        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animation: `float-particle ${p.duration}s ${p.delay}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Video background — full bleed */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop"
        >
          <source src="https://cdn.coverr.co/videos/coverr-a-bartender-making-a-cocktail-2481/1080p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050816]/70 via-[#050816]/30 to-[#050816]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050816]/30 via-transparent to-[#050816]/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 overflow-hidden">
        {/* Spacer for nav */}
        <div className="h-16 lg:h-18" />

        {/* Hero content — centered */}
        <div className="flex items-center justify-center px-5 sm:px-10 lg:px-14 py-14 sm:py-20 lg:py-28">
          <div className="text-center max-w-4xl">
            <h1 ref={headlineRef} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-5 sm:mb-6" style={{ perspective: '600px' }}>
              {headlineWords.map((word, i) => (
                <span key={i} className={`hw inline-block mr-[0.3em] ${word === 'Business.' || word === 'Customers.' ? 'text-blue-400' : ''}`}>
                  {word}
                </span>
              ))}
            </h1>

            <p ref={subtitleRef} className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              ConnectHub helps local businesses showcase their services, reach new customers, receive enquiries and grow their business from one modern platform.
            </p>

            <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/sign-up"
                className="group relative inline-flex items-center gap-2 bg-blue-600 text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm font-semibold hover:bg-blue-500 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] w-full sm:w-auto justify-center"
              >
                Register Your Business
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                <div className="absolute inset-0 rounded-2xl bg-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </Link>
              <Link
                to="/search"
                className="group inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm font-semibold hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 w-full sm:w-auto justify-center"
              >
                Explore Businesses
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom category cards */}
        <div className="px-5 sm:px-10 lg:px-14 pb-10 sm:pb-16 lg:pb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {categoryCards.map((card, i) => (
              <Link
                key={card.title}
                to={`/category/${card.slug}`}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group relative h-36 sm:h-44 rounded-2xl overflow-hidden border border-white/[0.08] cursor-pointer"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-500" />
                <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-blue-400/30 transition-colors duration-500 shadow-[0_0_0_rgba(37,99,235,0)] group-hover:shadow-[0_8px_40px_rgba(37,99,235,0.15)]" />

                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <h3 className="text-white font-bold text-lg mb-1">{card.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed mb-3 line-clamp-2">{card.desc}</p>
                  <div className="flex items-center gap-1.5 text-blue-400 text-xs font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float-particle {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-5px); }
          75% { transform: translateY(-30px) translateX(8px); }
        }
      `}</style>
    </div>
  )
}
