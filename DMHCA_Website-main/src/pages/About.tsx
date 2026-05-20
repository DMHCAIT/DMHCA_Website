import { useNavigate } from 'react-router-dom'
import { FaUsers, FaAward, FaGraduationCap, FaStethoscope, FaHeart, FaLightbulb, FaHandshake, FaShieldAlt, FaArrowLeft } from 'react-icons/fa'

const About = () => {
  const navigate = useNavigate()
  
  const stats = [
    { number: '5000+', label: 'Students Trained' },
    { number: '50+', label: 'Expert Faculty' },
    { number: '20+', label: 'Specializations' },
    { number: '95%', label: 'Success Rate' }
  ]

  const values = [
    {
      icon: <FaHeart className="text-3xl text-slate-500" />,
      title: 'Excellence',
      description: 'We maintain the highest standards in medical education and training.'
    },
    {
      icon: <FaLightbulb className="text-3xl text-slate-500" />,
      title: 'Innovation',
      description: 'Cutting-edge teaching methods and latest medical technologies.'
    },
    {
      icon: <FaHandshake className="text-3xl text-slate-500" />,
      title: 'Integrity',
      description: 'Ethical practices and transparent educational processes.'
    },
    {
      icon: <FaShieldAlt className="text-3xl text-slate-500" />,
      title: 'Trust',
      description: 'Building reliable relationships with students and healthcare partners.'
    }
  ]

  return (
    <div>
      {/* Back Arrow Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-20 left-4 sm:left-6 z-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white transition-all duration-300 group shadow-lg hover:shadow-xl border border-white/20"
        title="Go Back"
      >
        <FaArrowLeft className="text-base sm:text-lg group-hover:-translate-x-0.5 transition-transform duration-300" />
      </button>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 md:pt-40 md:pb-20 text-white overflow-hidden bg-gradient-to-br from-[#4D6A92] via-[#3D5A82] to-[#4D6A92]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="font-sora text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            About <span className="text-jhu-gold">DMHCA</span>
          </h1>
          <p className="font-inter text-base sm:text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            Digital Medical and Healthcare Academy - India's premier destination for advanced medical education, 
            post-graduate courses, and specialized healthcare training programs.
          </p>
        </div>
      </section>

      {/* Main Content Section - All content in one section */}
      <section className="relative z-20 bg-white">
        <div className="space-y-0">
        
        {/* Mission & Vision */}
        <div className="py-12 sm:py-16 md:py-20" style={{ background: 'linear-gradient(135deg, #8FB6D4, #7FA9C9, #6E9BBF)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl font-bold text-jhu-dark mb-6 sm:mb-8">
                Our <span className="text-jhu-spirit-blue">Mission</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                To revolutionize medical education in India by providing world-class, accessible, and 
                innovative learning experiences that prepare healthcare professionals for the challenges 
                of modern medicine. We are committed to bridging the gap between theoretical knowledge 
                and practical application through comprehensive training programs.
              </p>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                    <FaUsers className="text-xl sm:text-2xl md:text-3xl text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base">Community</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Building a network of excellence</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                    <FaAward className="text-xl sm:text-2xl md:text-3xl text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base">Excellence</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Maintaining highest standards</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-lavender-tint to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
              <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl font-bold text-jhu-dark mb-6 sm:mb-8">
                Our <span className="text-jhu-spirit-blue">Vision</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                To become the leading digital medical academy in Asia, recognized for producing 
                competent, compassionate, and skilled healthcare professionals who contribute 
                meaningfully to society's health and wellness. We envision a future where 
                quality medical education is accessible to all deserving candidates.
              </p>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-coral-red to-peach rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                    <FaGraduationCap className="text-xl sm:text-2xl md:text-3xl text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base">Education</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Transforming learning experiences</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-coral-red to-peach rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                    <FaStethoscope className="text-xl sm:text-2xl md:text-3xl text-white" />
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-base">Healthcare</h3>
                  <p className="text-xs sm:text-sm text-gray-600">Advancing medical practice</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-12 sm:py-16 md:py-20 text-white bg-gradient-to-br from-[#4D6A92] via-[#3D5A82] to-[#4D6A92]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Our Achievements</h2>
            <p className="font-inter text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
              Numbers that reflect our commitment to excellence in medical education
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 sm:p-6 bg-white/10 rounded-xl sm:rounded-2xl backdrop-blur-sm">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base md:text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Our Values */}
        <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-lavender-tint to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-sora text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-jhu-dark mb-4 sm:mb-6">
              Our Core <span className="text-jhu-spirit-blue">Values</span>
            </h2>
            <p className="font-inter text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our approach to medical education and shape our institutional culture
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-lavender-tint rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-xl text-center hover:scale-105 transition-all duration-300 border border-gray-100">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-400 to-violet-500 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                  {value.icon}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">{value.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* Leadership Message */}
        <div className="py-20" style={{ background: 'linear-gradient(135deg, #8FB6D4, #7FA9C9, #6E9BBF)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Message from Leadership</h2>
            <div className="relative overflow-hidden text-white rounded-3xl p-12 bg-gradient-to-br from-[#4D6A92] via-[#3D5A82] to-[#4D6A92]">
              <div className="relative z-10">
                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  "At DMHCA, we believe that quality medical education should be accessible, practical, and transformative. 
                  Our commitment is to nurture the next generation of healthcare professionals who will make a meaningful 
                  difference in people's lives. Every program we offer is designed with the student's success and societal 
                  impact in mind."
                </p>
                <div className="border-t border-white/20 pt-6">
                  <p className="font-bold text-xl">Dr. [Name]</p>
                  <p className="opacity-90">Director & Founder, DMHCA</p>
                </div>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="py-20" style={{ background: 'linear-gradient(135deg, #8FB6D4, #7FA9C9, #6E9BBF)' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Choose DMHCA?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what sets us apart in the field of medical education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Industry-Relevant Curriculum</h3>
              <p className="text-gray-600 mb-4">
                Our programs are designed in consultation with leading medical professionals and industry experts 
                to ensure graduates are job-ready.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Updated course content</li>
                <li>• Real-world case studies</li>
                <li>• Practical training emphasis</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Expert Faculty</h3>
              <p className="text-gray-600 mb-4">
                Learn from experienced medical professionals, researchers, and practitioners 
                who bring real-world expertise to the classroom.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Practicing physicians</li>
                <li>• Medical researchers</li>
                <li>• Industry specialists</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Career Support</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive placement assistance, career guidance, and networking 
                opportunities to help you achieve your professional goals.
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Job placement assistance</li>
                <li>• Career counseling</li>
                <li>• Alumni network access</li>
              </ul>
            </div>
          </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-20 bg-gradient-to-r from-wine-red via-royal-violet to-wine-red text-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who have advanced their careers with DMHCA
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-white text-wine-red px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Explore Programs
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-wine-red hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Contact Us
            </button>
          </div>
          </div>
        </div>

        </div>
      </section>
    </div>
  )
}

export default About