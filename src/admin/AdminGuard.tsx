import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

interface AdminGuardProps {
  children: React.ReactNode
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const [session, setSession] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading')

  useEffect(() => {
    // Allow demo login bypass
    if (sessionStorage.getItem('dmhca_demo_admin') === 'true') {
      setSession('authenticated')
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ? 'authenticated' : 'unauthenticated')
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ? 'authenticated' : 'unauthenticated')
    })

    return () => subscription.unsubscribe()
  }, [])

  if (session === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#002D72]" />
      </div>
    )
  }

  if (session === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />
  }

  return <>{children}</>
}

export default AdminGuard
