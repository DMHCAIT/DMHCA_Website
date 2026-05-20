import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { Component, ReactNode } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingIcons from './components/FloatingIcons'
import ScrollToTop from './components/ScrollToTop'
import AppRoutes from './routes/AppRoutes'

class ErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state = { error: null }
  static getDerivedStateFromError(error: Error) { return { error } }
  render() {
    if (this.state.error) {
      const err = this.state.error as Error
      return (
        <div style={{ padding: 40, fontFamily: 'monospace', background: '#1a1a2e', color: '#e94560', minHeight: '100vh' }}>
          <h1 style={{ fontSize: 24, marginBottom: 16 }}>⚠️ App crashed — check console</h1>
          <pre style={{ background: '#16213e', padding: 20, borderRadius: 8, color: '#f5f5f5', overflow: 'auto' }}>
            {err.message}{'\n\n'}{err.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

function AppContent() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #8FB6D4, #7FA9C9, #6E9BBF)' }}>
      {!isAdmin && <Navbar />}
      <main>
        <AppRoutes />
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <FloatingIcons />}
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </ErrorBoundary>
  )
}

export default App
