import React, { useEffect, useRef } from 'react'
import { Search, CalendarDays, MessageCircle, FileText } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    icon: Search,
    title: 'Search & Discover',
    description: 'Browse categories, search for services, and discover trusted local businesses with verified reviews.',
    color: 'bg-blue-50 text-blue-600',
    circleColor: 'bg-blue-100',
  },
  {
    icon: CalendarDays,
    title: 'Book Instantly',
    description: 'Choose your service, select a date and time, and book instantly. No phone calls needed.',
    color: 'bg-emerald-50 text-emerald-600',
    circleColor: 'bg-emerald-100',
  },
  {
    icon: MessageCircle,
    title: 'Stay Connected',
    description: 'Chat with your provider, share details, and get real-time updates through our messaging system.',
    color: 'bg-violet-50 text-violet-600',
    circleColor: 'bg-violet-100',
  },
  {
    icon: FileText,
    title: 'Get Invoiced',
    description: 'Receive professional invoices, leave reviews, and manage everything from your dashboard.',
    color: 'bg-violet-50 text-violet-600',
    circleColor: 'bg-violet-100',
  },
]

export default function HowItWorks() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current.children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 85%',
          once: true,
        },
      })

      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: 'top center',
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      const items = gsap.utils.toArray('.timeline-step')
      items.forEach((item, i) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 82%',
            once: true,
          },
        })

        tl.from(item.querySelector('.step-number'), {
          scale: 0.5,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        })
          .from(item.querySelector('.step-icon-circle'), {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out(1.7)',
          }, '-=0.3')
          .from(item.querySelector('.step-content'), {
            x: 40,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out',
          }, '-=0.3')
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-gray-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-20">
          <span className="text-xs font-medium text-blue-600 uppercase tracking-widest block">
            How it works
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold mt-3 tracking-tight">
            Getting started is simple
          </h2>
          <p className="text-gray-500 mt-4 text-base leading-relaxed">
            From search to experience completion — here's how Local Vic Falls helps you discover Victoria Falls.
          </p>
        </div>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          <div className="timeline-line absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200" />

          <div className="space-y-16 lg:space-y-20">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isEven = i % 2 === 0

              return (
                <div
                  key={step.title}
                  className={`timeline-step relative flex flex-col lg:flex-row items-center gap-6 lg:gap-0 ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                  <div className={`flex items-center gap-6 lg:gap-0 w-full lg:w-1/2 ${
                    isEven ? 'lg:justify-end lg:pr-16' : 'lg:justify-start lg:pl-16'
                  }`}>
                    <div className={`step-number hidden lg:flex items-center justify-center w-24 h-24 shrink-0 font-black text-[96px] leading-none select-none ${
                      isEven ? 'order-2' : ''
                    }`} style={{ color: 'rgba(147, 197, 253, 0.35)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    <div className="step-content flex-1 max-w-md">
                      <span className="lg:hidden inline-flex items-center gap-2 text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">
                        <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                          {i + 1}
                        </span>
                        Step {i + 1}
                      </span>
                      <h3 className="text-xl lg:text-2xl font-bold tracking-tight mb-3">
                        {step.title}
                      </h3>
                      <p className="text-gray-500 leading-relaxed text-sm lg:text-base">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="step-icon-circle relative z-10 w-16 h-16 rounded-full bg-white border-2 border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                    <div className={`w-10 h-10 rounded-xl ${step.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className={`hidden lg:block w-1/2 ${
                    isEven ? 'lg:justify-start lg:pl-16' : 'lg:justify-end lg:pr-16'
                  }`}>
                    {isEven && <div />}
                    {!isEven && <div />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
