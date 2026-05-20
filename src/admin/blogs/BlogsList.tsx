import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { FaPlus, FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaSave, FaUpload, FaStar } from 'react-icons/fa'

const CATEGORIES = ['cardiology', 'radiology', 'neurology', 'pediatrics', 'oncology', 'orthopedics', 'dermatology', 'general', 'technology']

const defaultForm = {
  title: '', excerpt: '', content: '', author: 'DMHCA', published_date: new Date().toISOString().split('T')[0],
  read_time: '5 min read', category: 'general', image_url: '', is_featured: false, is_active: true, tags: []
}

const BlogsList = () => {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)

  const fetchItems = async () => {
    setLoading(true)
    const { data } = await supabase.from('blogs').select('*').order('published_date', { ascending: false })
    setItems(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchItems() }, [])

  const toggleActive = async (item: any) => {
    await supabase.from('blogs').update({ is_active: !item.is_active }).eq('id', item.id)
    fetchItems()
  }

  const toggleFeatured = async (item: any) => {
    await supabase.from('blogs').update({ is_featured: !item.is_featured }).eq('id', item.id)
    fetchItems()
  }

  const deleteItem = async (id: number) => {
    if (!window.confirm('Delete this blog post?')) return
    await supabase.from('blogs').delete().eq('id', id)
    fetchItems()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
          <p className="text-gray-500 text-sm">{items.length} posts</p>
        </div>
        <button onClick={() => { setEditing(null); setShowForm(true) }} className="flex items-center gap-2 bg-[#002D72] hover:bg-[#003a8c] text-white text-sm font-medium px-4 py-2.5 rounded-lg">
          <FaPlus className="text-xs" /> Add Blog Post
        </button>
      </div>

      {showForm && <BlogForm initial={editing} onSave={() => { setShowForm(false); fetchItems() }} onCancel={() => setShowForm(false)} />}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-40"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002D72]" /></div>
        ) : items.length === 0 ? (
          <p className="text-center py-12 text-gray-400">No blog posts yet.</p>
        ) : (
          <div className="divide-y divide-gray-50">
            {items.map(item => (
              <div key={item.id} className="px-5 py-4 flex items-start gap-4">
                {item.image_url && <img src={item.image_url} alt="" className="w-16 h-12 object-cover rounded-lg flex-shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 line-clamp-1">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.author} · {item.published_date} · {item.category} · {item.read_time}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => toggleFeatured(item)} title="Featured"><FaStar className={`text-base ${item.is_featured ? 'text-amber-500' : 'text-gray-300'}`} /></button>
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

const BlogForm = ({ initial, onSave, onCancel }: { initial: any; onSave: () => void; onCancel: () => void }) => {
  const [form, setForm] = useState({ ...defaultForm, ...initial, tags: Array.isArray(initial?.tags) ? initial.tags.join(', ') : '' })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const set = (f: string, v: any) => setForm((p: any) => ({ ...p, [f]: v }))

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const path = `blogs/${Date.now()}.${file.name.split('.').pop()}`
    await supabase.storage.from('images').upload(path, file, { upsert: true })
    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(path)
    set('image_url', publicUrl)
    setUploading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    const payload = { ...form, tags: form.tags.split(',').map((t: string) => t.trim()).filter(Boolean), updated_at: new Date().toISOString() }
    if (initial?.id) await supabase.from('blogs').update(payload).eq('id', initial.id)
    else await supabase.from('blogs').insert([payload])
    setSaving(false)
    onSave()
  }

  const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]"

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
      <h3 className="font-semibold text-gray-800">{initial ? 'Edit Blog Post' : 'Add Blog Post'}</h3>
      <div><label className="block text-xs font-medium text-gray-600 mb-1">Title *</label><input required value={form.title} onChange={e => set('title', e.target.value)} className={inputCls} /></div>
      <div><label className="block text-xs font-medium text-gray-600 mb-1">Excerpt (short summary)</label><textarea rows={2} value={form.excerpt} onChange={e => set('excerpt', e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72] resize-none" /></div>
      <div><label className="block text-xs font-medium text-gray-600 mb-1">Full Content (supports HTML)</label><textarea rows={8} value={form.content} onChange={e => set('content', e.target.value)} placeholder="<h2>Introduction</h2><p>...</p>" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72] resize-none font-mono" /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Author</label><input value={form.author} onChange={e => set('author', e.target.value)} className={inputCls} /></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Published Date</label><input type="date" value={form.published_date} onChange={e => set('published_date', e.target.value)} className={inputCls} /></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Category</label><select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls}>{CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
        <div><label className="block text-xs font-medium text-gray-600 mb-1">Read Time</label><input value={form.read_time} onChange={e => set('read_time', e.target.value)} placeholder="5 min read" className={inputCls} /></div>
      </div>
      <div><label className="block text-xs font-medium text-gray-600 mb-1">Tags (comma-separated)</label><input value={form.tags} onChange={e => set('tags', e.target.value)} placeholder="Surgery, Innovation, Cardiology" className={inputCls} /></div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Image URL</label>
        <input value={form.image_url} onChange={e => set('image_url', e.target.value)} className={`${inputCls} mb-2`} />
        <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium px-3 py-2 rounded-lg cursor-pointer w-fit">
          <FaUpload /> {uploading ? 'Uploading...' : 'Upload Image'}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="checkbox" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)} className="accent-amber-500" /> Featured post</label>
        <label className="flex items-center gap-2 cursor-pointer text-sm"><input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} className="accent-[#002D72]" /> Active</label>
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#002D72] rounded-lg disabled:opacity-60"><FaSave className="text-xs" /> {saving ? 'Saving...' : 'Save'}</button>
        <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
      </div>
    </div>
  )
}

export default BlogsList
