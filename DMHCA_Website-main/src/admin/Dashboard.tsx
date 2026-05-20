import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { FaBook, FaStar, FaCalendarAlt, FaClipboardList, FaBlog, FaHandshake, FaArrowRight } from 'react-icons/fa'

interface Stats {
  courses: number
  testimonials: number
  events: number
  blogs: number
  partners: number
  applications: number
  newApplications: number
}

const Dashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentApplications, setRecentApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const [
        { count: courses },
        { count: testimonials },
        { count: events },
        { count: blogs },
        { count: partners },
        { count: applications },
        { count: newApplications },
        { data: recent },
      ] = await Promise.all([
        supabase.from('courses').select('*', { count: 'exact', head: true }),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('events').select('*', { count: 'exact', head: true }),
        supabase.from('blogs').select('*', { count: 'exact', head: true }),
        supabase.from('partners').select('*', { count: 'exact', head: true }),
        supabase.from('applications').select('*', { count: 'exact', head: true }),
        supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'new'),
        supabase.from('applications').select('*').order('created_at', { ascending: false }).limit(5),
      ])
      setStats({ courses: courses ?? 0, testimonials: testimonials ?? 0, events: events ?? 0, blogs: blogs ?? 0, partners: partners ?? 0, applications: applications ?? 0, newApplications: newApplications ?? 0 })
      setRecentApplications(recent ?? [])
      setLoading(false)
    }
    fetchStats()
  }, [])

  const cards = [
    { label: 'Total Courses', value: stats?.courses ?? '—', icon: <FaBook />, color: 'bg-blue-500', link: '/admin/courses' },
    { label: 'Testimonials', value: stats?.testimonials ?? '—', icon: <FaStar />, color: 'bg-amber-500', link: '/admin/testimonials' },
    { label: 'Events', value: stats?.events ?? '—', icon: <FaCalendarAlt />, color: 'bg-green-500', link: '/admin/events' },
    { label: 'Blog Posts', value: stats?.blogs ?? '—', icon: <FaBlog />, color: 'bg-purple-500', link: '/admin/blogs' },
    { label: 'Partners', value: stats?.partners ?? '—', icon: <FaHandshake />, color: 'bg-teal-500', link: '/admin/partners' },
    { label: 'Applications', value: stats?.applications ?? '—', icon: <FaClipboardList />, color: 'bg-red-500', link: '/admin/applications', badge: stats?.newApplications },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#002D72]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your DMHCA website content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {cards.map(card => (
          <Link
            key={card.label}
            to={card.link}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 ${card.color} rounded-lg flex items-center justify-center text-white text-base`}>
                {card.icon}
              </div>
              {card.badge ? (
                <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full">{card.badge} new</span>
              ) : null}
            </div>
            <div className="text-2xl font-bold text-gray-900">{card.value}</div>
            <div className="text-xs text-gray-500 mt-1 group-hover:text-[#002D72] transition-colors">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-gray-800">Recent Applications</h3>
            <Link to="/admin/applications" className="text-xs text-[#002D72] hover:underline flex items-center gap-1">
              View all <FaArrowRight className="text-xs" />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentApplications.length === 0 ? (
              <p className="text-gray-400 text-sm p-5 text-center">No applications yet</p>
            ) : recentApplications.map(app => (
              <div key={app.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">{app.name}</p>
                  <p className="text-xs text-gray-500">{app.email} · {app.form_type}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  app.status === 'new' ? 'bg-blue-100 text-blue-700' :
                  app.status === 'reviewed' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Quick Actions</h3>
          </div>
          <div className="p-5 grid grid-cols-2 gap-3">
            {[
              { to: '/admin/courses/new', label: 'Add Course', icon: <FaBook /> },
              { to: '/admin/testimonials/new', label: 'Add Testimonial', icon: <FaStar /> },
              { to: '/admin/events/new', label: 'Add Event', icon: <FaCalendarAlt /> },
              { to: '/admin/blogs/new', label: 'Add Blog', icon: <FaBlog /> },
              { to: '/admin/partners/new', label: 'Add Partner', icon: <FaHandshake /> },
              { to: '/admin/media', label: 'Upload Media', icon: <FaClipboardList /> },
            ].map(action => (
              <Link
                key={action.to}
                to={action.to}
                className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-[#002D72] hover:text-white text-gray-700 rounded-lg text-sm font-medium transition-all duration-150 group"
              >
                <span className="text-[#002D72] group-hover:text-white text-base">{action.icon}</span>
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
