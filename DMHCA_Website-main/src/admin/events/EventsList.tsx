import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaSave, FaUpload } from 'react-icons/fa'

const CATEGORIES = ['conference', 'workshop', 'symposium', 'webinar', 'seminar']
const STATUSES = ['upcoming', 'ongoing', 'completed', 'cancelled']

const defaultForm = {
  title: '', event_date: '', event_time: '', location: '', category: 'conference',
  description: '', image_url: '', price: 'Free', seats: 100, status: 'upcoming',
  is_featured: false, is_active: true, speakers: [], topics: []
}

const EventsList = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)

  const fetchItems = async () => {
    setLoading(true)
    const { data } = await supabase.from('events').select('*').order('event_date', { ascending: false })
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const toggleActive = async (item: any) => {
    await supabase.from('events').update({ is_active: !item.is_active }).eq('id', item.id)
    fetchItems()
  }

  const deleteItem = async (id: number) => {
    if (!window.confirm('Delete this event?')) return
    await supabase.from('events').delete().eq('id', id)
    fetchItems()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          <p className="text-gray-500 text-sm">{items.length} events</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="flex items-center gap-2 bg-[#002D72] hover:bg-[#003a8c] text-white text-sm font-medium px-4 py-2.5 rounded-lg">
          <FaPlus className="text-xs" /> Add Event
        </button>
      </div>

      {showForm && <EventForm initial={editing} onSave={() => { setShowForm(false); fetchItems() }} onCancel={() => setShowForm(false)} />}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002D72]" /></div>
        ) : items.length === 0 ? (
          <p className="text-center py-12 text-gray-400">No events yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 text-left"><th className="px-5 py-3 font-semibold text-gray-600">Event</th><th className="px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Date</th><th className="px-4 py-3 font-semibold text-gray-600 hidden lg:table-cell">Category</th><th className="px-4 py-3 font-semibold text-gray-600 text-center">Active</th><th className="px-4 py-3 font-semibold text-gray-600 text-center">Actions</th></tr></thead>
              <tbody className="divide-y divide-gray-50">
                {items.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-5 py-3">
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.location} · {item.price}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden md:table-cell">{item.event_date}</td>
                    <td className="px-4 py-3 hidden lg:table-cell"><span className="capitalize text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{item.category}</span></td>
                    <td className="px-4 py-3 text-center"><button onClick={() => toggleActive(item)}>{item.is_active ? <FaToggleOn className="text-xl text-green-500 mx-auto" /> : <FaToggleOff className="text-xl text-gray-300 mx-auto" />}</button></td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button onClick={() => { setEditing(item); setShowForm(true) }} className="text-[#002D72] hover:bg-blue-50 p-1.5 rounded-md"><FaEdit /></button>
                        <button onClick={() => deleteItem(item.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-md"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

const EventForm = ({ initial, onSave, onCancel }: { initial: any; onSave: () => void; onCancel: () => void }) => {
  const [form, setForm] = useState({ ...defaultForm, ...initial, speakers: Array.isArray(initial?.speakers) ? initial.speakers.join(', ') : '', topics: Array.isArray(initial?.topics) ? initial.topics.join(', ') : '' })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const set = (f: string, v: any) => setForm((p: any) => ({ ...p, [f]: v }))

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const path = `events/${Date.now()}.${file.name.split('.').pop()}`
    await supabase.storage.from('images').upload(path, file, { upsert: true })
    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(path)
    set('image_url', publicUrl)
    setUploading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    const payload = { ...form, speakers: form.speakers.split(',').map((s: string) => s.trim()).filter(Boolean), topics: form.topics.split(',').map((t: string) => t.trim()).filter(Boolean), seats: Number(form.seats), updated_at: new Date().toISOString() }
    if (initial?.id) await supabase.from('events').update(payload).eq('id', initial.id)
    else await supabase.from('events').insert([payload])
    setSaving(false)
    onSave()
  }

  const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]"

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
      <h3 className="font-semibold text-gray-800">{initial ? 'Edit Event' : 'Add Event'}</h3>
      <div><label className="block text-xs font-medium text-gray-600 mb-1">Title *</label><input required value={form.title} onChange={e => set('title', e.target.value)} className={inputCls} /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Date *</label><input type="date" value={form.event_date} onChange={e => set('event_date', e.target.value)} className={inputCls} /></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Time</label><input value={form.event_time} onChange={e => set('event_time', e.target.value)} placeholder="09:00 AM" className={inputCls} /></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Location</label><input value={form.location} onChange={e => set('location', e.target.value)} className={inputCls} /></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Price</label><input value={form.price} onChange={e => set('price', e.target.value)} placeholder="Free or ₹2,500" className={inputCls} /></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Category</label><select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Status</label><select value={form.status} onChange={e => set('status', e.target.value)} className={inputCls}>{STATUSES.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
      </div>
      <div><label className="block text-xs font-medium text-gray-600 mb-1">Description</label><textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72] resize-none" /></div>
      <div><label className="block text-xs font-medium text-gray-600 mb-1">Speakers (comma-separated)</label><input value={form.speakers} onChange={e => set('speakers', e.target.value)} placeholder="Dr. Rajesh Kumar, Dr. Priya Sharma" className={inputCls} /></div>
      <div><label className="block text-xs font-medium text-gray-600 mb-1">Topics (comma-separated)</label><input value={form.topics} onChange={e => set('topics', e.target.value)} placeholder="Cardiology Updates, Digital Health" className={inputCls} /></div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
        <input value={form.image_url} onChange={e => set('image_url', e.target.value)} className={`${inputCls} mb-2`} />
        <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-2 rounded-lg cursor-pointer w-fit">
          <FaUpload /> {uploading ? 'Uploading...' : 'Upload Image'}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#002D72] rounded-lg disabled:opacity-60"><FaSave className="text-xs" /> {saving ? 'Saving...' : 'Save'}</button>
        <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
      </div>
    </div>
  )
}

export default EventsList
