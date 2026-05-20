import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { FaSave } from 'react-icons/fa'

const ContactEditor = () => {
  const [contact, setContact] = useState({ phone: '', email: '', address: '', businessHours: { weekdays: '', saturday: '', sunday: '' } })
  const [social, setSocial] = useState({ facebook: '', youtube: '', instagram: '', linkedin: '' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    Promise.all([
      supabase.from('site_settings').select('value').eq('key', 'contact_info').single(),
      supabase.from('site_settings').select('value').eq('key', 'social_links').single()
    ]).then(([{ data: c }, { data: s }]) => {
      if (c?.value) setContact(c.value as any)
      if (s?.value) setSocial(s.value as any)
      setLoading(false)
    })
  }, [])

  const handleSave = async () => {
    setSaving(true)
    await Promise.all([
      supabase.from('site_settings').upsert([{ key: 'contact_info', value: contact, updated_at: new Date().toISOString() }], { onConflict: 'key' }),
      supabase.from('site_settings').upsert([{ key: 'social_links', value: social, updated_at: new Date().toISOString() }], { onConflict: 'key' })
    ])
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const inputCls = "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72]"

  if (loading) return <div className="flex items-center justify-center h-40"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002D72]" /></div>

  return (
    <div className="max-w-2xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Contact Info & Social Media</h1>
        <p className="text-gray-500 text-sm">Appears in footer, contact page, and throughout the site</p>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-3">Contact Information</h3>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label><input value={contact.phone} onChange={e => setContact(p => ({ ...p, phone: e.target.value }))} placeholder="+91 7042011441" className={inputCls} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label><input type="email" value={contact.email} onChange={e => setContact(p => ({ ...p, email: e.target.value }))} placeholder="info@dmhca.in" className={inputCls} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Address</label><textarea rows={2} value={contact.address} onChange={e => setContact(p => ({ ...p, address: e.target.value }))} className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#002D72] resize-none" /></div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Business Hours</label>
          <input value={contact.businessHours.weekdays} onChange={e => setContact(p => ({ ...p, businessHours: { ...p.businessHours, weekdays: e.target.value } }))} placeholder="Mon - Fri: 9:00 AM - 6:00 PM" className={inputCls} />
          <input value={contact.businessHours.saturday} onChange={e => setContact(p => ({ ...p, businessHours: { ...p.businessHours, saturday: e.target.value } }))} placeholder="Sat: 9:00 AM - 2:00 PM" className={inputCls} />
          <input value={contact.businessHours.sunday} onChange={e => setContact(p => ({ ...p, businessHours: { ...p.businessHours, sunday: e.target.value } }))} placeholder="Sun: Closed" className={inputCls} />
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="font-semibold text-gray-800 border-b pb-3">Social Media Links</h3>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label><input value={social.facebook} onChange={e => setSocial(p => ({ ...p, facebook: e.target.value }))} placeholder="https://www.facebook.com/dmhca.in" className={inputCls} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">YouTube URL</label><input value={social.youtube} onChange={e => setSocial(p => ({ ...p, youtube: e.target.value }))} placeholder="https://www.youtube.com/@dmhca" className={inputCls} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">Instagram URL</label><input value={social.instagram} onChange={e => setSocial(p => ({ ...p, instagram: e.target.value }))} placeholder="https://www.instagram.com/dmhca_official/" className={inputCls} /></div>
        <div><label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label><input value={social.linkedin} onChange={e => setSocial(p => ({ ...p, linkedin: e.target.value }))} placeholder="https://www.linkedin.com/company/dmhca/" className={inputCls} /></div>
      </div>

      <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#002D72] hover:bg-[#003a8c] rounded-lg disabled:opacity-60">
        <FaSave className="text-xs" /> {saved ? 'Saved!' : saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  )
}

export default ContactEditor
