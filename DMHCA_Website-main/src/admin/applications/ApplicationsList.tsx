import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { FaSearch, FaDownload, FaEye, FaTimes, FaEnvelope } from 'react-icons/fa'

const STATUSES = ['new', 'reviewed', 'contacted', 'enrolled', 'closed'] as const
type Status = typeof STATUSES[number]

const statusColors: Record<Status, string> = {
  new: 'bg-blue-100 text-blue-700',
  reviewed: 'bg-yellow-100 text-yellow-700',
  contacted: 'bg-purple-100 text-purple-700',
  enrolled: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-500',
}

const ApplicationsList = () => {
  const [apps, setApps] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [selected, setSelected] = useState<any | null>(null)
  const [savingNote, setSavingNote] = useState(false)
  const [noteText, setNoteText] = useState('')

  const fetchApps = async () => {
    setLoading(true)
    let query = supabase.from('applications').select('*').order('created_at', { ascending: false })
    if (statusFilter) query = query.eq('status', statusFilter)
    if (typeFilter) query = query.eq('form_type', typeFilter)
    const { data } = await query
    setApps(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchApps() }, [statusFilter, typeFilter])

  const updateStatus = async (id: string, status: Status) => {
    await supabase.from('applications').update({ status }).eq('id', id)
    setApps(prev => prev.map(a => a.id === id ? { ...a, status } : a))
    if (selected?.id === id) setSelected((prev: any) => ({ ...prev, status }))
  }

  const saveNote = async () => {
    if (!selected) return
    setSavingNote(true)
    await supabase.from('applications').update({ notes: noteText }).eq('id', selected.id)
    setApps(prev => prev.map(a => a.id === selected.id ? { ...a, notes: noteText } : a))
    setSavingNote(false)
  }

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Type', 'Course Interest', 'Subject', 'Message', 'Status', 'Date']
    const rows = apps.map(a => [a.name, a.email, a.phone ?? '', a.form_type, a.course_interest ?? '', a.subject ?? '', a.message ?? '', a.status, new Date(a.created_at).toLocaleDateString()])
    const csv = [headers, ...rows].map(r => r.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'applications.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = apps.filter(a => {
    const q = search.toLowerCase()
    return !q || a.name?.toLowerCase().includes(q) || a.email?.toLowerCase().includes(q) || a.phone?.includes(q)
  })

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="text-gray-500 text-sm">{apps.length} total submissions</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <FaDownload className="text-xs" /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email, phone..." className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]">
          <option value="">All Types</option>
          <option value="contact">Contact Form</option>
          <option value="apply">Apply Form</option>
        </select>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]">
          <option value="">All Statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className={`${selected ? 'lg:col-span-2' : 'lg:col-span-3'} bg-white rounded-xl border border-gray-100 overflow-hidden`}>
          {loading ? (
            <div className="flex items-center justify-center h-48"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002D72]" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <FaEnvelope className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400">No applications found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Applicant</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map(app => (
                    <tr key={app.id} className={`hover:bg-gray-50 cursor-pointer transition-colors ${selected?.id === app.id ? 'bg-blue-50' : ''}`} onClick={() => { setSelected(app); setNoteText(app.notes ?? '') }}>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 text-sm">{app.name}</p>
                        <p className="text-gray-400 text-xs">{app.email}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${app.form_type === 'apply' ? 'bg-[#002D72]/10 text-[#002D72]' : 'bg-purple-100 text-purple-700'}`}>{app.form_type}</span>
                      </td>
                      <td className="px-4 py-3">
                        <select value={app.status} onChange={e => { e.stopPropagation(); updateStatus(app.id, e.target.value as Status) }} onClick={e => e.stopPropagation()} className={`px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer ${statusColors[app.status as Status]}`}>
                          {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">{new Date(app.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <button onClick={e => { e.stopPropagation(); setSelected(app); setNoteText(app.notes ?? '') }} className="text-[#002D72] hover:underline text-xs flex items-center gap-1"><FaEye /> View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
            <div className="flex items-start justify-between">
              <h2 className="font-bold text-gray-900">{selected.name}</h2>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><FaTimes /></button>
            </div>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-500">Email:</span> <a href={`mailto:${selected.email}`} className="text-[#002D72] hover:underline">{selected.email}</a></div>
              {selected.phone && <div><span className="text-gray-500">Phone:</span> {selected.phone}</div>}
              {selected.course_interest && <div><span className="text-gray-500">Course:</span> {selected.course_interest}</div>}
              {selected.subject && <div><span className="text-gray-500">Subject:</span> {selected.subject}</div>}
              {selected.message && (
                <div>
                  <span className="text-gray-500 block mb-1">Message:</span>
                  <p className="text-gray-700 bg-gray-50 rounded p-2 text-xs">{selected.message}</p>
                </div>
              )}
              <div><span className="text-gray-500">Submitted:</span> {new Date(selected.created_at).toLocaleString()}</div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">Status:</span>
                <select value={selected.status} onChange={e => updateStatus(selected.id, e.target.value as Status)} className={`px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer ${statusColors[selected.status as Status]}`}>
                  {STATUSES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Internal Notes</label>
              <textarea value={noteText} onChange={e => setNoteText(e.target.value)} rows={4} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]" placeholder="Add notes about this applicant..." />
              <button onClick={saveNote} disabled={savingNote} className="mt-2 w-full px-3 py-1.5 bg-[#002D72] text-white rounded-lg text-sm font-medium hover:bg-[#003a8c] transition-colors disabled:opacity-60">
                {savingNote ? 'Saving...' : 'Save Notes'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationsList
