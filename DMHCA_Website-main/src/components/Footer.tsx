import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { supabase } from '../lib/supabase'

const Footer = () => {
  const [contactInfo, setContactInfo] = useState<{ phone: string; email: string; address: string } | null>(null)
  const [socialLinks, setSocialLinks] = useState<{ facebook?: string; youtube?: string; instagram?: string; linkedin?: string } | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await supabase.from('site_settings').select('key,value').in('key', ['contact_info', 'social_links'])
        if (data && data.length > 0) {
          const ci = data.find(r => r.key === 'contact_info')
          const sl = data.find(r => r.key === 'social_links')
          if (ci?.value) setContactInfo(typeof ci.value === 'string' ? JSON.parse(ci.value) : ci.value)
          if (sl?.value) setSocialLinks(typeof sl.value === 'string' ? JSON.parse(sl.value) : sl.value)
        }
      } catch (_) {}
    })()
  }, [])

  const phone = contactInfo?.phone ?? '+91 7042011441'
  const email = contactInfo?.email ?? 'info@dmhca.in'
  const address = contactInfo?.address ?? 'Delhi Medical Health Care Academy, New Delhi, India'
  const fbUrl = socialLinks?.facebook ?? 'https://www.facebook.com/dmhca.in'
  const ytUrl = socialLinks?.youtube ?? 'https://www.youtube.com/@dmhca'
  const igUrl = socialLinks?.instagram ?? 'https://www.instagram.com/dmhca_official/'
  const liUrl = socialLinks?.linkedin ?? 'https://www.linkedin.com/company/dmhca/'
  const quickLinks = [
    { name: 'About Us', path: '/about-dmhca' },
    { name: 'Courses', path: '/top-medical-courses' },
    { name: 'Events', path: '/events' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Contact', path: '/contact-us' },
  ]

  const courses = [
    { name: 'Fellowship Programs', path: '/top-medical-courses' },
    { name: 'Diploma Courses', path: '/top-medical-courses' },
  ]

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-[#4D6A92] via-[#3D5A82] to-[#4D6A92] text-white z-30 border-t-4 border-jhu-gold">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-jhu-gold rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-jhu-dark font-bold text-lg font-sora">D</span>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-sora">DMHCA</h3>
                <p className="text-xs sm:text-sm text jhu-gold">Delhi Medical Healthcare Academy</p>
              </div>
            </div>
            <p className="text-gray-200 leading-relaxed text-sm">
              Empowering healthcare professionals with world-class medical education 
              and training programs.
            </p>
            <div className="flex space-x-4">
              <a href={fbUrl} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <FaFacebook size={18} />
              </a>
              <a href={ytUrl} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <FaTwitter size={18} />
              </a>
              <a href={igUrl} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href={liUrl} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-base sm:text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-sm text-gray-200 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div className="space-y-3">
            <h4 className="text-base sm:text-lg font-semibold">Our Courses</h4>
            <ul className="space-y-2">
              {courses.map((course) => (
                <li key={course.name}>
                  <Link 
                    to={course.path} 
                    className="text-sm text-gray-200 hover:text-white transition-colors"
                  >
                    {course.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="text-base sm:text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-jhu-gold flex-shrink-0 text-sm mt-1" />
                <span className="text-gray-200 text-xs sm:text-sm">
                  {address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-jhu-gold flex-shrink-0 text-sm" />
                <span className="text-gray-200 text-xs sm:text-sm">{phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-jhu-gold flex-shrink-0 text-sm" />
                <span className="text-gray-200 text-xs sm:text-sm break-all">{email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-jhu-gold/30 mt-6 sm:mt-8 pt-4 sm:pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-xs sm:text-sm text-center md:text-left">
              © 2026 DMHCA - Digital Medical & Healthcare Academy. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
              <Link to="#" className="text-gray-200 hover:text-white text-xs sm:text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-200 hover:text-white text-xs sm:text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-gray-200 hover:text-white text-xs sm:text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer