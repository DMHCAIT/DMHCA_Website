import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaUser, FaArrowLeft } from 'react-icons/fa'
import { supabase } from '../lib/supabase'

const Contact = () => {
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiry_type: 'general'
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await supabase.from('applications').insert([{
        form_type: 'contact',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
        status: 'new'
      }])
    } catch (_) {
      // silently continue even if Supabase not configured
    }
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      inquiry_type: 'general'
    })
  }

  const contactInfo = [
    {
      icon: <FaPhone className="text-2xl text-slate-500" />,
      title: 'Phone',
      details: ['+91 7042011441'],
      description: 'Call us during business hours for immediate assistance'
    },
    {
      icon: <FaEnvelope className="text-2xl text-slate-500" />,
      title: 'Email',
      details: ['info@dmhca.in'],
      description: 'Send us an email and we\'ll respond within 24 hours'
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-slate-500" />,
      title: 'Address',
      details: ['Delhi Medical Health Care Academy', 'New Delhi, India'],
      description: 'Visit our campus for in-person consultations'
    },
    {
      icon: <FaClock className="text-2xl text-slate-500" />,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 9:00 AM - 2:00 PM', 'Sun: Closed'],
      description: 'We\'re available during these hours for all inquiries'
    }
  ]

  const offices = [
    {
      city: 'New Delhi (Main Office)',
      address: 'Delhi Medical Health Care Academy, New Delhi, India',
      phone: '+91 7042011441',
      email: 'info@dmhca.in'
    }
  ]

  return (
    <div style={{ background: 'linear-gradient(135deg, #8FB6D4, #7FA9C9, #6E9BBF)' }}>
      {/* Back Arrow Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-20 left-4 sm:left-6 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-300 group shadow-lg hover:shadow-xl border border-white/20"
        title="Go Back"
      >
        <FaArrowLeft className="text-base sm:text-lg group-hover:-translate-x-0.5 transition-transform duration-300" />
      </button>
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 sm:pt-40 sm:pb-20 md:pt-44 md:pb-24 text-white bg-gradient-to-br from-[#4D6A92] via-[#3D5A82] to-[#4D6A92]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block mb-4">
            <span className="bg-jhu-gold/20 text-jhu-gold px-4 py-2 rounded-full text-sm font-semibold border border-jhu-gold/30">
              24/7 Support Available
            </span>
          </div>
          <h1 className="font-sora text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Get in <span className="text-jhu-gold">Touch</span>
          </h1>
          <p className="font-inter text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed text-white/90 mb-8">
            Have questions about our programs? We're here to help you start your journey in medical excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-2 h-2 bg-jhu-gold rounded-full"></div>
              <span>Response within 24 hours</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-2 h-2 bg-jhu-gold rounded-full"></div>
              <span>Expert counselors</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-2 h-2 bg-jhu-gold rounded-full"></div>
              <span>Free consultation</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section - All content in one section */}
      <section className="py-16 sm:py-20 relative z-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">
          
          {/* Contact Information Cards */}
          <div>
            <div className="text-center mb-12">
              <h2 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                How to <span className="text-jhu-gold">Reach Us</span>
              </h2>
              <p className="font-inter text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                Multiple ways to connect with our admission counselors
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="group bg-white rounded-2xl p-6 text-center hover:bg-gray-50 hover:scale-105 transition-all duration-300 border border-gray-200 shadow-xl hover:shadow-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-jhu-gold to-jhu-gold/80 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {info.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{info.title}</h3>
                <div className="mb-3 space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-sm text-gray-700 font-medium">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
            </div>
          </div>

          {/* Contact Form and Map */}
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xl flex flex-col h-[780px]">
              <h2 className="font-sora text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Send us a <span className="text-jhu-gold">Message</span>
              </h2>
              <p className="text-gray-600 mb-4">Fill out the form below and we'll get back to you shortly</p>
              
              <div className="flex-1 overflow-y-auto pr-2">
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-jhu-gold" />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-jhu-gold focus:border-transparent placeholder-gray-400"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-jhu-gold" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-jhu-gold focus:border-transparent placeholder-gray-400"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-jhu-gold" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-jhu-gold focus:border-transparent placeholder-gray-400"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="inquiry_type" className="block text-sm font-semibold text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiry_type"
                      name="inquiry_type"
                      value={formData.inquiry_type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-jhu-gold focus:border-transparent"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="admissions">Admissions</option>
                      <option value="courses">Course Information</option>
                      <option value="fees">Fees & Payment</option>
                      <option value="placement">Placement Assistance</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-jhu-gold focus:border-transparent placeholder-gray-400"
                    placeholder="Enter message subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-jhu-gold focus:border-transparent resize-none placeholder-gray-400"
                    placeholder="Enter your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-jhu-spirit-blue to-jhu-gold text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <FaEnvelope />
                  Send Message
                </button>
                
                <p className="text-center text-sm text-gray-600">
                  We typically respond within 24 hours during business days
                </p>
              </form>
              </div>
            </div>

            {/* Map and Additional Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xl h-[780px] flex flex-col">
                <h2 className="font-sora text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  Find <span className="text-jhu-gold">Us</span>
                </h2>
                <p className="text-gray-600 mb-4">Visit our campus for a personal consultation</p>
                
                {/* Map Placeholder */}
                <div className="bg-gradient-to-br from-jhu-gold/20 to-jhu-spirit-blue/20 backdrop-blur-sm rounded-2xl h-48 mb-4 flex items-center justify-center border border-jhu-gold/30 shadow-inner">
                  <div className="text-white text-center p-4">
                    <div className="w-12 h-12 bg-jhu-gold/30 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaMapMarkerAlt className="text-3xl text-jhu-gold" />
                    </div>
                    <p className="text-base font-bold">Interactive Map</p>
                    <p className="text-xs text-white/80">DMHCA Main Campus</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="w-12 h-12 bg-jhu-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="text-jhu-gold text-xl" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg mb-1">Main Campus</p>
                      <p className="text-gray-700">DMHCA Campus, Medical District</p>
                      <p className="text-gray-700">Delhi,India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="w-12 h-12 bg-jhu-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FaClock className="text-jhu-gold text-xl" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg mb-1">Visiting Hours</p>
                      <p className="text-gray-700">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-700">Saturday: 9:00 AM - 2:00 PM</p>
                      <p className="text-gray-600 text-sm mt-2">Sunday: Closed</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-jhu-gold/20 to-jhu-spirit-blue/20 backdrop-blur-sm p-5 rounded-xl border border-jhu-gold/30">
                    <div className="flex items-start gap-3">
                      <div className="text-jhu-gold text-xl mt-1">💡</div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        <strong className="text-jhu-gold">Pro Tip:</strong> We recommend scheduling an appointment before visiting 
                        to ensure our counselors are available to assist you with personalized guidance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Office Locations */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">Our <span className="text-jhu-gold">Offices</span></h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                DMHCA has multiple locations across India to better serve our students and partners
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offices.map((office, index) => (
                <div key={index} className="group bg-white rounded-2xl p-6 hover:bg-gray-50 hover:-translate-y-2 transition-all duration-300 border border-gray-200 shadow-xl hover:shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-jhu-gold/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt className="text-jhu-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{office.city}</h3>
                </div>
                <div className="space-y-3 pl-1">
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-jhu-gold/60 mt-1 text-xs flex-shrink-0" />
                    <p className="text-sm text-gray-700 leading-relaxed">{office.address}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaPhone className="text-jhu-gold/60 text-xs" />
                    <p className="text-sm text-gray-700">{office.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaEnvelope className="text-jhu-gold/60 text-xs" />
                    <p className="text-sm text-gray-700">{office.email}</p>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Contact