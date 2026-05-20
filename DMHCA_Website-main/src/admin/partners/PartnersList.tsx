import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaSave, FaUpload } from 'react-icons/fa'

const PARTNER_TYPES = ['university', 'accreditation']

const defaultForm = {
  name: '', partner_type: 'university', description: '', verified: true,
  badges: [], logo_url: '', website_url: '', display_order: 0, is_active: true
}

const PartnersList = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [typeFilter, setTypeFilter] = useState('all')

  const fetchItems = async () => {
    setLoading(true)
    let query = supabase.from('partners').select('*').order('display_order').order('id')
    if (typeFilter !== 'all') query = query.eq('partner_type', typeFilter)
    const { data } = await query
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [typeFilter])

  const toggleActive = async (item: any) => {
    await supabase.from('partners').update({ is_active: !item.is_active }).eq('id', item.id)
    fetchItems()
  }

  const deleteItem = async (id: number) => {
    if (!window.confirm('Delete this partner?')) return
    await supabase.from('partners').delete().eq('id', id)
    fetchItems()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partners & Accreditation</h1>
          <p className="text-gray-500 text-sm">{items.length} partners</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="flex items-center gap-2 bg-[#002D72] hover:bg-[#003a8c] text-white text-sm font-medium px-4 py-2.5 rounded-lg">
          <FaPlus className="text-xs" /> Add Partner
        </button>
      </div>

      {/* Type Filter */}
      <div className="flex gap-2">
        {['all', ...PARTNER_TYPES].map(t => (
          <button key={t} onClick={() => setTypeFilter(t)} className={`px-3 py-2 text-sm rounded-lg font-medium capitalize transition-colors ${typeFilter === t ? 'bg-[#002D72] text-white' : 'bg-white border border-gray-300 text-gray-700 hover:border-[#002D72]'}`}>
            {t === 'all' ? 'All' : t}
          </button>
        ))}
      </div>

      {showForm && <PartnerForm initial={editing} onSave={() => { setShowForm(false); fetchItems() }} onCancel={() => setShowForm(false)} />}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002D72]" /></div>
        ) : items.length === 0 ? (
          <p className="text-center py-12 text-gray-400">No partners yet.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {items.map(item => (
              <div key={item.id} className="px-5 py-4 flex items-center gap-4">
                {item.logo_url ? <img src={item.logo_url} alt="" className="w-14 h-14 object-contain rounded-lg border border-gray-200 bg-gray-50 p-1 flex-shrink-0" /> : <div className="w-14 h-14 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center text-gray-400 text-xs">Logo</div>}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{item.partner_type} · Order: {item.display_order}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleActive(item)}>{item.is_active ? <FaToggleOn className="text-xl text-green-500" /> : <FaToggleOff className="text-xl text-gray-300" />}</button>
                  <button onClick={() => { setEditing(item); setShowForm(true) }} className="text-[#002D72] hover:bg-blue-50 p-1.5 rounded-md"><FaEdit /></button>
                  <button onClick={() => deleteItem(item.id)} className="text-red-500 hover:bg-red-50 p-1.5 rounded-md"><FaTrash /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const PartnerForm = ({ initial, onSave, onCancel }: { initial: any; onSave: () => void; onCancel: () => void }) => {
  const [form, setForm] = useState({ ...defaultForm, ...initial, badges: Array.isArray(initial?.badges) ? initial.badges.join(', ') : '' })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const set = (f: string, v: any) => setForm((p: any) => ({ ...p, [f]: v }))

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const path = `partners/${Date.now()}.${file.name.split('.').pop()}`
    await supabase.storage.from('images').upload(path, file, { upsert: true })
    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(path)
    set('logo_url', publicUrl)
    setUploading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    const payload = { ...form, badges: form.badges.split(',').map((b: string) => b.trim()).filter(Boolean), display_order: Number(form.display_order), updated_at: new Date().toISOString() }
    if (initial?.id) await supabase.from('partners').update(payload).eq('id', initial.id)
    else await supabase.from('partners').insert([payload])
    setSaving(false)
    onSave()
  }

  const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]"

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
      <h3 className="font-semibold text-gray-800">{initial ? 'Edit Partner' : 'Add Partner'}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Name *</label><input required value={form.name} onChange={e => set('name', e.target.value)} className={inputCls} /></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Type</label><select value={form.partner_type} onChange={e => set('partner_type', e.target.value)} className={inputCls}>{PARTNER_TYPES.map(t => <option key={t} value={t}>{t}</option>)}</select></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Website URL</label><input value={form.website_url} onChange={e => set('website_url', e.target.value)} placeholder="https://..." className={inputCls} /></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Display Order</label><input type="number" value={form.display_order} onChange={e => set('display_order', e.target.value)} className={inputCls} /></div>
      </div>
      <div><label className="block text-xs font-medium text-gray-600 mb-1">Description</label><textarea rows={3} value={form.description} onChange={e => set('description', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72] resize-none" /></div>
      <div><label className="block text-xs font-medium text-gray-600 mb-1">Badges (comma-separated)</label><input value={form.badges} onChange={e => set('badges', e.target.value)} placeholder="UGC Recognized, Gov. Approved, Top 100 India" className={inputCls} /></div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Logo URL</label>
        <input value={form.logo_url} onChange={e => set('logo_url', e.target.value)} className={`${inputCls} mb-2`} />
        {form.logo_url && <img src={form.logo_url} alt="Preview" className="w-20 h-16 object-contain bg-gray-50 border border-gray-200 rounded-lg p-1 mb-2" />}
        <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-2 rounded-lg cursor-pointer w-fit">
          <FaUpload /> {uploading ? 'Uploading...' : 'Upload Logo'}
          <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
        </label>
      </div>
      <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="checkbox" checked={form.verified} onChange={e => set('verified', e.target.checked)} className="accent-[#002D72]" /> Verified Official Partner</label>
      <div className="flex items-center gap-3 pt-2">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#002D72] rounded-lg disabled:opacity-60"><FaSave className="text-xs" /> {saving ? 'Saving...' : 'Save'}</button>
        <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
      </div>
    </div>
  )
}

export default PartnersList
