'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Scale, Car, FileText, Home, Users, Calculator, IndianRupee, ChevronDown, TrendingUp, TrendingDown, Info, Sparkles, CheckCircle, AlertTriangle, ExternalLink, Building2 } from 'lucide-react'

// Types
interface CalculationResult {
  minAmount: number
  maxAmount: number
  midAmount: number
  basedOn: string
  factors: string[]
}

interface FineResult {
  baseFine: number
  stateFine: number
  section: string
  offense: string
  isCompoundable: boolean
  compoundingDetails: string
  additionalPenalty: string | null
  paymentPortal: string
  courtRequired: boolean
  licenseImpact: string | null
}

// Tool Button Component
interface ToolButtonProps {
  icon: string
  label: string
  onClick: () => void
  isActive: boolean
}

export function ToolButton({ icon, label, onClick, isActive }: ToolButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1 h-7 rounded-full text-xs font-medium transition-all ${
        isActive
          ? 'bg-[#6366f1] text-white border border-[#6366f1]'
          : 'bg-transparent text-[#6366f1] border border-[#6366f1] hover:bg-[rgba(99,102,241,0.1)]'
      }`}
    >
      <span className="text-sm">{icon}</span>
      <span className="whitespace-nowrap">{label}</span>
    </motion.button>
  )
}

// Tool Panel Wrapper
interface ToolPanelWrapperProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function ToolPanelWrapper({ isOpen, onClose, title, children }: ToolPanelWrapperProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="border-b border-[rgba(99,102,241,0.2)] bg-[rgba(99,102,241,0.03)] overflow-hidden"
        >
          <div className="max-w-2xl mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#6366f1]">{title}</h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
              >
                <X className="w-4 h-4 text-[#8892a4]" />
              </button>
            </div>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Alimony Calculator Panel
const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Chandigarh', 'Puducherry'
]

const stateMultipliers: Record<string, number> = {
  'Maharashtra': 1.25, 'Delhi': 1.30, 'Karnataka': 1.15, 'Tamil Nadu': 1.10,
  'Gujarat': 1.10, 'Telangana': 1.15, 'Kerala': 1.05, 'Haryana': 1.10,
  'Goa': 1.20, 'Punjab': 1.05, 'West Bengal': 1.00, 'Chandigarh': 1.15,
  'Uttar Pradesh': 0.90, 'Bihar': 0.85, 'Madhya Pradesh': 0.90, 'Rajasthan': 0.95,
  'Odisha': 0.90, 'Jharkhand': 0.88, 'Chhattisgarh': 0.88, 'Assam': 0.90,
}

interface AlimonyPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function AlimonyPanel({ isOpen, onClose }: AlimonyPanelProps) {
  const [husbandIncome, setHusbandIncome] = useState('')
  const [wifeIncome, setWifeIncome] = useState('')
  const [yearsMarried, setYearsMarried] = useState('')
  const [children, setChildren] = useState('0')
  const [custody, setCustody] = useState('wife')
  const [state, setState] = useState('Maharashtra')
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

    const factors: string[] = []
    let minBase = hIncome * 0.20
    let maxBase = hIncome * 0.25

    const incomeDiff = hIncome - wIncome
    if (wIncome > 0) {
      const wifeRatio = wIncome / hIncome
      if (wifeRatio > 0.5) {
        minBase = incomeDiff * 0.15
        maxBase = incomeDiff * 0.20
        factors.push('Reduced due to wife\'s substantial income')
      } else if (wifeRatio > 0.25) {
        minBase = minBase * (1 - wifeRatio * 0.4)
        maxBase = maxBase * (1 - wifeRatio * 0.4)
        factors.push('Adjusted for wife\'s earning capacity')
      }
    } else {
      factors.push('Wife has no independent income')
    }

    if (years > 15) {
      minBase = minBase * 1.20
      maxBase = maxBase * 1.25
      factors.push('Long-term marriage (15+ years)')
    } else if (years > 10) {
      minBase = minBase * 1.10
      maxBase = maxBase * 1.15
      factors.push('Medium-term marriage')
    } else if (years < 3) {
      minBase = minBase * 0.85
      maxBase = maxBase * 0.90
      factors.push('Short marriage duration')
    }

    if (numChildren > 0) {
      const childMultiplier = 1 + (numChildren * 0.08)
      minBase = minBase * childMultiplier
      maxBase = maxBase * childMultiplier
      factors.push(`${numChildren} child${numChildren > 1 ? 'ren' : ''} factored in`)
    }

    if (custody === 'wife' && numChildren > 0) {
      minBase = minBase * 1.15
      maxBase = maxBase * 1.20
      factors.push('Child custody with wife')
    }

    const stateMultiplier = stateMultipliers[state] || 1.0
    minBase = minBase * stateMultiplier
    maxBase = maxBase * stateMultiplier

    const minimumFloor = stateMultiplier * 10000
    minBase = Math.max(minBase, minimumFloor)
    maxBase = Math.min(maxBase, hIncome * 0.40)
    minBase = Math.min(minBase, maxBase)

    setResult({
      minAmount: Math.round(minBase),
      maxAmount: Math.round(maxBase),
      midAmount: Math.round((minBase + maxBase) / 2),
      basedOn: 'Section 25, Hindu Marriage Act, 1955',
      factors: factors.slice(0, 3),
    })
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `${(amount / 100000).toFixed(1)}L`
    return new Intl.NumberFormat('en-IN').format(amount)
  }

  return (
    <ToolPanelWrapper isOpen={isOpen} onClose={onClose} title="Alimony Calculator - Hindu Marriage Act">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-[#8892a4]">Husband&apos;s Monthly Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6366f1] text-sm">₹</span>
              <input
                type="number"
                value={husbandIncome}
                onChange={(e) => setHusbandIncome(e.target.value)}
                placeholder="50,000"
                className="w-full pl-7 pr-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] placeholder:text-[#4a5568] focus:outline-none focus:border-[#6366f1] transition-all"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-[#8892a4]">Wife&apos;s Monthly Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6366f1] text-sm">₹</span>
              <input
                type="number"
                value={wifeIncome}
                onChange={(e) => setWifeIncome(e.target.value)}
                placeholder="0"
                className="w-full pl-7 pr-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] placeholder:text-[#4a5568] focus:outline-none focus:border-[#6366f1] transition-all"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-[#8892a4]">Marriage Duration (Years)</label>
            <input
              type="number"
              value={yearsMarried}
              onChange={(e) => setYearsMarried(e.target.value)}
              placeholder="5"
              className="w-full px-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] placeholder:text-[#4a5568] focus:outline-none focus:border-[#6366f1] transition-all"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-[#8892a4]">Number of Children</label>
            <select
              value={children}
              onChange={(e) => setChildren(e.target.value)}
              className="w-full px-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#6366f1] transition-all appearance-none cursor-pointer"
            >
              <option value="0">No Children</option>
              <option value="1">1 Child</option>
              <option value="2">2 Children</option>
              <option value="3+">3+ Children</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-[#8892a4]">Child Custody</label>
            <select
              value={custody}
              onChange={(e) => setCustody(e.target.value)}
              className="w-full px-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#6366f1] transition-all appearance-none cursor-pointer"
            >
              <option value="wife">With Wife</option>
              <option value="husband">With Husband</option>
              <option value="shared">Shared Custody</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-[#8892a4]">State of Residence</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#6366f1] transition-all appearance-none cursor-pointer"
            >
              {indianStates.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={calculateAlimony}
          className="w-full py-2.5 rounded-lg font-semibold text-sm text-white bg-[#6366f1] hover:bg-[#4f46e5] transition-colors"
        >
          Calculate Estimated Alimony
        </button>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.3)]"
            >
              <div className="grid grid-cols-3 gap-3 mb-3">
                <div className="text-center p-2 rounded-lg bg-[rgba(5,13,31,0.5)]">
                  <p className="text-[10px] text-[#8892a4] uppercase">Low</p>
                  <p className="text-base font-bold text-[#8892a4]">₹{formatCurrency(result.minAmount)}</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-[rgba(99,102,241,0.2)] border border-[rgba(99,102,241,0.4)]">
                  <p className="text-[10px] text-[#6366f1] uppercase font-semibold">Likely</p>
                  <p className="text-xl font-bold text-[#6366f1]">₹{formatCurrency(result.midAmount)}</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-[rgba(5,13,31,0.5)]">
                  <p className="text-[10px] text-[#8892a4] uppercase">High</p>
                  <p className="text-base font-bold text-[#8892a4]">₹{formatCurrency(result.maxAmount)}</p>
                </div>
              </div>
              <p className="text-xs text-[#8892a4] text-center">/month • Based on {result.basedOn}</p>
              {result.factors.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1 justify-center">
                  {result.factors.map((factor, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-[rgba(99,102,241,0.1)] text-[#6366f1]">
                      {factor}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolPanelWrapper>
  )
}

// Fine Estimator Panel
const vehicleTypes = [
  { id: 'two-wheeler', label: 'Two Wheeler', icon: '🏍️' },
  { id: 'four-wheeler', label: 'Four Wheeler', icon: '🚗' },
  { id: 'commercial', label: 'Commercial', icon: '🚛' },
]

const violations = [
  { id: 'speeding', label: 'Over Speeding', baseFine: 1000, section: 'Section 183 MV Act', vehicleTypes: ['two-wheeler', 'four-wheeler', 'commercial'], isCompoundable: true, compoundingDetails: 'Can be compounded by paying fine online within 60 days', additionalPenalty: '3 months suspension on repeat offense', licenseImpact: '3 months suspension on repeat', courtRequired: false },
  { id: 'red-light', label: 'Jumping Red Light', baseFine: 1000, section: 'Section 184 MV Act', vehicleTypes: ['two-wheeler', 'four-wheeler', 'commercial'], isCompoundable: true, compoundingDetails: 'Compoundable for first offense', additionalPenalty: null, licenseImpact: null, courtRequired: false },
  { id: 'no-helmet', label: 'Riding without Helmet', baseFine: 1000, section: 'Section 194D MV Act', vehicleTypes: ['two-wheeler'], isCompoundable: true, compoundingDetails: 'Compoundable offense. Pay online or at traffic station', additionalPenalty: '3-month disqualification', licenseImpact: '3 months disqualification', courtRequired: false },
  { id: 'drunk-driving', label: 'Drunk Driving', baseFine: 10000, section: 'Section 185 MV Act', vehicleTypes: ['two-wheeler', 'four-wheeler', 'commercial'], isCompoundable: false, compoundingDetails: 'Non-compoundable. Mandatory court appearance', additionalPenalty: 'Up to 6 months imprisonment, license cancellation 1 year', licenseImpact: 'Cancellation for 1 year minimum', courtRequired: true },
  { id: 'no-seatbelt', label: 'Not Wearing Seatbelt', baseFine: 1000, section: 'Section 194B(1) MV Act', vehicleTypes: ['four-wheeler', 'commercial'], isCompoundable: true, compoundingDetails: 'Compoundable. Pay on spot or online', additionalPenalty: null, licenseImpact: null, courtRequired: false },
  { id: 'no-insurance', label: 'Driving without Insurance', baseFine: 2000, section: 'Section 196 MV Act', vehicleTypes: ['two-wheeler', 'four-wheeler', 'commercial'], isCompoundable: false, compoundingDetails: 'Non-compoundable. ₹4000 and/or 3 months jail on repeat', additionalPenalty: '3 months imprisonment on repeat', licenseImpact: null, courtRequired: true },
]

const fineStates = [
  { id: 'DL', name: 'Delhi', multiplier: 1.5, portal: 'https://delhitrafficpolice.nic.in' },
  { id: 'MH', name: 'Maharashtra', multiplier: 1.4, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'KA', name: 'Karnataka', multiplier: 1.3, portal: 'https://ksp.karnataka.gov.in/echallan' },
  { id: 'TN', name: 'Tamil Nadu', multiplier: 1.3, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'UP', name: 'Uttar Pradesh', multiplier: 1.2, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'GJ', name: 'Gujarat', multiplier: 1.2, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'HR', name: 'Haryana', multiplier: 1.3, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'PB', name: 'Punjab', multiplier: 1.2, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'WB', name: 'West Bengal', multiplier: 1.2, portal: 'https://echallan.parivahan.gov.in' },
  { id: 'RJ', name: 'Rajasthan', multiplier: 1.1, portal: 'https://echallan.parivahan.gov.in' },
]

interface FineEstimatorPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function FineEstimatorPanel({ isOpen, onClose }: FineEstimatorPanelProps) {
  const [vehicleType, setVehicleType] = useState('')
  const [violation, setViolation] = useState('')
  const [state, setState] = useState('')
  const [result, setResult] = useState<FineResult | null>(null)

  const filteredViolations = violations.filter(v => !vehicleType || v.vehicleTypes.includes(vehicleType))

  const calculateFine = () => {
    const selectedViolation = violations.find(v => v.id === violation)
    const selectedState = fineStates.find(s => s.id === state)

    if (!selectedViolation || !selectedState) {
      setResult(null)
      return
    }

    let vehicleMultiplier = 1
    if (vehicleType === 'commercial') vehicleMultiplier = 1.5

    const baseFine = Math.round(selectedViolation.baseFine * vehicleMultiplier)
    const stateFine = Math.round(baseFine * selectedState.multiplier)

    setResult({
      baseFine,
      stateFine,
      section: selectedViolation.section,
      offense: selectedViolation.label,
      isCompoundable: selectedViolation.isCompoundable,
      compoundingDetails: selectedViolation.compoundingDetails,
      additionalPenalty: selectedViolation.additionalPenalty,
      paymentPortal: selectedState.portal,
      courtRequired: selectedViolation.courtRequired,
      licenseImpact: selectedViolation.licenseImpact,
    })
  }

  return (
    <ToolPanelWrapper isOpen={isOpen} onClose={onClose} title="Challan Fine Estimator - Motor Vehicles Act">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {vehicleTypes.map(type => (
            <button
              key={type.id}
              onClick={() => { setVehicleType(type.id); setViolation(''); setResult(null) }}
              className={`p-2 rounded-lg border text-center transition-all ${
                vehicleType === type.id
                  ? 'bg-[rgba(99,102,241,0.15)] border-[#6366f1]'
                  : 'bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.08)] hover:border-[rgba(99,102,241,0.3)]'
              }`}
            >
              <div className="text-lg">{type.icon}</div>
              <div className={`text-xs font-medium ${vehicleType === type.id ? 'text-[#6366f1]' : 'text-[#f0f4ff]'}`}>{type.label}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-[#8892a4]">Violation Type</label>
            <select
              value={violation}
              onChange={(e) => { setViolation(e.target.value); setResult(null) }}
              className="w-full px-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#6366f1] transition-all appearance-none cursor-pointer"
            >
              <option value="">Select violation</option>
              {filteredViolations.map(v => (
                <option key={v.id} value={v.id}>{v.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-[#8892a4]">State</label>
            <select
              value={state}
              onChange={(e) => { setState(e.target.value); setResult(null) }}
              className="w-full px-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#6366f1] transition-all appearance-none cursor-pointer"
            >
              <option value="">Select state</option>
              {fineStates.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={calculateFine}
          disabled={!vehicleType || !violation || !state}
          className="w-full py-2.5 rounded-lg font-semibold text-sm text-white bg-[#6366f1] hover:bg-[#4f46e5] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Calculate Fine Amount
        </button>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.3)] space-y-3"
            >
              <div className="text-center">
                <p className="text-xs text-[#8892a4] mb-1">Estimated Fine</p>
                <p className="text-3xl font-bold text-[#6366f1]">₹{new Intl.NumberFormat('en-IN').format(result.stateFine)}</p>
                <p className="text-xs text-[#8892a4]">{result.section} • {result.offense}</p>
              </div>
              <div className={`p-3 rounded-lg ${result.isCompoundable ? 'bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.25)]' : 'bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.25)]'}`}>
                <div className="flex items-start gap-2">
                  {result.isCompoundable ? <CheckCircle className="w-4 h-4 text-[#22c55e] mt-0.5" /> : <AlertTriangle className="w-4 h-4 text-[#ef4444] mt-0.5" />}
                  <div>
                    <p className={`text-xs font-semibold ${result.isCompoundable ? 'text-[#22c55e]' : 'text-[#ef4444]'}`}>
                      {result.isCompoundable ? 'Compoundable Offense' : 'Non-Compoundable (Court Required)'}
                    </p>
                    <p className="text-xs text-[#8892a4] mt-0.5">{result.compoundingDetails}</p>
                  </div>
                </div>
              </div>
              {result.additionalPenalty && (
                <p className="text-xs text-[#fbbf24] bg-[rgba(251,191,36,0.1)] p-2 rounded-lg">
                  Additional: {result.additionalPenalty}
                </p>
              )}
              <a
                href={result.paymentPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-sm text-[#6366f1] hover:bg-[rgba(99,102,241,0.1)] transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Pay Online
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolPanelWrapper>
  )
}

// Document Checklist Panel
const documentCategories = [
  { id: 'identity', label: 'Identity Documents', icon: '🪪' },
  { id: 'vehicle', label: 'Vehicle Documents', icon: '🚗' },
  { id: 'property', label: 'Property Documents', icon: '🏠' },
  { id: 'certificates', label: 'Certificates', icon: '📜' },
]

const documentTypes: Record<string, { id: string; label: string; requiredDocs: string[]; processingTime: string; fee: string }[]> = {
  identity: [
    { id: 'passport', label: 'Passport (Fresh)', requiredDocs: ['Aadhaar Card', 'PAN Card', 'Birth Certificate', '2 Passport Photos', 'Address Proof', '10th Marksheet'], processingTime: '7-14 days (Normal)', fee: '₹1,500' },
    { id: 'pan', label: 'PAN Card', requiredDocs: ['Aadhaar Card', 'Passport Photo', 'DOB Proof', 'Address Proof'], processingTime: '15-20 days', fee: '₹107' },
    { id: 'voter-id', label: 'Voter ID Card', requiredDocs: ['Aadhaar Card', 'Passport Photo', 'Address Proof', 'Age Proof'], processingTime: '30-45 days', fee: 'Free' },
  ],
  vehicle: [
    { id: 'driving-license', label: 'Driving License', requiredDocs: ['Learner License', 'Aadhaar Card', 'Address Proof', 'Passport Photos', 'Medical Certificate', 'Age Proof'], processingTime: '7-30 days', fee: '₹200-500' },
    { id: 'rc-transfer', label: 'RC Transfer', requiredDocs: ['Form 29 & 30', 'Original RC', 'Insurance', 'PUC Certificate', 'NOC (if inter-state)', 'Sale Deed'], processingTime: '15-30 days', fee: '₹300-500' },
  ],
  property: [
    { id: 'property-registration', label: 'Property Registration', requiredDocs: ['Sale Deed', 'Title Deed', 'Encumbrance Certificate', 'Tax Receipts', 'NOC from Society', 'Aadhaar & PAN', 'Photos'], processingTime: '1-7 days', fee: '5-8% stamp duty' },
    { id: 'khata-transfer', label: 'Khata Transfer', requiredDocs: ['Registered Sale Deed', 'Previous Khata', 'Tax Receipts', 'Encumbrance Certificate', 'Aadhaar'], processingTime: '30-45 days', fee: '₹500-2,000' },
  ],
  certificates: [
    { id: 'birth-certificate', label: 'Birth Certificate', requiredDocs: ['Hospital Discharge', 'Parents Aadhaar', 'Marriage Certificate', 'Address Proof'], processingTime: '7-21 days', fee: '₹10-50' },
    { id: 'marriage-certificate', label: 'Marriage Certificate', requiredDocs: ['Invitation Card', 'Wedding Photos', 'Both Aadhaar', 'Age Proof', 'Witness Aadhaar'], processingTime: '7-30 days', fee: '₹100-500' },
  ],
}

interface DocumentChecklistPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function DocumentChecklistPanel({ isOpen, onClose }: DocumentChecklistPanelProps) {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDocument, setSelectedDocument] = useState('')

  const availableDocs = selectedCategory ? documentTypes[selectedCategory] || [] : []
  const selectedDocData = availableDocs.find(d => d.id === selectedDocument)

  return (
    <ToolPanelWrapper isOpen={isOpen} onClose={onClose} title="Quick Document Checklist">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-[#8892a4]">Document Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setSelectedDocument('') }}
              className="w-full px-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#6366f1] transition-all appearance-none cursor-pointer"
            >
              <option value="">Select category</option>
              {documentCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
              ))}
            </select>
          </div>
          {selectedCategory && (
            <div className="space-y-1">
              <label className="text-xs text-[#8892a4]">Document Type</label>
              <select
                value={selectedDocument}
                onChange={(e) => setSelectedDocument(e.target.value)}
                className="w-full px-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#6366f1] transition-all appearance-none cursor-pointer"
              >
                <option value="">Select document</option>
                {availableDocs.map(doc => (
                  <option key={doc.id} value={doc.id}>{doc.label}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <AnimatePresence>
          {selectedDocData && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.3)] space-y-3"
            >
              <p className="text-sm font-semibold text-[#6366f1]">{selectedDocData.label}</p>
              <div>
                <p className="text-xs text-[#8892a4] mb-2">Required Documents:</p>
                <ul className="space-y-1">
                  {selectedDocData.requiredDocs.map((doc, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-[#f0f4ff]">
                      <CheckCircle className="w-3 h-3 text-[#6366f1]" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)]">
                  <p className="text-xs text-[#8892a4]">Processing</p>
                  <p className="text-sm text-[#f0f4ff]">{selectedDocData.processingTime}</p>
                </div>
                <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.05)]">
                  <p className="text-xs text-[#8892a4]">Fee</p>
                  <p className="text-sm text-[#f0f4ff]">{selectedDocData.fee}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolPanelWrapper>
  )
}

// Stamp Duty Calculator Panel
const stampDutyRates: Record<string, { male: number; female: number; joint: number }> = {
  'Maharashtra': { male: 6, female: 5, joint: 6 },
  'Delhi': { male: 6, female: 4, joint: 6 },
  'Karnataka': { male: 5, female: 5, joint: 5 },
  'Tamil Nadu': { male: 7, female: 7, joint: 7 },
  'Gujarat': { male: 4.9, female: 4.9, joint: 4.9 },
  'Rajasthan': { male: 5, female: 4, joint: 5 },
  'Uttar Pradesh': { male: 7, female: 6, joint: 7 },
  'West Bengal': { male: 6, female: 6, joint: 6 },
  'Telangana': { male: 5, female: 5, joint: 5 },
  'Haryana': { male: 7, female: 5, joint: 7 },
}

interface StampDutyPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function StampDutyPanel({ isOpen, onClose }: StampDutyPanelProps) {
  const [propertyValue, setPropertyValue] = useState('')
  const [state, setState] = useState('')
  const [buyerType, setBuyerType] = useState<'male' | 'female' | 'joint'>('male')
  const [result, setResult] = useState<{ stampDuty: number; registration: number; total: number } | null>(null)

  const calculateStampDuty = () => {
    const value = parseFloat(propertyValue) || 0
    const rates = stampDutyRates[state]
    if (!value || !rates) {
      setResult(null)
      return
    }

    const stampDutyPercent = rates[buyerType]
    const stampDuty = Math.round(value * stampDutyPercent / 100)
    const registration = Math.round(value * 1 / 100) // 1% registration fee typical
    const total = stampDuty + registration

    setResult({ stampDuty, registration, total })
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `${(amount / 10000000).toFixed(2)} Cr`
    if (amount >= 100000) return `${(amount / 100000).toFixed(2)} L`
    return new Intl.NumberFormat('en-IN').format(amount)
  }

  return (
    <ToolPanelWrapper isOpen={isOpen} onClose={onClose} title="Stamp Duty Calculator">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1 col-span-2">
            <label className="text-xs text-[#8892a4]">Property Value</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6366f1] text-sm">₹</span>
              <input
                type="number"
                value={propertyValue}
                onChange={(e) => setPropertyValue(e.target.value)}
                placeholder="50,00,000"
                className="w-full pl-7 pr-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] placeholder:text-[#4a5568] focus:outline-none focus:border-[#6366f1] transition-all"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-[#8892a4]">State</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#6366f1] transition-all appearance-none cursor-pointer"
            >
              <option value="">Select state</option>
              {Object.keys(stampDutyRates).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-[#8892a4]">Buyer Type</label>
            <select
              value={buyerType}
              onChange={(e) => setBuyerType(e.target.value as 'male' | 'female' | 'joint')}
              className="w-full px-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#6366f1] transition-all appearance-none cursor-pointer"
            >
              <option value="male">Male Buyer</option>
              <option value="female">Female Buyer</option>
              <option value="joint">Joint Buyers</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateStampDuty}
          disabled={!propertyValue || !state}
          className="w-full py-2.5 rounded-lg font-semibold text-sm text-white bg-[#6366f1] hover:bg-[#4f46e5] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Calculate Stamp Duty
        </button>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.3)] space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-[rgba(5,13,31,0.5)] text-center">
                  <p className="text-xs text-[#8892a4]">Stamp Duty</p>
                  <p className="text-lg font-bold text-[#f0f4ff]">₹{formatCurrency(result.stampDuty)}</p>
                </div>
                <div className="p-3 rounded-lg bg-[rgba(5,13,31,0.5)] text-center">
                  <p className="text-xs text-[#8892a4]">Registration</p>
                  <p className="text-lg font-bold text-[#f0f4ff]">₹{formatCurrency(result.registration)}</p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-[rgba(99,102,241,0.2)] border border-[rgba(99,102,241,0.4)] text-center">
                <p className="text-xs text-[#6366f1]">Total Registration Cost</p>
                <p className="text-2xl font-bold text-[#6366f1]">₹{formatCurrency(result.total)}</p>
              </div>
              <p className="text-xs text-[#8892a4] text-center">
                Based on {stampDutyRates[state]?.[buyerType]}% stamp duty rate for {state}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolPanelWrapper>
  )
}

// Child Support Estimator Panel
interface ChildSupportPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function ChildSupportPanel({ isOpen, onClose }: ChildSupportPanelProps) {
  const [parentIncome, setParentIncome] = useState('')
  const [numChildren, setNumChildren] = useState('1')
  const [childAge, setChildAge] = useState('under-5')
  const [custody, setCustody] = useState('mother')
  const [result, setResult] = useState<{ minAmount: number; maxAmount: number; perChild: number } | null>(null)

  const calculateSupport = () => {
    const income = parseFloat(parentIncome) || 0
    if (!income) {
      setResult(null)
      return
    }

    const children = parseInt(numChildren)
    let basePercent = 0.20 // Base 20% for one child

    // Adjust for number of children
    if (children === 2) basePercent = 0.30
    else if (children >= 3) basePercent = 0.35

    // Adjust for child age (younger children need more)
    let ageMultiplier = 1
    if (childAge === 'under-5') ageMultiplier = 1.15
    else if (childAge === '5-12') ageMultiplier = 1.0
    else ageMultiplier = 0.9 // 12+ can work part-time

    const minAmount = Math.round(income * basePercent * ageMultiplier * 0.8)
    const maxAmount = Math.round(income * basePercent * ageMultiplier * 1.2)
    const perChild = Math.round((minAmount + maxAmount) / 2 / children)

    setResult({ minAmount, maxAmount, perChild })
  }

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `${(amount / 100000).toFixed(1)}L`
    return new Intl.NumberFormat('en-IN').format(amount)
  }

  return (
    <ToolPanelWrapper isOpen={isOpen} onClose={onClose} title="Child Support Estimator">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1 col-span-2">
            <label className="text-xs text-[#8892a4]">Non-Custodial Parent&apos;s Monthly Income</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6366f1] text-sm">₹</span>
              <input
                type="number"
                value={parentIncome}
                onChange={(e) => setParentIncome(e.target.value)}
                placeholder="50,000"
                className="w-full pl-7 pr-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] placeholder:text-[#4a5568] focus:outline-none focus:border-[#6366f1] transition-all"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-[#8892a4]">Number of Children</label>
            <select
              value={numChildren}
              onChange={(e) => setNumChildren(e.target.value)}
              className="w-full px-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#6366f1] transition-all appearance-none cursor-pointer"
            >
              <option value="1">1 Child</option>
              <option value="2">2 Children</option>
              <option value="3">3+ Children</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs text-[#8892a4]">Child Age Group</label>
            <select
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              className="w-full px-3 py-2 bg-[rgba(5,13,31,0.8)] border border-[rgba(99,102,241,0.2)] rounded-lg text-sm text-[#f0f4ff] focus:outline-none focus:border-[#6366f1] transition-all appearance-none cursor-pointer"
            >
              <option value="under-5">Under 5 years</option>
              <option value="5-12">5-12 years</option>
              <option value="12+">12+ years</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateSupport}
          disabled={!parentIncome}
          className="w-full py-2.5 rounded-lg font-semibold text-sm text-white bg-[#6366f1] hover:bg-[#4f46e5] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Calculate Child Support
        </button>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.3)] space-y-3"
            >
              <div className="text-center">
                <p className="text-xs text-[#8892a4] mb-1">Estimated Monthly Support</p>
                <p className="text-2xl font-bold text-[#6366f1]">₹{formatCurrency(result.minAmount)} - ₹{formatCurrency(result.maxAmount)}</p>
                <p className="text-xs text-[#8892a4] mt-1">~₹{formatCurrency(result.perChild)} per child</p>
              </div>
              <div className="p-3 rounded-lg bg-[rgba(99,102,241,0.1)] border border-[rgba(99,102,241,0.2)]">
                <p className="text-xs text-[#6366f1]">
                  Under Section 125 CrPC, courts typically award 20-35% of income for child maintenance. Amount varies based on standard of living, education needs, and special circumstances.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToolPanelWrapper>
  )
}
