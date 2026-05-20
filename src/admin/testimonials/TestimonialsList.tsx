import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { FaSave, FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa'

const TestimonialsList = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)

  const fetchItems = async () => {
    setLoading(true)
    const { data } = await supabase.from('testimonials').select('*').order('display_order').order('id')
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const toggleActive = async (item: any) => {
    await supabase.from('testimonials').update({ is_active: !item.is_active }).eq('id', item.id)
    fetchItems()
  }

  const deleteItem = async (id: number) => {
    if (!window.confirm('Delete this testimonial?')) return
    await supabase.from('testimonials').delete().eq('id', id)
    fetchItems()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimonials</h1>
          <p className="text-gray-500 text-sm">{items.length} testimonials</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="flex items-center gap-2 bg-[#002D72] hover:bg-[#003a8c] text-white text-sm font-medium px-4 py-2.5 rounded-lg">
          <FaPlus className="text-xs" /> Add Testimonial
        </button>
      </div>

      {showForm && <TestimonialForm initial={editing} onSave={() => { setShowForm(false); fetchItems() }} onCancel={() => setShowForm(false)} />}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002D72]" /></div>
        ) : items.length === 0 ? (
          <p className="text-center py-12 text-gray-400">No testimonials yet. Add your first one!</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {items.map(item => (
              <div key={item.id} className="px-5 py-4 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <span className="text-xs text-gray-400">{item.role} · {item.location}</span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 italic">"{item.quote}"</p>
                  <p className="text-xs text-gray-400 mt-1">{item.program} · Order: {item.display_order}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleActive(item)}>
                    {item.is_active ? <FaToggleOn className="text-xl text-green-500" /> : <FaToggleOff className="text-xl text-gray-300" />}
                  </button>
                  <button onClick={() => { setEditing(item); setShowForm(true) }} className="text-[#002D72] hover:bg-blue-50 p-1.5 rounded-md">
                    <FaEdit />
                  </button>
                  <button onClick={() => deleteItem(item.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-md">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const TestimonialForm = ({ initial, onSave, onCancel }: { initial: any; onSave: () => void; onCancel: () => void }) => {
  const [form, setForm] = useState({
    name: '', role: '', program: '', location: '', rating: 5, quote: '', highlight: '', image_url: '', display_order: 0, is_active: true,
    ...initial
  })
  const [saving, setSaving] = useState(false)
  const set = (f: string, v: any) => setForm((p: any) => ({ ...p, [f]: v }))

  const handleSave = async () => {
    setSaving(true)
    if (initial?.id) {
      await supabase.from('testimonials').update({ ...form, updated_at: new Date().toISOString() }).eq('id', initial.id)
    } else {
      await supabase.from('testimonials').insert([form])
    }
    setSaving(false)
    onSave()
  }

  const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]"

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
      <h3 className="font-semibold text-gray-800">{initial ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Name *</label><input required value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} /></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Role / Title</label><input value={form.role} onChange={e => set('role', e.target.value)} className={inputCls} /></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Program Name</label><input value={form.program} onChange={e => set('program', e.target.value)} className={inputCls} /></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Location</label><input value={form.location} onChange={e => set('location', e.target.value)} className={inputCls} /></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Rating (1-5)</label><input type="number" min={1} max={5} value={form.rating} onChange={e => set('rating', Number(e.target.value))} className={inputCls} /></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Display Order</label><input type="number" min={0} value={form.display_order} onChange={e => set('display_order', Number(e.target.value))} className={inputCls} /></div>
      </div>
      <div><label className="block text-xs font-medium text-gray-600 mb-1">Quote / Review *</label><textarea required rows={3} value={form.quote} onChange={e => set('quote', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72] resize-none" /></div>
      <div><label className="block text-xs font-medium text-gray-600 mb-1">Highlight (bold summary)</label><input value={form.highlight} onChange={e => set('highlight', e.target.value)} className={inputCls} /></div>
      <div className="flex items-center gap-3 pt-2">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#002D72] rounded-lg disabled:opacity-60">
          <FaSave className="text-xs" /> {saving ? 'Saving...' : 'Save'}
        </button>
        <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
      </div>
    </div>
  )
}

export default TestimonialsList
