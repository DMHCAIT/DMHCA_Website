import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import {
  FaHome, FaBook, FaCalendarAlt, FaBlog, FaHandshake,
  FaCog, FaImage, FaClipboardList, FaBars, FaSignOutAlt,
  FaGlobe, FaInfoCircle, FaStar, FaDatabase
} from 'react-icons/fa'

const navItems = [
  { to: '/admin', icon: <FaHome />, label: 'Dashboard', end: true },
  { to: '/admin/courses', icon: <FaBook />, label: 'Courses' },
  { to: '/admin/testimonials', icon: <FaStar />, label: 'Testimonials' },
  { to: '/admin/events', icon: <FaCalendarAlt />, label: 'Events' },
  { to: '/admin/blogs', icon: <FaBlog />, label: 'Blogs' },
  { to: '/admin/partners', icon: <FaHandshake />, label: 'Partners' },
  { to: '/admin/applications', icon: <FaClipboardList />, label: 'Applications' },
  { to: '/admin/media', icon: <FaImage />, label: 'Media Library' },
  { divider: true },
  { to: '/admin/settings/hero', icon: <FaGlobe />, label: 'Hero Section' },
  { to: '/admin/settings/about', icon: <FaInfoCircle />, label: 'About Page' },
  { to: '/admin/settings/contact', icon: <FaCog />, label: 'Contact & Social' },
  { divider: true },
  { to: '/admin/seed', icon: <FaDatabase />, label: 'Seed Database' },
]

const AdminLayout = () => {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    sessionStorage.removeItem('dmhca_demo_admin')
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-400 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-[#002D72] font-bold text-lg">D</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-none">DMHCA</div>
            <div className="text-white/50 text-xs mt-0.5">Admin Panel</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto space-y-0.5">
        {navItems.map((item, i) => {
          if ('divider' in item) {
            return <div key={i} className="border-t border-white/10 my-3" />
          }
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${isActive
                  ? 'bg-amber-400 text-[#002D72]'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-red-500/20 transition-all duration-150"
        >
          <FaSignOutAlt className="text-base" />
          Sign Out
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 flex-shrink-0 bg-[#002D72] flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-[#002D72] flex flex-col z-10">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center justify-between flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <FaBars className="text-xl" />
          </button>
          <div className="hidden lg:block">
            <h2 className="text-gray-800 font-semibold text-base">DMHCA Website Manager</h2>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#002D72] hover:underline font-medium"
            >
              <FaGlobe className="text-xs" />
              View Website
            </a>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
