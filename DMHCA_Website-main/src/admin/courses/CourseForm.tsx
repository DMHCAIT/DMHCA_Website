import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { FaArrowLeft, FaSave, FaUpload } from 'react-icons/fa'

const CATEGORIES = [
  'Radiology', 'Cardiology', 'Neurology', 'Oncology', 'Orthopedics',
  'Obs & Gynae', 'Pediatrics', 'Dermatology', 'Gastroenterology',
  'Urology', 'Endocrinology', 'Reproductive', 'Emergency', 'General Surgery',
  'Medicine', 'Dental', 'Nutrition', 'Psychology', 'Other'
]
const PROGRAM_TYPES = ['fellowship', 'pg-diploma', 'certificate']
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert']

const defaultForm = {
  title: '', category: 'Radiology', program_type: 'fellowship',
  duration: '', lessons: 0, level: 'Expert', rating: 5.0, reviews: 0,
  enrolled: 0, price: '', image_url: '', description: '',
  is_featured: false, is_active: true, display_order: 0
}

const CourseForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEdit = !!id

  const [form, setForm] = useState(defaultForm)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    setLoading(true)
    supabase.from('courses').select('*').eq('id', id).single().then(({ data }) => {
      if (data) setForm({ ...defaultForm, ...data })
      setLoading(false)
    })
  }, [id])

  const set = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }))

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `courses/${Date.now()}.${ext}`
    const { error: uploadError } = await supabase.storage.from('images').upload(path, file, { upsert: true })
    if (uploadError) { setError(uploadError.message); setUploading(false); return }
    const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(path)
    set('image_url', publicUrl)
    setUploading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const payload = { ...form, rating: Number(form.rating), lessons: Number(form.lessons), reviews: Number(form.reviews), enrolled: Number(form.enrolled), display_order: Number(form.display_order), updated_at: new Date().toISOString() }

    let courseId = id ? Number(id) : null
    if (isEdit) {
      const { error } = await supabase.from('courses').update(payload).eq('id', id)
      if (error) { setError(error.message); setSaving(false); return }
    } else {
      const { data, error } = await supabase.from('courses').insert([payload]).select().single()
      if (error) { setError(error.message); setSaving(false); return }
      courseId = data.id
      // Create empty course_details entry
      await supabase.from('course_details').insert([{ course_id: courseId }])
    }

    setSaving(false)
    navigate(`/admin/courses/${courseId}/details`)
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002D72]" /></div>

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate('/admin/courses')} className="text-gray-500 hover:text-gray-700 p-1">
          <FaArrowLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Course' : 'Add New Course'}</h1>
          <p className="text-gray-500 text-sm">{isEdit ? 'Update course information' : 'Fill basic course info — you can add detailed content next'}</p>
        </div>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-sm">{error}</div>}

      <form onSubmit={handleSave} className="space-y-5">
        {/* Basic Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
          <h3 className="font-semibold text-gray-800 border-b pb-3">Basic Information</h3>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course Title *</label>
            <input required value={form.title} onChange={e => set('title', e.target.value)} placeholder="Fellowship In Abdominal Imaging" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Program Type *</label>
              <select value={form.program_type} onChange={e => set('program_type', e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]">
                {PROGRAM_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select value={form.category} onChange={e => set('category', e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
              <input value={form.duration} onChange={e => set('duration', e.target.value)} placeholder="25 Week" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lessons</label>
              <input type="number" min={0} value={form.lessons} onChange={e => set('lessons', e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select value={form.level} onChange={e => set('level', e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]">
                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
              <input value={form.price} onChange={e => set('price', e.target.value)} placeholder="₹1,10,000.00" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
              <input type="number" min={0} max={5} step={0.1} value={form.rating} onChange={e => set('rating', e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reviews Count</label>
              <input type="number" min={0} value={form.reviews} onChange={e => set('reviews', e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
            <textarea rows={2} value={form.description} onChange={e => set('description', e.target.value)} placeholder="One-line description shown on course cards" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72] resize-none" />
          </div>
        </div>

        {/* Image */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h3 className="font-semibold text-gray-800 border-b pb-3">Course Image</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input value={form.image_url} onChange={e => set('image_url', e.target.value)} placeholder="https://... or upload below" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]" />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2.5 rounded-lg cursor-pointer transition-colors">
              <FaUpload className="text-xs" />
              {uploading ? 'Uploading...' : 'Upload Image'}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
            {form.image_url && <img src={form.image_url} alt="Preview" className="w-20 h-14 object-cover rounded-lg border border-gray-200" />}
          </div>
        </div>

        {/* Flags */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-gray-800 border-b pb-3 mb-4">Settings</h3>
          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_active} onChange={e => set('is_active', e.target.checked)} className="w-4 h-4 accent-[#002D72]" />
              <span className="text-sm text-gray-700">Active (visible on website)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)} className="w-4 h-4 accent-amber-500" />
              <span className="text-sm text-gray-700">Featured on homepage</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button type="button" onClick={() => navigate('/admin/courses')} className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#002D72] hover:bg-[#003a8c] rounded-lg transition-colors disabled:opacity-60">
            <FaSave className="text-xs" />
            {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Create & Add Details →'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CourseForm
