import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiMenu, FiX, FiSearch, FiCalendar } from 'react-icons/fi'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 100)
      
      // Close panels when scrolling
      if (scrollPosition > 100) {
        setIsMenuOpen(false)
        setIsSearchOpen(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', path: '/', isSection: true, sectionId: 'hero' },
    { name: 'Courses', path: '/top-medical-courses', isSection: false },
    { name: 'Events', path: '/events', isSection: false },
    { name: 'Blogs', path: '/blogs', isSection: false },
    { name: 'Contact', path: '/contact-us', isSection: false },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNavClick = (item: any) => {
    if (item.isSection) {
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          if (item.sectionId === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          } else {
            scrollToSection(item.sectionId)
          }
        }, 100)
      } else {
        if (item.sectionId === 'hero') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          scrollToSection(item.sectionId)
        }
      }
    } else {
      navigate(item.path)
    }
    setIsMenuOpen(false)
  }

  const isActive = (item: any) => {
    if (item.isSection) {
      return location.pathname === '/' && location.hash === `#${item.sectionId}`
    }
    return location.pathname === item.path
  }

  return (
    <>
      {/* Top Header Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              to="/" 
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
              className="flex items-center space-x-3"
            >
              <div className="flex items-center">
                <span className="text-[#002D72] font-bold text-sm sm:text-base tracking-wider">DMHCA</span>
                <span className="mx-2 sm:mx-3 text-gray-400 hidden sm:inline">|</span>
                <span className="text-[#002D72] font-normal text-xs sm:text-sm hidden sm:inline">EST. 2000</span>
                <span className="mx-2 sm:mx-3 text-gray-400 hidden lg:inline">|</span>
                <span className="text-[#002D72] font-normal text-xs sm:text-sm hidden lg:inline">DELHI MEDICAL HEALTH CARE ACADEMY</span>
              </div>
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden bg-[#002D72] text-white p-2 rounded-lg hover:bg-[#003d92] transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Vertical Right Side Menu (JHU Style) - Hidden on Mobile */}
      <div 
        className={`hidden md:flex fixed top-32 z-50 flex-col transition-all duration-300 ease-in-out ${
          isMenuOpen || isSearchOpen ? 'right-[280px] sm:right-[320px]' : 'right-0'
        }`}
      >
        {/* MENU Button - Always visible */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`bg-[#002D72] text-white px-6 py-4 font-bold text-sm uppercase tracking-wider hover:bg-[#003d92] transition-all duration-300 flex items-center gap-3 border-b border-white/10 rounded-l-lg shadow-lg ${
            isScrolled ? 'w-16 justify-center' : 'w-52'
          }`}
        >
          {isMenuOpen ? <FiX size={25} /> : <FiMenu size={25} />}
          {!isScrolled && 'MENU'}
        </button>

        {/* Other buttons - Hidden when scrolled or not on home page */}
        {!isScrolled && location.pathname === '/' && (
          <>
            <div className="h-2 bg-transparent"></div>

            {/* SEARCH Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="bg-[#002D72] text-white w-52 px-6 py-4 font-bold text-sm uppercase tracking-wider hover:bg-[#003d92] transition-all duration-300 flex items-center gap-3 border-b border-white/10 rounded-l-lg shadow-lg"
            >
              <FiSearch size={25} />
              SEARCH
            </button>
            <div className="h-2 bg-transparent"></div>

            {/* NEWS & EVENTS Button */}
            <Link
              to="/events"
              className="bg-[#002D72] text-white w-52 px-6 py-4 font-bold text-sm uppercase tracking-wider hover:bg-[#003d92] transition-all duration-300 flex items-center gap-3 rounded-l-lg shadow-lg"
            >
              <FiCalendar size={25} />
              NEWS & EVENTS
            </Link>

            {/* Spacing Between Sections */}
            <div className="h-3 bg-transparent"></div>

            {/* APPLY Button */}
            <Link
              to="/apply"
              className="bg-white text-[#002D72] w-40 px-6 py-4 ml-auto font-bold text-sm uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 border-b border-gray-200 flex items-center justify-center rounded-l-lg shadow-lg border-l-4 border-l-[#002D72]"
            >
              APPLY
            </Link>
            <div className="h-2 bg-transparent"></div>

            {/* VISIT Button */}
            <Link
              to="/contact-us"
              className="bg-white text-[#002D72] w-40 px-6 py-4  ml-auto font-bold text-sm uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 border-b border-gray-200 flex items-center justify-center rounded-l-lg shadow-lg border-l-4 border-l-[#002D72]"
            >
              VISIT
            </Link>
            <div className="h-2 bg-transparent"></div>

            {/* SEE PROGRAMS Button */}
            <Link
              to="/top-medical-courses"
              className="bg-white text-[#002D72] w-40 px-6 py-4  ml-auto font-bold text-sm uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 flex items-center justify-center rounded-l-lg shadow-lg border-l-4 border-l-[#002D72]"
            >
              SEE PROGRAMS
            </Link>
          </>
        )}
      </div>

      {/* Slide-out Menu Panel */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-[85%] sm:w-80 bg-white shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              {/* Close button */}
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-[#002D72]">Menu</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-600 hover:text-[#002D72] transition-colors"
                  aria-label="Close menu"
                >
                  <FiX size={28} />
                </button>
              </div>
              
              {/* Navigation Items */}
              <div className="space-y-3 sm:space-y-4 mb-8">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item)}
                    className={`block w-full text-left px-4 py-3 font-medium transition-colors text-base sm:text-lg ${
                      isActive(item) 
                        ? 'text-[#68ACE5] bg-blue-50 rounded-lg' 
                        : 'text-gray-700 hover:text-[#002D72] hover:bg-gray-50 rounded-lg'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              
              {/* Mobile Quick Actions */}
              <div className="md:hidden space-y-3 pt-6 border-t border-gray-200">
                <Link
                  to="/apply"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full bg-[#002D72] text-white px-6 py-4 font-bold text-sm uppercase tracking-wider hover:bg-[#003d92] transition-all duration-300 text-center rounded-lg"
                >
                  Apply
                </Link>
                <Link
                  to="/top-medical-courses"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full bg-white text-[#002D72] px-6 py-4 font-bold text-sm uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 text-center rounded-lg border-2 border-[#002D72]"
                >
                  See Programs
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    setIsSearchOpen(true)
                  }}
                  className="w-full bg-white text-[#002D72] px-6 py-4 font-bold text-sm uppercase tracking-wider hover:bg-gray-100 transition-all duration-300 text-center rounded-lg border-2 border-[#002D72] flex items-center justify-center gap-2"
                >
                  <FiSearch size={18} />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Panel */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsSearchOpen(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-[85%] sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#002D72]">Search</h2>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-gray-600 hover:text-[#002D72] transition-colors"
                  aria-label="Close search"
                >
                  <FiX size={28} />
                </button>
              </div>
              <input
                type="text"
                placeholder="Search DMHCA..."
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#68ACE5] focus:outline-none text-gray-700"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar