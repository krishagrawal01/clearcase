'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Check, Clock, IndianRupee, MapPin, Download, FileText } from 'lucide-react'

interface DocumentItem {
  name: string
  note?: string
}

interface DocumentCategory {
  id: string
  label: string
  documents: DocumentItem[]
  estimatedTime: string
  estimatedCost: string
  whereToApply: string
}

const documentCategories: DocumentCategory[] = [
  {
    id: 'passport',
    label: 'Passport (Fresh)',
    documents: [
      { name: 'Birth Certificate', note: 'Original + Photocopy' },
      { name: 'Class 10 Marksheet', note: 'Original + Photocopy' },
      { name: 'Aadhar Card', note: 'Original + Photocopy' },
      { name: 'Voter ID or PAN Card' },
      { name: '2 Passport Size Photos', note: 'White background' },
      { name: 'Address Proof', note: 'Any government ID' },
      { name: 'Police Verification Form', note: 'If applicable' },
    ],
    estimatedTime: '30-45 days',
    estimatedCost: '₹1,500 - ₹2,000',
    whereToApply: 'Passport Seva Kendra',
  },
  {
    id: 'driving',
    label: 'Driving License',
    documents: [
      { name: 'Aadhar Card', note: 'Original + Photocopy' },
      { name: 'Address Proof' },
      { name: 'Age Proof', note: 'Birth certificate or 10th marksheet' },
      { name: 'Passport Size Photos', note: '4 copies' },
      { name: 'Learner License', note: 'If applying for permanent DL' },
      { name: 'Medical Certificate', note: 'Form 1A' },
    ],
    estimatedTime: '7-30 days',
    estimatedCost: '₹200 - ₹1,000',
    whereToApply: 'Regional Transport Office (RTO)',
  },
  {
    id: 'ration',
    label: 'Ration Card',
    documents: [
      { name: 'Aadhar Card of all family members', note: 'Original + Photocopy' },
      { name: 'Address Proof' },
      { name: 'Income Certificate' },
      { name: 'Passport Size Photos', note: 'Family photo' },
      { name: 'Bank Account Details' },
      { name: 'Gas Connection Proof', note: 'LPG connection document' },
    ],
    estimatedTime: '15-30 days',
    estimatedCost: '₹0 - ₹45',
    whereToApply: 'Food & Civil Supplies Office',
  },
  {
    id: 'aadhar',
    label: 'Aadhar Update',
    documents: [
      { name: 'Current Aadhar Card', note: 'Original' },
      { name: 'New Address Proof', note: 'For address update' },
      { name: 'Date of Birth Proof', note: 'For DOB update' },
      { name: 'Mobile Number', note: 'For OTP verification' },
    ],
    estimatedTime: '7-15 days',
    estimatedCost: '₹50',
    whereToApply: 'Aadhar Enrollment Center',
  },
  {
    id: 'divorce',
    label: 'Divorce Filing',
    documents: [
      { name: 'Marriage Certificate', note: 'Original + Photocopy' },
      { name: 'Address Proof of both parties' },
      { name: 'ID Proof of both parties' },
      { name: 'Passport Size Photos', note: '4 copies each' },
      { name: 'Income Proof', note: 'For maintenance claims' },
      { name: 'Evidence documents', note: 'If contested divorce' },
      { name: 'Wedding Photos', note: 'For verification' },
    ],
    estimatedTime: '6-18 months',
    estimatedCost: '₹10,000 - ₹50,000+',
    whereToApply: 'Family Court',
  },
  {
    id: 'property',
    label: 'Property Registration',
    documents: [
      { name: 'Sale Deed Draft' },
      { name: 'Seller ID & Address Proof' },
      { name: 'Buyer ID & Address Proof' },
      { name: 'Property Documents', note: 'Title deed, encumbrance certificate' },
      { name: 'Passport Size Photos', note: 'Both parties' },
      { name: 'PAN Card', note: 'Both parties' },
      { name: 'Stamp Duty Payment Receipt' },
    ],
    estimatedTime: '1-7 days',
    estimatedCost: '5-7% of property value',
    whereToApply: 'Sub-Registrar Office',
  },
]

export function DocumentChecker() {
  const [selectedCategory, setSelectedCategory] = useState<string>('passport')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [animateChecklist, setAnimateChecklist] = useState(false)

  const currentCategory = documentCategories.find((c) => c.id === selectedCategory)

  // Reset and animate checklist when category changes
  useEffect(() => {
    setCheckedItems(new Set())
    setAnimateChecklist(true)
    
    // Animate checkboxes one by one
    if (currentCategory) {
      currentCategory.documents.forEach((_, index) => {
        setTimeout(() => {
          setCheckedItems((prev) => new Set([...prev, index.toString()]))
        }, 300 + index * 200)
      })
    }
  }, [selectedCategory])

  return (
    <div className="max-w-4xl mx-auto">
      {/* Dropdown Selector */}
      <div className="relative mb-8">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(201,168,76,0.3)] text-left transition-all duration-300 hover:border-[rgba(201,168,76,0.5)] focus:outline-none focus:ring-2 focus:ring-[rgba(201,168,76,0.3)]"
        >
          <div className="flex items-center gap-3">
            <FileText className="w-5 h-5 text-[#c9a84c]" />
            <span className="text-lg font-medium text-[#f0f4ff]">
              {currentCategory?.label || 'Select document type'}
            </span>
          </div>
          <motion.div
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-[#c9a84c]" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-[#0a1525] border border-[rgba(201,168,76,0.2)] overflow-hidden z-20"
            >
              {documentCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id)
                    setIsDropdownOpen(false)
                  }}
                  className={`w-full px-6 py-3 text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-[rgba(201,168,76,0.1)] text-[#c9a84c]'
                      : 'text-[#f0f4ff] hover:bg-[rgba(255,255,255,0.05)]'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {currentCategory && (
          <motion.div
            key={currentCategory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Info Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.2)]">
                <Clock className="w-4 h-4 text-[#c9a84c]" />
                <span className="text-sm text-[#c9a84c]">{currentCategory.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.2)]">
                <IndianRupee className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">{currentCategory.estimatedCost}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(123,97,255,0.1)] border border-[rgba(123,97,255,0.2)]">
                <MapPin className="w-4 h-4 text-[#7b61ff]" />
                <span className="text-sm text-[#7b61ff]">{currentCategory.whereToApply}</span>
              </div>
            </div>

            {/* Document Checklist */}
            <div className="p-6 rounded-2xl bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)]">
              <h3 className="font-serif text-lg font-semibold text-[#f0f4ff] mb-4">
                Required Documents
              </h3>
              <div className="space-y-3">
                {currentCategory.documents.map((doc, index) => (
                  <motion.div
                    key={doc.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: checkedItems.has(index.toString()) ? 1 : 0 }}
                      className="flex-shrink-0 w-5 h-5 mt-0.5 rounded-md bg-gradient-to-br from-[#c9a84c] to-[#e8d48a] flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-[#050d1f]" />
                    </motion.div>
                    <div
                      className={`flex-shrink-0 w-5 h-5 mt-0.5 rounded-md border border-[rgba(255,255,255,0.2)] ${
                        checkedItems.has(index.toString()) ? 'hidden' : 'block'
                      }`}
                    />
                    <div>
                      <span className="text-[#f0f4ff]">{doc.name}</span>
                      {doc.note && (
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-[rgba(201,168,76,0.1)] text-[#c9a84c]">
                          {doc.note}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Download Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 rounded-xl gold-shimmer text-[#050d1f] font-medium"
            >
              <Download className="w-4 h-4" />
              Download Checklist
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
