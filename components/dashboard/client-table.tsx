'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, Brain, Eye } from 'lucide-react'

interface Client {
  id: string
  name: string
  initials: string
  color: string
  caseType: string
  status: 'Active' | 'Pending' | 'Closed'
  date: string
}

const clients: Client[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    initials: 'PS',
    color: 'bg-pink-500',
    caseType: 'Divorce Petition',
    status: 'Active',
    date: '12 Jan 2025',
  },
  {
    id: '2',
    name: 'Rahul Verma',
    initials: 'RV',
    color: 'bg-blue-500',
    caseType: 'Property Dispute',
    status: 'Pending',
    date: '28 Jan 2025',
  },
  {
    id: '3',
    name: 'Meena Gupta',
    initials: 'MG',
    color: 'bg-purple-500',
    caseType: 'Domestic Violence',
    status: 'Active',
    date: '5 Feb 2025',
  },
]

const statusStyles = {
  Active: 'bg-green-500/20 text-green-400 border-green-500/30',
  Pending: 'bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c]/30',
  Closed: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

const analysisResults = [
  { section: 'IPC 498A', title: 'Cruelty by husband or relatives', relevance: 'High' },
  { section: 'IPC 406', title: 'Criminal breach of trust', relevance: 'Medium' },
  { section: 'DV Act Sec 12', title: 'Protection order application', relevance: 'High' },
]

export function ClientTable() {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showAnalysisPanel, setShowAnalysisPanel] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const handleAnalyze = (client: Client) => {
    setSelectedClient(client)
    setShowAnalysisPanel(true)
  }

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-xl md:text-2xl font-bold text-[#f0f4ff]">
          Client Management
        </h2>
        <motion.button
          onClick={() => setShowAddModal(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg gold-shimmer text-[#050d1f] font-medium text-sm"
        >
          <Plus className="w-4 h-4" />
          Add New Client
        </motion.button>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-[rgba(255,255,255,0.04)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] overflow-hidden">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 border-b border-[rgba(255,255,255,0.08)] text-sm font-medium text-[#c9a84c]">
          <div className="col-span-4">Client</div>
          <div className="col-span-3">Case Type</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-[rgba(255,255,255,0.05)]">
          {clients.map((client) => (
            <motion.div
              key={client.id}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-4 items-center transition-all duration-200 hover:border-l-2 hover:border-l-[#c9a84c]"
            >
              {/* Client */}
              <div className="col-span-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${client.color} flex items-center justify-center text-white font-semibold text-sm`}>
                  {client.initials}
                </div>
                <div>
                  <div className="font-medium text-[#f0f4ff]">{client.name}</div>
                  <div className="text-xs text-[#8892a4] md:hidden">{client.caseType}</div>
                </div>
              </div>

              {/* Case Type */}
              <div className="hidden md:block col-span-3 text-[#8892a4]">
                {client.caseType}
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium border ${statusStyles[client.status]}`}>
                  {client.status}
                </span>
              </div>

              {/* Date */}
              <div className="hidden md:block col-span-1 text-sm text-[#8892a4]">
                {client.date}
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-2">
                <motion.button
                  onClick={() => handleAnalyze(client)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-br from-[#7b61ff] to-[#6b51ef] text-white text-xs font-medium"
                >
                  <Brain className="w-3.5 h-3.5" />
                  Analyze
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[rgba(255,255,255,0.15)] text-[#f0f4ff] text-xs font-medium hover:bg-[rgba(255,255,255,0.05)]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Client Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md p-6 rounded-2xl bg-[#0a1525] border border-[rgba(201,168,76,0.2)]"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-serif text-xl font-bold text-[#f0f4ff]">Add New Client</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[#8892a4]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#8892a4] mb-2">Client Name</label>
                  <input
                    type="text"
                    placeholder="Enter client name"
                    className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f0f4ff] placeholder-[#8892a4] focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#8892a4] mb-2">Case Type</label>
                  <select className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f0f4ff] focus:outline-none focus:border-[rgba(201,168,76,0.4)]">
                    <option value="">Select case type</option>
                    <option value="divorce">Divorce Petition</option>
                    <option value="property">Property Dispute</option>
                    <option value="domestic">Domestic Violence</option>
                    <option value="criminal">Criminal Defense</option>
                    <option value="civil">Civil Litigation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-[#8892a4] mb-2">Contact Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] text-[#f0f4ff] placeholder-[#8892a4] focus:outline-none focus:border-[rgba(201,168,76,0.4)]"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 rounded-lg border border-[rgba(255,255,255,0.15)] text-[#f0f4ff] font-medium hover:bg-[rgba(255,255,255,0.05)]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 rounded-lg gold-shimmer text-[#050d1f] font-medium"
                >
                  Add Client
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Analysis Panel */}
      <AnimatePresence>
        {showAnalysisPanel && selectedClient && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full md:w-[400px] z-50 bg-[#0a1525] border-l border-[rgba(201,168,76,0.2)] p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-[#f0f4ff]">AI Analysis</h3>
              <button
                onClick={() => setShowAnalysisPanel(false)}
                className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] text-[#8892a4]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <div className="text-sm text-[#8892a4] mb-1">Analyzing case for</div>
              <div className="font-semibold text-[#f0f4ff]">{selectedClient.name}</div>
              <div className="text-sm text-[#c9a84c]">{selectedClient.caseType}</div>
            </div>

            <div className="space-y-4">
              <div className="text-sm font-medium text-[#8892a4] uppercase tracking-wider">
                Suggested IPC Sections
              </div>
              {analysisResults.map((result) => (
                <motion.div
                  key={result.section}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-[rgba(123,97,255,0.1)] border border-[rgba(123,97,255,0.2)]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm font-semibold text-[#7b61ff]">
                      {result.section}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      result.relevance === 'High' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {result.relevance} Relevance
                    </span>
                  </div>
                  <div className="text-sm text-[#f0f4ff]">{result.title}</div>
                </motion.div>
              ))}
            </div>

            <button className="w-full mt-6 px-4 py-3 rounded-lg gold-shimmer text-[#050d1f] font-medium">
              Generate Full Report
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for analysis panel */}
      <AnimatePresence>
        {showAnalysisPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAnalysisPanel(false)}
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  )
}
