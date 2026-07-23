import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Users, TreePine, Heart, Palette } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stories = [
  {
    id: 1,
    title: 'Village Life on the Zambezi',
    excerpt: 'Spend a day with a local family, learn traditional cooking methods, and hear stories passed down through generations.',
    image: 'https://images.unsplash.com/photo-1504457047772-27faf1c00561?w=800&h=500&fit=crop',
    category: 'Rural Community',
    icon: Users,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    id: 2,
    title: 'Conservation in the Rainforest',
    excerpt: 'Join local conservationists protecting the Victoria Falls rainforest ecosystem and learn about wildlife preservation.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=500&fit=crop',
    category: 'Conservation',
    icon: TreePine,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    id: 3,
    title: 'Ubuntu: The Heart of Zimbabwe',
    excerpt: 'Discover the spirit of Ubuntu through community projects, volunteer opportunities, and cultural exchanges.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=500&fit=crop',
    category: 'Community',
    icon: Heart,
    color: 'bg-rose-50 text-rose-600',
  },
  {
    id: 4,
    title: 'Art & Craft Markets',
    excerpt: 'Explore vibrant local markets where artisans sell handcrafted sculptures, textiles, and traditional artwork.',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=500&fit=crop',
    category: 'Culture',
    icon: Palette,
    color: 'bg-violet-50 text-violet-600',
  },
]

export default function LocalStories() {
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.stories-header', {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
      })
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
          }
        )
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-slate-900 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="stories-header text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest">Local Stories</span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-3 tracking-tight text-white">
            The heart of Victoria Falls
          </h2>
          <p className="text-white/50 mt-3 text-sm max-w-md mx-auto">
            Real stories from real communities. Discover the people, culture, and traditions that make Victoria Falls special.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Featured story — large */}
        {(() => {
          const FeaturedIcon = stories[0].icon
          return (
            <div
              ref={(el) => { cardsRef.current[0] = el }}
              className="group relative rounded-2xl overflow-hidden h-80 md:row-span-2 cursor-pointer"
            >
              <img
                src={stories[0].image}
                alt={stories[0].title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-7 flex flex-col justify-end">
                <span className={`inline-flex items-center gap-1.5 self-start text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${stories[0].color} mb-4`}>
                  <FeaturedIcon className="w-3 h-3" />
                  {stories[0].category}
                </span>
                <h3 className="text-2xl font-bold text-white tracking-tight mb-3">{stories[0].title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{stories[0].excerpt}</p>
                <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-medium group-hover:gap-2.5 transition-all duration-300">
                  Read story <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          )
        })()}

          {/* Other stories */}
          {stories.slice(1).map((story, i) => {
            const StoryIcon = story.icon
            return (
              <div
                key={story.id}
                ref={(el) => { cardsRef.current[i + 1] = el }}
                className="group relative rounded-2xl overflow-hidden h-60 cursor-pointer"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <span className={`inline-flex items-center gap-1.5 self-start text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${story.color} mb-3`}>
                    <StoryIcon className="w-3 h-3" />
                    {story.category}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight mb-2">{story.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{story.excerpt}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 bg-white/[0.06] backdrop-blur-sm border border-white/[0.1] text-white px-7 py-3.5 rounded-2xl text-sm font-semibold hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300"
          >
            Explore all stories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
