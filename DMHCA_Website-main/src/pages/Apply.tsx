import { useEffect, useState } from 'react'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { 
  FaUserMd, 
  FaGraduationCap, 
  FaFileAlt, 
  FaCalendarCheck,
  FaCheckCircle,
  FaPhone,
  FaEnvelope,
  FaCertificate,
  FaStethoscope,
  FaHeart,
  FaBrain,
  FaBaby,
  FaArrowLeft
} from 'react-icons/fa'

const Apply = () => {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    qualification: '',
    yearOfPassing: '',
    experience: '',
    currentInstitution: '',
    programCategory: '',
    program: '',
    eventSelection: '',
    statement: ''
  })
  
  const [selectedCategory, setSelectedCategory] = useState('')

  // Events data structure
  const eventsData = [
    {
      id: 1,
      title: 'Annual Medical Conference 2024',
      date: '2024-03-15',
      time: '09:00 AM',
      location: 'New Delhi Convention Center',
      category: 'conference',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Cardiology Workshop: Advanced ECG Interpretation',
      date: '2024-02-28',
      time: '02:00 PM',
      location: 'DMHCA Campus, Mumbai',
      category: 'workshop',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Pediatric Medicine Symposium',
      date: '2024-04-10',
      time: '10:00 AM',
      location: 'Bangalore Medical Institute',
      category: 'symposium',
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'Emergency Medicine Masterclass',
      date: '2024-02-20',
      time: '09:00 AM',
      location: 'Chennai Medical College',
      category: 'masterclass',
      status: 'upcoming'
    },
    {
      id: 5,
      title: 'Mental Health Awareness Webinar',
      date: '2024-01-15',
      time: '07:00 PM',
      location: 'Online Event',
      category: 'webinar',
      status: 'past'
    },
    {
      id: 6,
      title: 'Surgical Techniques Innovation Forum',
      date: '2023-12-18',
      time: '11:00 AM',
      location: 'Hyderabad Medical Hub',
      category: 'forum',
      status: 'past'
    }
  ]

  // Programs data structure
  const programsData = {
    pgCourses: {
      title: 'PG Courses',
      icon: <FaGraduationCap className="text-wine-red text-2xl" />,
      color: 'from-wine-red to-wine-red/80',
      textColor: 'text-wine-red',
      courses: [
        { id: 9, name: 'PG Diploma in Clinical Cardiology', icon: <FaHeart className="text-wine-red" /> },
        { id: 10, name: 'PG Diploma in Emergency Medicine', icon: <FaStethoscope className="text-wine-red" /> },
        { id: 11, name: 'PG Diploma in Neurology', icon: <FaBrain className="text-wine-red" /> },
        { id: 12, name: 'PG Diploma in Orthopedics', icon: <FaStethoscope className="text-wine-red" /> },
      ]
    },
    fellowship: {
      title: 'Fellowship',
      icon: <FaUserMd className="text-royal-violet text-2xl" />,
      color: 'from-royal-violet to-royal-violet/80',
      textColor: 'text-royal-violet',
      courses: [
        { id: 1, name: 'Fellowship In Abdominal Imaging', icon: <FaStethoscope className="text-royal-violet" /> },
        { id: 2, name: 'Fellowship In Breast Imaging', icon: <FaStethoscope className="text-royal-violet" /> },
        { id: 3, name: 'Fellowship In Obstetrics Ultrasound', icon: <FaBaby className="text-royal-violet" /> },
        { id: 4, name: 'Fellowship In Women\'s Imaging', icon: <FaStethoscope className="text-royal-violet" /> },
        { id: 5, name: 'Fellowship In Interventional Cardiology', icon: <FaHeart className="text-royal-violet" /> },
        { id: 6, name: 'Fellowship In Emergency Radiology', icon: <FaStethoscope className="text-royal-violet" /> },
        { id: 7, name: 'Fellowship In Pediatric Imaging', icon: <FaBaby className="text-royal-violet" /> },
        { id: 8, name: 'Fellowship In Neuro Imaging', icon: <FaBrain className="text-royal-violet" /> },
      ]
    },
    others: {
      title: 'Others',
      icon: <FaCertificate className="text-slate-500 text-2xl" />,
      color: 'from-slate-500 to-slate-600',
      textColor: 'text-slate-500',
      courses: [
        { id: 'cert1', name: 'Certificate in Medical Coding', icon: <FaCertificate className="text-blue-500" /> },
        { id: 'cert2', name: 'Certificate in Healthcare Management', icon: <FaCertificate className="text-blue-500" /> },
        { id: 'cert3', name: 'Certificate in Clinical Research', icon: <FaCertificate className="text-blue-500" /> },
        { id: 'cert4', name: 'Certificate in Medical Ethics', icon: <FaCertificate className="text-blue-500" /> },
      ]
    }
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setFormData({
      ...formData,
      programCategory: category,
      program: '' // Reset program when category changes
    })
  }

  const handleProgramSelect = (programName: string) => {
    setFormData({
      ...formData,
      program: programName
    })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    
    // Check if coming from Events page and pre-select event
    if (location.state?.fromEvent && location.state?.eventTitle) {
      setFormData(prev => ({
        ...prev,
        eventSelection: location.state.eventTitle
      }))
    }
    
    // Check if courseId is passed in URL parameters
    const courseId = searchParams.get('courseId')
    if (courseId) {
      // Find the course in programsData
      let foundCategory = ''
      let foundProgram = ''
      
      // Search in each category
      Object.entries(programsData).forEach(([categoryKey, categoryData]) => {
        const course = categoryData.courses.find((c: any) => String(c.id) === String(courseId))
        if (course) {
          foundCategory = categoryKey
          foundProgram = course.name
        }
      })
      
      // Pre-select the category and program if found
      if (foundCategory && foundProgram) {
        setSelectedCategory(foundCategory)
        setFormData(prev => ({
          ...prev,
          programCategory: foundCategory,
          program: foundProgram
        }))
      }
    }
  }, [searchParams, location.state])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate selection based on form type
    if (location.state?.fromEvent) {
      if (!formData.eventSelection) {
        alert('Please select an event before submitting.')
        return
      }
    } else {
      if (!formData.programCategory || !formData.program) {
        alert('Please select a program category and a specific program before submitting.')
        return
      }
    }

    try {
      await supabase.from('applications').insert([{
        form_type: 'apply',
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        course_interest: formData.program || formData.eventSelection,
        message: formData.statement,
        status: 'new'
      }])
    } catch (_) {
      // silently continue even if Supabase not configured
    }
    
    if (location.state?.fromEvent) {
      alert(`Event Registration submitted successfully!\n\nEvent: ${formData.eventSelection}\n\nOur team will contact you with event details within 48 hours.`)
    } else {
      alert(`Application submitted successfully!\n\nProgram: ${formData.program}\n\nOur admissions team will contact you within 48 hours.`)
    }
    
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      qualification: '',
      yearOfPassing: '',
      experience: '',
      currentInstitution: '',
      programCategory: '',
      program: '',
      eventSelection: '',
      statement: ''
    })
    setSelectedCategory('')
  }

  return (
    <div className="bg-gradient-to-br from-[#4D6A92] via-[#3D5A82] to-[#4D6A92]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-12 sm:pb-16">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            Apply for <span className="text-jhu-gold">Courses</span>
          </h1>
          <p className="font-inter text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-6 sm:mb-8">
            Take the first step towards advancing your medical career
          </p>
        </div>

       

        {/* Application Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative">
          {/* Back Button - show if coming from course detail or event */}
          {(location.state?.fromCourse || location.state?.fromEvent) && (
            <button
              onClick={() => {
                if (location.state?.fromCourse) {
                  navigate(`/course/${location.state.fromCourse}`)
                } else if (location.state?.fromEvent) {
                  navigate('/events')
                }
              }}
              className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-wine-red text-gray-700 hover:text-white transition-all duration-300 group shadow-md hover:shadow-lg"
              title={location.state?.fromEvent ? "Back to Events" : "Back to Course Details"}
            >
              <FaArrowLeft className="text-lg group-hover:-translate-x-0.5 transition-transform duration-300" />
            </button>
          )}
          
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {location.state?.fromEvent ? 'Event Registration Form' : 'Application Form'}
          </h2>
          
          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaUserMd className="text-wine-red" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                 <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  pattern="^[A-Za-z]+\\s[A-Za-z]+.*$"
                  className="w-full px-4 py-3 border border-black-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-wine-red"
                  placeholder="Dr. John Doe"
/>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-black-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-wine-red"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-black-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-wine-red"
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Highest Qualification <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-black-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-wine-red"
                  >
                    <option value="">Select Qualification</option>
                    <option value="MBBS">MBBS</option>
                    <option value="MD">MD</option>
                    <option value="MS">MS</option>
                    <option value="DNB">DNB</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaGraduationCap className="text-royal-violet" />
                Academic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Year of Passing <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="yearOfPassing"
                    value={formData.yearOfPassing}
                    onChange={handleChange}
                    required
                    min="1980"
                    max="2026"
                    className="w-full px-4 py-3 border border-black-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-wine-red"
                    placeholder="2020"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Years of Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    required
                    min="0"
                    className="w-full px-4 py-3 border border-black-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-wine-red"
                    placeholder="3"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Current Institution/Hospital
                  </label>
                  <input
                    type="text"
                    name="currentInstitution"
                    value={formData.currentInstitution}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-black-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-wine-red"
                    placeholder="City Hospital"
                  />
                </div>
              </div>
            </div>

            {/* Event Selection - Shows when coming from Events page */}
            {location.state?.fromEvent ? (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaCalendarCheck className="text-wine-red" />
                  Event Selection
                </h3>
                
                <div className="space-y-6">
                  {/* Event Dropdown */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Select Event <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="eventSelection"
                      value={formData.eventSelection}
                      onChange={(e) => setFormData({ ...formData, eventSelection: e.target.value })}
                      required
                      className="w-full px-4 py-3 border border-black-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-wine-red"
                    >
                      <option value="">-- Select an Event --</option>
                      {eventsData.filter(event => event.status === 'upcoming').map((event) => (
                        <option key={event.id} value={event.title}>
                          {event.title} - {event.date} ({event.location})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selected Event Confirmation */}
                  {formData.eventSelection && (
                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 animate-slideDown">
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500 text-xl" />
                        <div>
                          <p className="text-sm text-gray-600">Selected Event:</p>
                          <p className="font-bold text-gray-800">{formData.eventSelection}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* Program Selection - Shows for course applications */
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <FaFileAlt className="text-wine-red" />
                  Program Selection
                </h3>
                
                <div className="space-y-6">
                  {/* Step 1: Category Dropdown */}
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Select Program Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="programCategory"
                      value={formData.programCategory}
                      onChange={(e) => handleCategorySelect(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-black-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-wine-red"
                    >
                      <option value="">-- Select Program Category --</option>
                      <option value="pgCourses">🎓 PG Courses (4 Programs)</option>
                      <option value="fellowship">👨‍⚕️ Fellowship (8 Programs)</option>
                      <option value="others">📜 Others (4 Programs)</option>
                    </select>
                  </div>

                  {/* Step 2: Program Dropdown - Shows only when category is selected */}
                  {selectedCategory && (
                    <div className="animate-slideDown">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Select Your Program <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="program"
                        value={formData.program}
                        onChange={(e) => handleProgramSelect(e.target.value)}
                        required
                        className="w-full px-4 py-3 border border-black-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-wine-red"
                      >
                        <option value="">-- Select a Program --</option>
                        {programsData[selectedCategory as keyof typeof programsData].courses.map((course) => (
                          <option key={course.id} value={course.name}>
                            {course.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Selected Program Confirmation */}
                  {formData.program && (
                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200 animate-slideDown">
                      <div className="flex items-center gap-3">
                        <FaCheckCircle className="text-green-500 text-xl" />
                        <div>
                          <p className="text-sm text-gray-600">Selected Program:</p>
                          <p className="font-bold text-gray-800">{formData.program}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Statement of Purpose */}
            <div className="mb-8">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Statement of Purpose <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="statement"
                  value={formData.statement}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-black-300 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-wine-red"
                  placeholder="Tell us why you want to pursue this program and your career goals..."
                />
              </div>
            </div>

            {/* Note */}
            <div className="bg-lavender-tint rounded-xl p-6 mb-8">
              <p className="text-gray-700">
                <span className="font-semibold">Note:</span> After submitting this form, you will be contacted by our admissions team within 48 hours to discuss the next steps and document requirements.
              </p>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="gradient-primary text-white px-12 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>

        {/* Contact Support */}
        <div className="mt-16 relative overflow-hidden rounded-3xl p-8 text-white text-center bg-gradient-to-br from-[#4D6A92] via-[#3D5A82] to-[#4D6A92]">
          <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">Need Help with Your Application?</h3>
          <p className="text-lg mb-6">Our admissions team is here to assist you</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <div className="flex items-center justify-center gap-3">
              <FaPhone className="text-2xl" />
              <span className="text-lg">+91 7042011441</span>
            </div>
            <div className="flex items-center justify-center gap-3">
              <FaEnvelope className="text-2xl" />
              <span className="text-lg">info@dmhca.in</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Apply
