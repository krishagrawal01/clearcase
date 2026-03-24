'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MousePointerClick, MessageSquareText, Sparkles } from 'lucide-react'

const steps = [
  {
    icon: MousePointerClick,
    number: '01',
    title: 'Choose Your Topic',
    description: 'Select from divorce, property, traffic challans, or other legal categories tailored for Indian law.',
  },
  {
    icon: MessageSquareText,
    number: '02',
    title: 'Describe Your Situation',
    description: 'Tell us about your case in simple words. Our AI understands English, Hindi, and Hinglish.',
  },
  {
    icon: Sparkles,
    number: '03',
    title: 'Get Instant Guidance',
    description: 'Receive clear, actionable advice with relevant IPC sections, documents needed, and next steps.',
  },
]

export function HowItWorksSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 md:py-32 px-4" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)] mb-6">
            <span className="text-[#c9a84c] text-sm font-medium">Simple 3-Step Process</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#f0f4ff] mb-4">
            How It Works
          </h2>
          <p className="text-[#8892a4] text-lg max-w-2xl mx-auto">
            Get legal clarity in minutes, not days
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                <div className="relative p-8 rounded-2xl bg-[rgba(255,255,255,0.02)] backdrop-blur-xl border border-[rgba(255,255,255,0.06)] text-center group hover:border-[rgba(201,168,76,0.3)] transition-all duration-300">
                  {/* Number badge */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050d1f] border border-[#c9a84c] flex items-center justify-center">
                    <span className="text-[#c9a84c] text-xs font-bold">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-[#c9a84c]/20 to-[#c9a84c]/5 mb-6 mt-2 group-hover:from-[#c9a84c]/30 group-hover:to-[#c9a84c]/10 transition-all duration-300">
                    <step.icon className="w-8 h-8 text-[#c9a84c]" />
                  </div>

                  {/* Content */}
                  <h3 className="font-serif text-xl font-bold text-[#f0f4ff] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#8892a4] leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 w-12 text-[#c9a84c]/30">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
