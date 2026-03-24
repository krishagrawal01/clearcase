'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scale, ChevronDown } from 'lucide-react'

interface CalculationResult {
  minAmount: number
  maxAmount: number
  basedOn: string
}

export function AlimonyCalculator() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [husbandIncome, setHusbandIncome] = useState('')
  const [wifeIncome, setWifeIncome] = useState('')
  const [yearsMarried, setYearsMarried] = useState('')
  const [children, setChildren] = useState('0')
  const [alimonyType, setAlimonyType] = useState('permanent')
  const [result, setResult] = useState<CalculationResult | null>(null)

  const calculateAlimony = () => {
    const hIncome = parseFloat(husbandIncome) || 0
    const wIncome = parseFloat(wifeIncome) || 0
    const years = parseFloat(yearsMarried) || 0
    const numChildren = children === '3+' ? 3 : parseInt(children)

    if (hIncome === 0) {
      setResult(null)
      return
    }

    // Base calculation: 25-30% of husband's net income
    let minBase = hIncome * 0.25
    let maxBase = hIncome * 0.30

    // If wife earns more than 25% of husband's income, reduce proportionally
    if (wIncome >= hIncome * 0.25) {
      const wifeContribution = wIncome / hIncome
      minBase = minBase * (1 - wifeContribution * 0.5)
      maxBase = maxBase * (1 - wifeContribution * 0.5)
    }

    // Add 10% per child
    const childMultiplier = 1 + (numChildren * 0.10)
    minBase = minBase * childMultiplier
    maxBase = maxBase * childMultiplier

    // Marriage duration multiplier (1.1x if over 10 years)
    if (years > 10) {
      minBase = minBase * 1.1
      maxBase = maxBase * 1.1
    }

    // Adjust based on type
    let basedOn = 'Section 25, Hindu Marriage Act, 1955'
    if (alimonyType === 'interim') {
      minBase = minBase * 0.7
      maxBase = maxBase * 0.8
      basedOn = 'Section 24, Hindu Marriage Act (Interim Maintenance)'
    } else if (alimonyType === 'child') {
      minBase = hIncome * 0.15 * Math.max(numChildren, 1)
      maxBase = hIncome * 0.25 * Math.max(numChildren, 1)
      basedOn = 'Section 26, Hindu Marriage Act (Child Custody & Maintenance)'
    }

    setResult({
      minAmount: Math.round(minBase),
      maxAmount: Math.round(maxBase),
      basedOn,
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN').format(amount)
  }

  return (
    <div className="border-t border-[rgba(255,255,255,0.08)]">
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[rgba(255,255,255,0.02)] transition-colors"
      >
        <div className="flex items-center gap-2 text-[#c9a84c]">
          <Scale className="w-4 h-4" />
          <span className="text-sm font-medium">Estimate Alimony / Support</span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-[#8892a4]" />
        </motion.div>
      </button>

      {/* Calculator Panel */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4">
              {/* Input Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* Husband's Income */}
                <div className="space-y-1.5">
                  <label className="text-xs text-[#8892a4]">Husband{"'"}s Monthly Income</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8892a4] text-sm">₹</span>
                    <input
                      type="number"
                      value={husbandIncome}
                      onChange={(e) => setHusbandIncome(e.target.value)}
                      placeholder="0"
                      className="w-full pl-7 pr-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-[#f0f4ff] placeholder:text-[#4a5568] focus:outline-none focus:border-[#c9a84c] transition-colors"
                    />
                  </div>
                </div>

                {/* Wife's Income */}
                <div className="space-y-1.5">
                  <label className="text-xs text-[#8892a4]">Wife{"'"}s Monthly Income</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8892a4] text-sm">₹</span>
                    <input
                      type="number"
                      value={wifeIncome}
                      onChange={(e) => setWifeIncome(e.target.value)}
                      placeholder="0"
                      className="w-full pl-7 pr-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-[#f0f4ff] placeholder:text-[#4a5568] focus:outline-none focus:border-[#c9a84c] transition-colors"
                    />
                  </div>
                </div>

                {/* Years Married */}
                <div className="space-y-1.5">
                  <label className="text-xs text-[#8892a4]">Years of Marriage</label>
                  <input
                    type="number"
                    value={yearsMarried}
                    onChange={(e) => setYearsMarried(e.target.value)}
                    placeholder="0"
                    className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-[#f0f4ff] placeholder:text-[#4a5568] focus:outline-none focus:border-[#c9a84c] transition-colors"
                  />
                </div>

                {/* Number of Children */}
                <div className="space-y-1.5">
                  <label className="text-xs text-[#8892a4]">Number of Children</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(e.target.value)}
                    className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#c9a84c] transition-colors appearance-none cursor-pointer"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3+">3+</option>
                  </select>
                </div>
              </div>

              {/* Alimony Type */}
              <div className="space-y-1.5">
                <label className="text-xs text-[#8892a4]">Type of Support</label>
                <select
                  value={alimonyType}
                  onChange={(e) => setAlimonyType(e.target.value)}
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#c9a84c] transition-colors appearance-none cursor-pointer"
                >
                  <option value="permanent">Permanent Alimony</option>
                  <option value="interim">Interim Alimony</option>
                  <option value="child">Child Support</option>
                </select>
              </div>

              {/* Calculate Button */}
              <button
                onClick={calculateAlimony}
                className="w-full py-2.5 rounded-lg font-medium text-sm text-[#050d1f] bg-gradient-to-r from-[#c9a84c] via-[#e8d48a] to-[#c9a84c] hover:opacity-90 transition-opacity"
              >
                Calculate Estimate
              </button>

              {/* Result Card */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.25)] backdrop-blur-sm"
                  >
                    <div className="text-center mb-3">
                      <p className="text-xs text-[#8892a4] mb-1">Estimated Monthly Amount</p>
                      <p className="text-xl font-serif font-bold text-[#c9a84c]">
                        ₹{formatCurrency(result.minAmount)} — ₹{formatCurrency(result.maxAmount)}/month
                      </p>
                    </div>
                    <div className="text-center mb-3">
                      <p className="text-xs text-[#8892a4]">Based on:</p>
                      <p className="text-sm text-[#f0f4ff]">{result.basedOn}</p>
                    </div>
                    <p className="text-[10px] text-[#8892a4] text-center leading-relaxed">
                      This is an estimate based on general Indian court guidelines. Actual amount is decided by the court.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
