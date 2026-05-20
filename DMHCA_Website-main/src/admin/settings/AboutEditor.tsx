import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa'

const AboutEditor = () => {
  const [data, setData] = useState<any>({
    heroTitle: 'About DMHCA',
    heroSubtitle: '',
    missionTitle: 'Our Mission',
    missionText: '',
    visionTitle: 'Our Vision',
    visionText: '',
    stats: [{ number: '5000+', label: 'Students Trained' }],
    values: [{ title: 'Excellence', description: '' }]
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.from('site_settings').select('value').eq('key', 'about_page').single().then(({ data: d }) => {
      if (d?.value) setData(d.value)
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await supabase.from('site_settings').upsert([{ key: 'about_page', value: data, updated_at: new Date().toISOString() }], { onConflict: 'key' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const set = (field: string, value: any) => setData((p: any) => ({ ...p, [field]: value }))

  const updateStat = (i: number, field: string, v: string) => set('stats', data.stats.map((s: any, idx: number) => idx === i ? { ...s, [field]: v } : s))
  const addStat = () => set('stats', [...data.stats, { number: '', label: '' }])
  const removeStat = (i: number) => set('stats', data.stats.filter((_: any, idx: number) => idx !== i))

  const updateValue = (i: number, field: string, v: string) => set('values', data.values.map((v2: any, idx: number) => idx === i ? { ...v2, [field]: v } : v2))
  const addValue = () => set('values', [...data.values, { title: '', description: '' }])
  const removeValue = (i: number) => set('values', data.values.filter((_: any, idx: number) => idx !== i))

  const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]"
  const textareaCls = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72] resize-none"

  if (loading) return <div className="flex items-center justify-center h-40"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002D72]" /></div>

  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">About Page</h1>
        <p className="text-gray-500 text-sm">Edit the About page content</p>
      </div>

      {/* Hero */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-3">Page Header</h3>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Title</label><input value={data.heroTitle} onChange={e => set('heroTitle', e.target.value)} className={inputCls} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label><textarea rows={2} value={data.heroSubtitle} onChange={e => set('heroSubtitle', e.target.value)} className={textareaCls} /></div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-3">Mission & Vision</h3>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Mission Title</label><input value={data.missionTitle} onChange={e => set('missionTitle', e.target.value)} className={inputCls} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Mission Text</label><textarea rows={4} value={data.missionText} onChange={e => set('missionText', e.target.value)} className={textareaCls} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Vision Title</label><input value={data.visionTitle} onChange={e => set('visionTitle', e.target.value)} className={inputCls} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Vision Text</label><textarea rows={4} value={data.visionText} onChange={e => set('visionText', e.target.value)} className={textareaCls} /></div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-semibold text-gray-800">Stats</h3>
          <button onClick={addStat} className="flex items-center gap-1.5 text-sm text-[#002D72] hover:underline"><FaPlus className="text-xs" /> Add Stat</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.stats?.map((stat: any, i: number) => (
            <div key={i} className="flex gap-2 items-center">
              <div className="flex-1 space-y-1">
                <input value={stat.number} onChange={e => updateStat(i, 'number', e.target.value)} placeholder="5000+" className={inputCls} />
                <input value={stat.label} onChange={e => updateStat(i, 'label', e.target.value)} placeholder="Students Trained" className={inputCls} />
              </div>
              {data.stats.length > 1 && <button onClick={() => removeStat(i)} className="text-red-400 hover:text-red-600"><FaTrash className="text-xs" /></button>}
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-semibold text-gray-800">Core Values</h3>
          <button onClick={addValue} className="flex items-center gap-1.5 text-sm text-[#002D72] hover:underline"><FaPlus className="text-xs" /> Add Value</button>
        </div>
        {data.values?.map((val: any, i: number) => (
          <div key={i} className="border border-gray-200 rounded-lg p-3 space-y-2">
            <div className="flex gap-2">
              <input value={val.title} onChange={e => updateValue(i, 'title', e.target.value)} placeholder="Excellence" className={`${inputCls} flex-1`} />
              {data.values.length > 1 && <button onClick={() => removeValue(i)} className="text-red-400 hover:text-red-600"><FaTrash className="text-xs" /></button>}
            </div>
            <textarea rows={2} value={val.description} onChange={e => updateValue(i, 'description', e.target.value)} placeholder="Description..." className={textareaCls} />
          </div>
        ))}
      </div>

      <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#002D72] hover:bg-[#003a8c] rounded-lg disabled:opacity-60">
        <FaSave className="text-xs" /> {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}

export default AboutEditor
