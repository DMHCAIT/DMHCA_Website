import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const DEMO_EMAIL = 'demo@dmhca.in'
  const DEMO_PASSWORD = 'demo123'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Demo mode bypass — works without Supabase credentials
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      sessionStorage.setItem('dmhca_demo_admin', 'true')
      setLoading(false)
      navigate('/admin')
      return
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      navigate('/admin')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#002D72] to-[#3D5A82]">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#002D72] to-[#3D5A82] p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-2xl">D</span>
          </div>
          <h1 className="text-2xl font-bold text-white">DMHCA Admin</h1>
          <p className="text-white/70 text-sm mt-1">Sign in to manage your website</p>
        </div>

        {/* Demo Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-4 text-center">
          <p className="text-xs text-amber-700 font-semibold mb-1">🔐 Demo Mode</p>
          <p className="text-xs text-amber-600 mb-2">
            Email: <strong>demo@dmhca.in</strong> &nbsp;|&nbsp; Password: <strong>demo123</strong>
          </p>
          <button
            type="button"
            onClick={() => { setEmail('demo@dmhca.in'); setPassword('demo123') }}
            className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors"
          >
            Click to Auto-Fill & Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@dmhca.in"
                className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002D72] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 text-sm" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#002D72] focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#002D72] hover:bg-[#003a8c] disabled:opacity-60 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-xs text-gray-400 mt-4">
            Admin access only. Create your account in Supabase Dashboard → Authentication → Users
          </p>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
