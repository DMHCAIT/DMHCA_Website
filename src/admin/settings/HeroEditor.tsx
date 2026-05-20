import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { FaSave } from 'react-icons/fa'

const HeroEditor = () => {
  const [data, setData] = useState({ videoUrl: '', title: 'DMHCA', subtitle: 'DELHI MEDICAL HEALTH CARE ACADEMY' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.from('site_settings').select('value').eq('key', 'hero').single().then(({ data: d }) => {
      if (d?.value) setData(d.value as any)
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await supabase.from('site_settings').upsert([{ key: 'hero', value: data, updated_at: new Date().toISOString() }], { onConflict: 'key' })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]"

  if (loading) return <div className="flex items-center justify-center h-40"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002D72]" /></div>

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hero Section</h1>
        <p className="text-gray-500 text-sm">Edit the homepage hero video and text</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Background Video URL</label>
          <input value={data.videoUrl} onChange={e => setData(p => ({ ...p, videoUrl: e.target.value }))} placeholder="https://videos.pexels.com/..." className={inputCls} />
          <p className="text-xs text-gray-400 mt-1">Must be a direct .mp4 link. You can use Pexels, Supabase storage, or any CDN.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title (large text)</label>
          <input value={data.title} onChange={e => setData(p => ({ ...p, title: e.target.value }))} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle (small text below title)</label>
          <input value={data.subtitle} onChange={e => setData(p => ({ ...p, subtitle: e.target.value }))} className={inputCls} />
        </div>

        {/* Preview */}
        <div className="rounded-xl bg-black/80 p-6 text-center">
          <p className="text-white font-bold text-2xl tracking-widest">{data.title || 'DMHCA'}</p>
          <p className="text-white/70 text-xs tracking-widest uppercase mt-1">{data.subtitle}</p>
          <p className="text-white/40 text-xs mt-3">Preview (video plays on actual site)</p>
        </div>

        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#002D72] hover:bg-[#003a8c] rounded-lg disabled:opacity-60">
          <FaSave className="text-xs" /> {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export default HeroEditor
