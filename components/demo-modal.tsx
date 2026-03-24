'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, MessageSquare, FileCheck, Users, CreditCard } from 'lucide-react'

const slides = [
  {
    icon: MessageSquare,
    title: 'AI Legal Chat',
    caption: 'Ask any Indian legal question',
    description: 'Get instant answers on divorce, property disputes, traffic challans, and more. Available 24/7 in English and Hindi.',
  },
  {
    icon: FileCheck,
    title: 'Document Checklist',
    caption: 'Get exact document requirements',
    description: 'Know exactly which documents you need for any legal procedure. No more running around or missing paperwork.',
  },
  {
    icon: Users,
    title: 'Lawyer Dashboard',
    caption: 'Manage clients professionally',
    description: 'For legal professionals: track clients, analyze cases with AI assistance, and streamline your practice.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Plans',
    caption: 'Plans for everyone',
    description: 'From free basic access to professional law firm plans. Choose what works for your needs and budget.',
  },
]

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:h-auto z-50"
          >
            <div className="h-full md:h-auto bg-[#0a1628]/95 backdrop-blur-xl border border-[rgba(99,102,241,0.2)] rounded-2xl shadow-2xl overflow-hidden">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 text-[#8892a4] hover:text-[#f0f4ff] transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="p-8 md:p-12">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="text-center"
                  >
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366f1]/20 to-[#6366f1]/5 border border-[rgba(99,102,241,0.3)] mb-6">
                      {(() => {
                        const IconComponent = slides[currentSlide].icon
                        return <IconComponent className="w-8 h-8 text-[#6366f1]" />
                      })()}
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#f0f4ff] mb-2">
                      {slides[currentSlide].title}
                    </h3>

                    {/* Caption */}
                    <p className="text-[#6366f1] font-medium mb-4">
                      {slides[currentSlide].caption}
                    </p>

                    {/* Description */}
                    <p className="text-[#8892a4] leading-relaxed max-w-md mx-auto">
                      {slides[currentSlide].description}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <div className="flex items-center justify-between mt-10">
                  <button
                    onClick={prevSlide}
                    className="p-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#8892a4] hover:text-[#f0f4ff] hover:border-[rgba(99,102,241,0.3)] transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  {/* Dots */}
                  <div className="flex items-center gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          currentSlide === index
                            ? 'w-8 bg-[#6366f1]'
                            : 'bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)]'
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextSlide}
                    className="p-3 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#8892a4] hover:text-[#f0f4ff] hover:border-[rgba(99,102,241,0.3)] transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Slide Counter */}
                <p className="text-center text-[#8892a4] text-sm mt-4">
                  {currentSlide + 1} of {slides.length}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
